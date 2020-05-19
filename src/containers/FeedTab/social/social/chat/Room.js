import React from 'react';
import {FlatList, Alert, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import {chatActions} from 'Redux/actions';
import {MCRootView, MCView, DividerLine} from 'components/styled/View';
import {MCHeader, MCImage, MCIcon, MCModal} from 'components/common';
import {MCTextInput, H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
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
    };
  }

  prevUserId = '';
  viewabilityConfig = {
    waitForInteraction: true,
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

  sendMessage = () => {
    const {text} = this.state;
    const {profile, sendMessage} = this.props;
    if (text.length === 0) return;
    const ts = new Date().getTime();
    sendMessage(
      {
        date: ts,
        text,
        userId: profile._id,
      },
      () => {
        this.setState({text: ''});
      },
    );
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
    const {selectedRoom, roomMessages, lastMessageDateChecked} = this.props;
    const viewableLastDate = viewableItems[viewableItems.length - 1].item;
    if (viewableLastDate <= lastMessageDateChecked[selectedRoom._id]) return;
    this.props.updateLastMessageDate({
      [selectedRoom._id]: viewableLastDate,
    });
  };

  render() {
    const {text, roomName, updatingRoomName} = this.state;
    const {
      t,
      theme,
      profile,
      loading,
      selectedRoom,
      roomMessageIds,
      lastMessageDateChecked,
    } = this.props;
    console.log({lastMessageDateChecked});
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
        />
        {selectedRoom.type === 'group' && (
          <MCView row justify="center" ph={30}>
            {selectedRoom.members.slice(0, 3).map((member, index) => {
              const find = selectedRoom.includes.find(i => i._id === member);
              if (!find) return;
              return (
                <MCView ml={index > 0 ? -15 : 0}>
                  <MCImage
                    image={{uri: find.avatar}}
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
            {/* <MCEmptyText>
              {selectedRoom.includes.length} {t('network_members')}
            </MCEmptyText> */}
          </MCView>
        )}
        <KeyboardAvoidingView
          style={{flex: 1, alignItems: 'center', marginTop: dySize(10)}}
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
          <FlatList
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
          <MCView row align="center" width={350} pv={10}>
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
            <MCButton onPress={() => this.sendMessage()}>
              <MCIcon type="FontAwesome5Pro" name="paper-plane" />
            </MCButton>
          </MCView>
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
            draggableIcon: {
              backgroundColor: '#000',
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
                {selectedRoom.type === 'group' && (
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
  lastMessageDateChecked: state.chatReducer.lastMessageDateChecked,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getRoomMessages: chatActions.getRoomMessages,
  sendMessage: chatActions.sendMessage,
  deleteChatRoom: chatActions.deleteChatRoom,
  updateChatRoom: chatActions.updateChatRoom,
  closeRoomMessageListener: chatActions.closeRoomMessageListener,
  updateLastMessageDate: chatActions.updateLastMessageDate,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChatRoomScreen),
);
