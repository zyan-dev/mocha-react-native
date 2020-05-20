import React from 'react';
import {FlatList, Alert, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FloatingAction} from 'react-native-floating-action';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import API from 'services/api';
import {chatActions, routerActions} from 'Redux/actions';
import {MCRootView, MCView, DividerLine} from 'components/styled/View';
import {MCHeader, MCImage, MCIcon, MCModal} from 'components/common';
import {MCTextInput, H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';
import ChatBubbleItem from './Bubble';

class ChatRoomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActionSheet: false,
      roomName: '',
      text: '',
      updatingRoomName: false,
      selectedImage: null,
    };
  }

  prevUserId = '';
  viewabilityConfig = {
    waitForInteraction: false,
    itemVisiblePercentThreshold: 75,
  };

  componentDidMount() {
    const {selectedRoom, getRoomMessages} = this.props;
    getRoomMessages(selectedRoom._id);
  }

  componentDidUpdate(preProps, prevState) {
    if (preProps.loading && !this.props.loading) {
      this.scrollToEnd();
    }
  }

  componentWillUnmount() {
    this.props.closeRoomMessageListener();
  }

  sendMessage = async () => {
    const {text, selectedImage} = this.state;
    const {profile, sendMessage, setLoading} = this.props;
    if (text.length === 0) return;

    const ts = new Date().getTime();

    let msgData = {
      date: ts,
      text,
      userId: profile._id,
    };

    // upload media file if attached
    if (selectedImage) {
      setLoading(true);
      const uploadedURL = await API.fileUploadToS3({
        image: selectedImage.path,
        type: 'chat_attachment',
        userId: msgData.userId,
      });
      if (uploadedURL === 'error') {
        showAlert(i18next.t('error_upload_file_failed'));
        setLoading(false);
        return;
      }
      msgData.image = uploadedURL;
    }
    setLoading(false);

    sendMessage(msgData, () => {
      this.setState({text: '', selectedImage: null});
    });
  };

  openActionSheet = () => {
    this.RBSheet && this.RBSheet.open();
  };

  onPressAddMember = () => {
    this.closeActionSheet();
    NavigationService.navigate('SelectChatMember', {
      multiple: true,
      type: 'add_member',
    });
  };

  onPressChangeName = () => {
    this.setState({
      updatingRoomName: true,
      roomName: this.props.selectedRoom.room_name,
    });
  };

  updateRoomName = () => {
    const {roomName} = this.state;
    const {selectedRoom} = this.props;
    if (roomName.length === 0) return;
    this.props.updateChatRoom({
      ...selectedRoom,
      room_name: roomName,
    });
    this.setState({updatingRoomName: false});
    this.RBSheet.close();
  };

  onPressDelete = () => {
    const {t, selectedRoom, deleteChatRoom} = this.props;
    Alert.alert(
      t('alert_title_mocha'),
      t('alert_remove_chat_room'),
      [
        {
          text: t('button_cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('button_ok'), onPress: () => deleteChatRoom(selectedRoom._id)},
      ],
      {cancelable: false},
    );
  };

  closeActionSheet = () => {
    const {updatingRoomName} = this.state;
    if (updatingRoomName) this.setState({updatingRoomName: false});
    else this.RBSheet.close();
  };

  scrollToEnd = () => {
    setTimeout(() => {
      this.chatList &&
        this.chatList.scrollToEnd({animated: false, duration: 1000});
    }, 2000);
  };

  _renderBubbleItem = ({item, index}) => {
    const {roomMessages, roomMessageIds} = this.props;
    let hasAvatar = true;
    const userId = roomMessages[roomMessageIds[index]].userId;
    if (index > 0 && this.prevUserId === userId) {
      hasAvatar = false;
    } else {
      this.prevUserId = userId;
    }
    return <ChatBubbleItem bubbleId={item} hasAvatar={hasAvatar} />;
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    const {
      selectedRoom,
      lastMessageDateChecked,
      checkChatMissedState,
    } = this.props;
    if (viewableItems.length === 0) return;
    const viewableLastDate = viewableItems[viewableItems.length - 1].item;
    if (viewableLastDate <= lastMessageDateChecked[selectedRoom._id]) return;
    this.props.updateLastMessageDate({
      [selectedRoom._id]: viewableLastDate,
    });
    setTimeout(() => {
      checkChatMissedState();
    });
  };

  onAttachmentItem = name => {
    if (name === 'image') {
      ImagePicker.openPicker({
        width: 400,
        height: 600,
        cropping: true,
        includeBase64: true,
      }).then(image => {
        // image object (path, data ...)
        this.scrollToEnd();
        this.setState({selectedImage: image});
      });
    } else if (name === 'camera') {
      ImagePicker.openCamera({
        width: 400,
        height: 600,
        cropping: true,
        includeBase64: true,
      }).then(image => {
        // image object (path, data ...)
        this.scrollToEnd();
        this.setState({selectedImage: image});
      });
    }
  };

  render() {
    const {text, roomName, updatingRoomName, selectedImage} = this.state;
    const {
      t,
      theme,
      profile,
      loading,
      selectedRoom,
      roomMessageIds,
      hasMissedMessages,
    } = this.props;
    const flatingActions = [
      {
        text: t('chat_action_pick_image'),
        textColor: theme.colors.text,
        textBackground: theme.colors.background,
        icon: <MCIcon name="ios-images" color={theme.colors.outline} />,
        name: 'image',
        position: 1,
        color: theme.colors.background,
      },
      {
        text: t('chat_action_capture_image'),
        textColor: theme.colors.text,
        textBackground: theme.colors.background,
        icon: <MCIcon name="ios-camera" color={theme.colors.outline} />,
        name: 'camera',
        position: 2,
        color: theme.colors.background,
      },
      {
        text: t('chat_action_select_video'),
        textColor: theme.colors.text,
        textBackground: theme.colors.background,
        icon: <MCIcon name="ios-videocam" color={theme.colors.outline} />,
        name: 'video',
        position: 3,
        color: theme.colors.background,
      },
    ];
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={
            selectedRoom.type === 'private'
              ? t('chat_type_private')
              : selectedRoom.room_name
          }
          hasRight={selectedRoom.type === 'group'}
          rightIconType="Ionicon"
          rightIcon="md-more"
          onPressRight={() => this.openActionSheet()}
          hasLeftBadge={hasMissedMessages}
        />
        {selectedRoom.type === 'group' && (
          <MCView row justify="center" ph={30}>
            {selectedRoom.includes.slice(0, 8).map((member, index) => {
              return (
                <MCView ml={index > 0 ? -15 : 0}>
                  <MCImage
                    image={{uri: member.avatar}}
                    round
                    type="avatar"
                    width={30}
                    height={30}
                  />
                  {selectedRoom.members.length > 8 && index === 7 && (
                    <MCView
                      absolute
                      width={30}
                      height={30}
                      background={theme.colors.background}
                      align="center"
                      justify="center"
                      style={{opacity: 0.8}}>
                      <H4 weight="bold">+{selectedRoom.members.length - 8}</H4>
                    </MCView>
                  )}
                </MCView>
              );
            })}
          </MCView>
        )}
        <KeyboardAvoidingView
          style={{flex: 1, alignItems: 'center', marginTop: dySize(10)}}
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
          <FlatList
            keyboardShouldPersistTaps="always"
            ref={ref => (this.chatList = ref)}
            contentContainerStyle={{
              width: dySize(375),
              alignItems: 'center',
              paddingVertical: 10,
            }}
            data={roomMessageIds}
            renderItem={this._renderBubbleItem}
            keyExtractor={item => item}
            ListEmptyComponent={
              <MCEmptyText mt={50}>
                {loading ? t('progress_loading') : t('no_messages')}
              </MCEmptyText>
            }
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
          />
          {selectedImage && (
            <MCView
              row
              align="center"
              justify="space-between"
              width={350}
              pv={10}>
              <MCImage
                width={70}
                height={70}
                image={{uri: selectedImage.path}}
                resizeMode="cover"
                br={10}
              />
              <H4>Image attached</H4>
            </MCView>
          )}
          <MCView row align="center" width={350} pv={10}>
            <MCButton
              onPress={() => this.floatingAction.animateButton()}
              ml={-10}>
              <MCIcon type="FontAwesome5Pro" name="plus-circle" />
            </MCButton>
            <MCTextInput
              value={text}
              onChangeText={text => this.setState({text})}
              placeholder="Type your message here..."
              style={{flex: 1}}
              onSubmitEditing={() => this.sendMessage()}
              returnKeyType="send"
              onFocus={() => this.scrollToEnd()}
              onBlur={() => this.scrollToEnd()}
            />
            <MCButton onPress={() => this.sendMessage()} mr={-10}>
              <MCIcon type="FontAwesome5Pro" name="paper-plane" />
            </MCButton>
          </MCView>
          <FloatingAction
            ref={ref => {
              this.floatingAction = ref;
            }}
            visible={false}
            actions={flatingActions}
            onPressItem={name => this.onAttachmentItem(name)}
            position="left"
            distanceToEdge={10}
            overlayColor="rgba(0, 0, 0, 0.8)"
          />
        </KeyboardAvoidingView>
        <RBSheet
          ref={ref => (this.RBSheet = ref)}
          openDuration={500}
          closeOnPressMask={false}
          customStyles={{
            container: {
              backgroundColor: theme.colors.background,
              height: 'auto',
            },
          }}>
          <MCView align="center" pv={20}>
            {updatingRoomName ? (
              <MCView width={300} align="center">
                <H3>{t('chat_action_change_room_name')}</H3>
                <MCView width={300} mt={10}>
                  <MCTextInput
                    value={roomName}
                    onChangeText={text => this.setState({roomName: text})}
                    style={{width: '100%'}}
                  />
                </MCView>
                <MCButton
                  bordered
                  mt={20}
                  pl={20}
                  pr={20}
                  onPress={() => this.updateRoomName()}
                  align="center">
                  <H3>{t('button_update')}</H3>
                </MCButton>
              </MCView>
            ) : (
              <>
                <H4 width={300} align="center" color={theme.colors.border}>
                  {selectedRoom.room_name}
                </H4>
                <H4
                  mb={10}
                  width={300}
                  align="center"
                  color={theme.colors.border}>
                  ({selectedRoom.members.length} {t('network_members')})
                </H4>
                <DividerLine />
                {selectedRoom.type === 'group' && (
                  <MCButton onPress={() => this.onPressAddMember()}>
                    <H3>{t('chat_action_add_member')}</H3>
                  </MCButton>
                )}
                {selectedRoom.type === 'group' &&
                  selectedRoom.owner === profile._id && (
                    <MCButton onPress={() => this.onPressChangeName()}>
                      <H3>{t('chat_action_change_room_name')}</H3>
                    </MCButton>
                  )}
                {selectedRoom.owner === profile._id && (
                  <MCButton onPress={() => this.onPressDelete()}>
                    <H3 color={theme.colors.danger}>
                      {t('chat_action_delete_room')}
                    </H3>
                  </MCButton>
                )}
              </>
            )}
            <DividerLine />
            <MCButton
              onPress={() => this.closeActionSheet()}
              mt={20}
              pl={20}
              pr={20}>
              <H3 color={theme.colors.border}>{t('button_cancel')}</H3>
            </MCButton>
          </MCView>
        </RBSheet>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedRoom: state.chatReducer.selectedRoom,
  roomMessages: state.chatReducer.roomMessages,
  roomMessageIds: Object.keys(state.chatReducer.roomMessages || {}).sort(
    (a, b) => a > b,
  ),
  loading: state.chatReducer.loading,
  hasMissedMessages: state.chatReducer.hasMissedMessages,
  lastMessageDateChecked: state.chatReducer.lastMessageDateChecked,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  setLoading: routerActions.setLoading,
  getRoomMessages: chatActions.getRoomMessages,
  sendMessage: chatActions.sendMessage,
  deleteChatRoom: chatActions.deleteChatRoom,
  updateChatRoom: chatActions.updateChatRoom,
  closeRoomMessageListener: chatActions.closeRoomMessageListener,
  updateLastMessageDate: chatActions.updateLastMessageDate,
  checkChatMissedState: chatActions.checkChatMissedState,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChatRoomScreen),
);
