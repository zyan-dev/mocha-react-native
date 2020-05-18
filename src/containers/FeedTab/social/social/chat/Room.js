import React from 'react';
import {FlatList, Alert, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import {chatActions} from 'Redux/actions';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCHeader, MCImage, MCIcon, MCModal} from 'components/common';
import {MCTextInput, H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import styled from 'styled-components';
import {MCContent} from '../../../../../components/styled/View';

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

  componentDidMount() {
    const {selectedRoom, getRoomMessages} = this.props;
    getRoomMessages(selectedRoom._id);
  }

  componentDidUpdate(preProps, prevState) {
    console.log(preProps.loading);
    console.log(this.props.loading);
    if (preProps.loading && !this.props.loading) {
      setTimeout(() => {
        this.chatList && this.chatList.scrollToEnd();
      }, 1000);
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

  onPressAddMember = () => {};

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

  _renderBubbleItem = ({item}) => {
    const {t, theme, profile, selectedRoom, roomMessages} = this.props;
    const bubbleId = item;
    const bubble = roomMessages[bubbleId];
    let bubbleUser = null;
    let mine = false;
    if (bubble.userId === profile._id) {
      bubbleUser = profile;
      mine = true;
    } else {
      bubbleUser = selectedRoom.includes.find(i => i._id === bubble.userId);
    }
    if (!bubbleUser) return null;
    return (
      <MCView
        row
        mt={10}
        width={350}
        justify={mine ? 'flex-end' : 'flex-start'}
        key={bubbleId}>
        {!mine && (
          <MCImage
            round
            image={{uri: bubbleUser.avatar}}
            width={30}
            height={30}
            type="avatar"
          />
        )}
        <MCCard shadow ml={10} mr={10} p={10}>
          {bubble.text && (
            <H4>
              {bubble.text === 'who_chat_message_created_room'
                ? t('who_chat_message_created_room', {who: bubbleUser.name})
                : bubble.text}
            </H4>
          )}
        </MCCard>
        {mine && (
          <MCImage
            round
            image={{uri: bubbleUser.avatar}}
            width={30}
            height={30}
            type="avatar"
          />
        )}
      </MCView>
    );
  };

  render() {
    const {text, roomName, updatingRoomName} = this.state;
    const {t, theme, loading, roomMessages, selectedRoom} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t(`chat_type_${selectedRoom.type}`)}
          hasRight
          rightIconType="Ionicon"
          rightIcon="md-more"
          onPressRight={() => this.openActionSheet()}
        />
        {selectedRoom.type === 'group' && (
          <MCEmptyText>{selectedRoom.room_name}</MCEmptyText>
        )}
        <KeyboardAvoidingView
          style={{flex: 1, alignItems: 'center'}}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <FlatList
            ref={ref => (this.chatList = ref)}
            contentContainerStyle={{
              width: dySize(375),
              paddingBottom: 20,
              alignItems: 'center',
            }}
            data={Object.keys(roomMessages || {}).sort((a, b) => a > b)}
            renderItem={this._renderBubbleItem}
            keyExtractor={item => item}
            ListEmptyComponent={
              <MCEmptyText mt={50}>
                {loading ? t('progress_loading') : t('no_messages')}
              </MCEmptyText>
            }
          />
          <MCView row align="center" width={350} pv={10}>
            <MCTextInput
              value={text}
              onChangeText={text => this.setState({text})}
              placeholder="Type your message here..."
              style={{flex: 1}}
              onSubmitEditing={() => this.sendMessage()}
              returnKeyType="send"
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
                <MCButton onPress={() => this.onPressDelete()}>
                  <H3 color={theme.colors.danger}>
                    {t('chat_action_delete_room')}
                  </H3>
                </MCButton>
              </>
            )}
            {/* <MCView bordered mt={15} height={0.1} br={1} width={250} /> */}
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
  loading: state.chatReducer.loading,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getRoomMessages: chatActions.getRoomMessages,
  sendMessage: chatActions.sendMessage,
  deleteChatRoom: chatActions.deleteChatRoom,
  updateChatRoom: chatActions.updateChatRoom,
  closeRoomMessageListener: chatActions.closeRoomMessageListener,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChatRoomScreen),
);
