import React from 'react';
import {
  FlatList,
  Alert,
  KeyboardAvoidingView,
  RefreshControl,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FloatingAction} from 'react-native-floating-action';
import EmojiSelector from 'react-native-emoji-selector';
import moment from 'moment';
import * as _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
import API from 'services/api';
import {chatActions, routerActions} from 'Redux/actions';
import {MCRootView, MCView, DividerLine} from 'components/styled/View';
import {MCHeader, MCImage, MCIcon} from 'components/common';
import {MCTextInput, H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {showAlert, getDateString} from 'services/operators';
import NavigationService from 'navigation/NavigationService';
import ChatBubbleItem from './Bubble';

const countPerPage = 20;

class ChatRoomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      text: '',
      updatingRoomName: false,
      showMemberList: false,
      selectedImage: null,
      firstLoad: false,
      count: countPerPage,
      refreshing: false,
      lastItem: {},
      topBubbleDate: 0,
      showTopBubbleDate: false,
      selectedBubbleId: 0,
      showEmojiView: false,
      selectedEmoji: '',
    };
  }

  mounted = false;
  prevUserId = '';
  prevDate = 0;
  prevTime = 0;
  viewabilityConfig = {
    waitForInteraction: false,
    itemVisiblePercentThreshold: 75,
  };

  componentWillMount() {
    this.props.setRoomMessages({});
  }

  componentDidMount() {
    this.mounted = true;
    const {selectedRoom, getRoomMessages} = this.props;
    getRoomMessages(selectedRoom._id, countPerPage); // page: 1
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(preProps, prevState) {
    const {refreshing, lastItem, firstLoad} = this.state;
    if (preProps.loading && !this.props.loading) {
      if (this.mounted && !firstLoad) {
        this.scrollToEnd();
        this.setState({firstLoad: true});
        console.log('Initial load');
      } else if (refreshing) {
        this.setState({refreshing: false});
        console.log('Scrolling to item');
        this.scrollToItem(lastItem);
      } else if (
        // scroll to end if message length has been changed
        preProps.roomMessages.length !== this.props.roomMessages.length
      ) {
        console.log('Scrolling to end');
        this.scrollToEnd();
      }
    }
  }

  componentWillUnmount() {
    this.props.closeRoomMessageListener();
  }

  sendMessage = async () => {
    const {text, selectedImage, count} = this.state;
    const {
      profile,
      sendMessage,
      setLoading,
      getRoomMessages,
      selectedRoom,
    } = this.props;
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

    getRoomMessages(selectedRoom._id, count + 1);
    sendMessage(msgData, () => {
      this.setState({text: '', selectedImage: null, count: count + 1});
    });
  };

  openActionSheet = () => {
    this.RBSheet && this.RBSheet.open();
  };

  onPressMembersList = () => {
    this.setState({showMemberList: true});
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
    const {updatingRoomName, showMemberList} = this.state;
    if (updatingRoomName) this.setState({updatingRoomName: false});
    else if (showMemberList) this.setState({showMemberList: false});
    else this.RBSheet.close();
  };

  scrollToEnd = () => {
    const {roomMessageIds} = this.props;
    if (roomMessageIds.length === 0) return;
    setTimeout(() => {
      this.chatList &&
        this.chatList.scrollToIndex({
          index: roomMessageIds.length - 1,
          animated: true,
          duration: 1500,
        });
    }, 500);
  };

  scrollToItem = item => {
    console.log('Scrolling to item');
    setTimeout(() => {
      this.chatList &&
        this.chatList.scrollToItem({animated: false, item, viewPosition: 0});
    }, 500);
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    const {
      selectedRoom,
      lastMessageDateChecked,
      checkChatMissedState,
      roomMessages,
    } = this.props;
    if (viewableItems.length === 0) return;

    this.setState({
      topBubbleDate: _.get(roomMessages, [viewableItems[0].item, 'date'], 0),
    });
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

  loadMoreMessages = () => {
    const {count} = this.state;
    const {selectedRoom, getRoomMessages, roomMessageIds} = this.props;
    getRoomMessages(selectedRoom._id, count + countPerPage); // page: 1
    this.setState({
      refreshing: true,
      lastItem: roomMessageIds[0],
      count: count + countPerPage,
    });
  };

  onScrollBeginDrag = () => {
    this.setState({showTopBubbleDate: true});
    Keyboard.dismiss();
  };

  onScrollEndDrag = () => {
    setTimeout(() => {
      this.mounted && this.setState({showTopBubbleDate: false});
    }, 5000);
  };

  onPressEmoji = bubbleId => {
    this.setState({selectedBubbleId: bubbleId, showEmojiView: true});
  };

  onEmojiSelected = () => {
    const {selectedBubbleId, selectedEmoji} = this.state;
    this.props.addEmoji(selectedBubbleId, selectedEmoji);
    this.setState({showEmojiView: false});
  };

  _renderBubbleItem = ({item, index}) => {
    const {roomMessages} = this.props;
    let hasAvatar = true;
    let hasTime = true;
    let hasDate = true;
    const bubble = roomMessages[item];
    const userId = bubble.userId;

    // if date or time is similar to the previous bubble, hide them
    if (
      index > 0 &&
      Math.abs(this.prevTime - bubble.date) < 30 * 60 * 1000 &&
      this.prevUserId === bubble.userId
    ) {
      hasTime = false;
    }
    if (
      index > 0 &&
      moment(this.prevDate).format('YYYY-MM-DD') ===
        moment(bubble.date).format('YYYY-MM-DD')
    ) {
      hasDate = false;
    }

    // to avoid rendering same avatar for each bubble
    if (index > 0 && this.prevUserId === userId) {
      hasAvatar = false;
    }

    this.prevUserId = userId;
    this.prevTime = bubble.date;
    this.prevDate = bubble.date;
    return (
      <ChatBubbleItem
        bubbleId={item}
        hasAvatar={hasAvatar}
        hasTime={hasTime}
        hasDate={hasDate}
        onPressEmoji={() => this.onPressEmoji(item)}
      />
    );
  };

  _renderAvatarItem = ({item}) => {
    const userId = item;
    const {selectedRoom} = this.props;
    const findUser = selectedRoom.includes.find(i => i._id === userId);
    return (
      <MCButton
        align="center"
        width={80}
        onPress={() => {
          NavigationService.navigate('UserProfile', {id: findUser._id});
          this.RBSheet.close();
        }}>
        <MCImage image={{uri: findUser.avatar}} width={60} height={60} round />
        <H4 align="center">{findUser.name}</H4>
      </MCButton>
    );
  };

  render() {
    const {
      text,
      roomName,
      updatingRoomName,
      selectedImage,
      topBubbleDate,
      showTopBubbleDate,
      showEmojiView,
      selectedEmoji,
      showMemberList,
    } = this.state;
    const {
      t,
      theme,
      profile,
      loading,
      selectedRoom,
      roomMessageIds,
      hasMissedMessages,
    } = this.props;
    if (!selectedRoom || !selectedRoom.members) return null;
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
              paddingTop: 40,
            }}
            data={roomMessageIds}
            renderItem={this._renderBubbleItem}
            keyExtractor={item => item}
            ListEmptyComponent={
              <MCEmptyText mt={50}>
                {loading ? t('progress_loading') : t('no_messages')}
              </MCEmptyText>
            }
            onScrollEndDrag={() => this.onScrollEndDrag()}
            onScrollBeginDrag={() => this.onScrollBeginDrag()}
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
            onScrollToIndexFailed={info => {
              this.chatList.scrollToIndex({
                animated: false,
                index: info.highestMeasuredFrameIndex,
              });
              setTimeout(() => {
                this.scrollToEnd();
              }, 500);
            }}
            refreshControl={
              <RefreshControl
                colors={['#9Bd35A', '#689F38']}
                refreshing={loading}
                onRefresh={this.loadMoreMessages.bind(this)}
                title="Load more"
              />
            }
          />
          {topBubbleDate > 0 && showTopBubbleDate && (
            <MCView
              br={20}
              width={240}
              height={40}
              style={{
                position: 'absolute',
                top: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.text,
                opacity: 0.6,
              }}>
              <H4 color={theme.colors.background}>
                {getDateString(topBubbleDate)}
              </H4>
            </MCView>
          )}
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
              placeholderTextColor={theme.colors.border}
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
          <MCView align="center" pv={10}>
            <H3 width={300} mb={10} align="center" color={theme.colors.border}>
              {selectedRoom.room_name}
            </H3>
            <DividerLine />

            {updatingRoomName ? (
              <MCView width={300} align="center">
                <H4 weight="italic" mt={10} color={theme.colors.border}>
                  {t('chat_action_change_room_name')}
                </H4>
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
                  mb={20}
                  pl={20}
                  pr={20}
                  onPress={() => this.updateRoomName()}
                  align="center">
                  <H3>{t('button_update')}</H3>
                </MCButton>
              </MCView>
            ) : showMemberList ? (
              <FlatList
                horizontal
                contentContainerStyle={{paddingVertical: 40}}
                data={selectedRoom.members}
                renderItem={this._renderAvatarItem}
                keyExtractor={item => item}
              />
            ) : (
              <>
                <MCButton onPress={() => this.onPressMembersList()}>
                  <H3>
                    {t('chat_action_member_list')} (
                    {selectedRoom.members.length})
                  </H3>
                </MCButton>
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
        {showEmojiView && (
          <MCView>
            <MCView
              row
              justify="space-between"
              width={375}
              align="center"
              height={70}
              ph={10}>
              <MCButton
                bordered
                onPress={() => this.setState({showEmojiView: false})}
                pl={20}
                pr={20}>
                <H3 color={theme.colors.border}>{t('button_cancel')}</H3>
              </MCButton>
              <H3 style={{fontSize: 40}}>{selectedEmoji}</H3>
              {selectedEmoji.length > 0 && (
                <MCButton
                  bordered
                  onPress={() => this.onEmojiSelected()}
                  pl={20}
                  pr={20}>
                  <H3>{t('button_select')}</H3>
                </MCButton>
              )}
            </MCView>
            <EmojiSelector
              onEmojiSelected={emoji => this.setState({selectedEmoji: emoji})}
              style={{
                color: 'red',
                height: dySize(300),
                backgroundColor: theme.colors.background,
              }}
              placeholder="Search..."
              color="red"
            />
          </MCView>
        )}
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
  setRoomMessages: chatActions.setRoomMessages,
  addEmoji: chatActions.addEmoji,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChatRoomScreen),
);
