import React from 'react';
import {Alert, Modal} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {chatActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageViewer from 'react-native-image-zoom-viewer';
import {MCView, DividerLine} from 'components/styled/View';
import {MCImage, MCIcon} from 'components/common';
import {H3, H4, H5, MCTextInput} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {convertChatMessage, getDateString, showAlert} from 'services/operators';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import BubbleMessageItem from './BubbleMessage';

const bubbleColor = '#AAAAAA';
const bubbleColorMine = '#303030';

class ChatBubbleItem extends React.Component {
  static propTypes = {
    bubbleId: PropTypes.object.isRequired,
    hasAvatar: PropTypes.bool.isRequired,
    hasTime: PropTypes.bool.isRequired,
    hasDate: PropTypes.bool.isRequired,
    onPressEmoji: PropTypes.func,
  };

  state = {
    selectedBubble: null,
    editing: false,
    editText: '',
    showImagePreview: false,
    onPressEmoji: () => undefined,
  };

  onEditBubble = (bubble, mine) => {
    if (bubble.text === 'chat_message_deleted') return;
    if (bubble.text === 'who_chat_message_created_room') return;
    if (bubble.text.indexOf('chat_message_who_added_whom') > -1) return;
    if (mine) {
      this.setState({selectedBubble: bubble, editing: false});
      this.RBSheet && this.RBSheet.open();
    } else {
      //  go to preview screen directly
      this.setState({selectedBubble: bubble});
      this.setState({showImagePreview: true});
    }
  };

  onPreviewImage = bubble => {
    this.RBSheet && this.RBSheet.close();
    setTimeout(() => {
      this.setState({selectedBubble: bubble, showImagePreview: true});
    }, 1000);
  };

  onEditMessage = () => {
    const {selectedBubble} = this.state;
    this.setState({editing: true, editText: selectedBubble.text});
  };

  updateMessage = () => {
    const {editText, selectedBubble} = this.state;
    const {updateMessage, selectedRoom} = this.props;
    if (editText.length === 0) return;
    updateMessage(
      selectedRoom,
      {
        ...selectedBubble,
        text: editText,
      },
      () => {
        this.RBSheet.close();
        this.setState({editing: false});
      },
    );
  };

  onDeleteMessage = () => {
    const {selectedBubble} = this.state;
    const {t, updateMessage, selectedRoom} = this.props;
    Alert.alert(
      t('alert_title_mocha'),
      t('alert_remove_chat_room'),
      [
        {
          text: t('button_no'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('button_yes'),
          onPress: () => {
            updateMessage(
              selectedRoom,
              {
                ...selectedBubble,
                text: 'chat_message_deleted',
              },
              () => {
                this.RBSheet.close();
              },
            );
          },
        },
      ],
      {cancelable: false},
    );
  };

  getReactionData = reactions => {
    let result = {};
    Object.keys(reactions).map(key => {
      const reaction = reactions[key];
      if (result[reaction.text]) {
        result[reaction.text].push(reaction.userId);
      } else {
        result[reaction.text] = [reaction.userId];
      }
    });
    const res = Object.keys(result).map(key => ({
      text: key,
      users: result[key],
    }));
    return res;
  };

  onPressReactionView = users => {
    const {selectedRoom} = this.props;
    let msg = '';
    users.map(user => {
      const find = selectedRoom.includes.find(i => i._id === user);
      if (find && msg.length === 0) msg = find.name;
      else if (find) msg += `, ${find.name}`;
    });
    showAlert(msg);
  };

  render() {
    const {selectedBubble, editing, editText, showImagePreview} = this.state;
    const {
      t,
      theme,
      hasAvatar,
      hasTime,
      hasDate,
      bubbleId,
      profile,
      selectedRoom,
      roomMessages,
      onPressEmoji,
    } = this.props;
    const bubble = roomMessages[bubbleId];
    if (!bubble) return null;
    let bubbleUser = selectedRoom.includes.find(i => i._id === bubble.userId);
    let mine = bubble.userId === profile._id;
    if (!bubbleUser) return null;
    const timeString = moment(bubble.date).format('hh:mm A');
    return (
      <MCView align="center">
        {hasDate && (
          <MCView width={300} row align="center" justify="center">
            <DividerLine style={{flex: 1}} />
            <H4
              align="center"
              pv={20}
              ph={20}
              weight="italic"
              color={theme.colors.border}>
              {getDateString(bubble.date)}
            </H4>
            <DividerLine style={{flex: 1}} />
          </MCView>
        )}
        <MCView
          row
          mt={12}
          width={350}
          justify={mine ? 'flex-end' : 'flex-start'}
          overflow="visible"
          key={bubbleId}>
          {!mine && hasAvatar && (
            <MCButton
              onPress={() =>
                NavigationService.navigate('UserProfile', {id: bubbleUser._id})
              }>
              <MCImage
                round
                image={{uri: bubbleUser.avatar}}
                width={30}
                height={30}
                type="avatar"
              />
            </MCButton>
          )}
          {!mine && !hasAvatar && <MCView width={40} />}

          <MCView mt={-10}>
            {!mine && hasAvatar && (
              <H5 ph={10} color={theme.colors.border}>{`${bubbleUser.name}${
                hasTime ? ', ' + timeString : ''
              }`}</H5>
            )}
            {!mine && !hasAvatar && hasTime && (
              <H5 ph={10} color={theme.colors.border}>
                {timeString}
              </H5>
            )}
            {mine && hasTime && (
              <H5
                align="right"
                color={theme.colors.border}
                style={{width: '100%', paddingRight: dySize(10)}}>
                {timeString}
              </H5>
            )}
            <MCView align={mine ? 'flex-end' : 'flex-start'}>
              {hasAvatar && (
                <MCView
                  style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    top: -10,
                    left: mine ? null : 8,
                    right: mine ? 8 : null,
                    backgroundColor: mine ? bubbleColorMine : bubbleColor,
                    transform: [{rotate: '45deg'}],
                  }}
                />
              )}
              <BubbleMessageItem
                bubble={bubble}
                selectedRoom={selectedRoom}
                onEditBubble={() => this.onEditBubble(bubble, mine)}
                onPressEmoji={() => onPressEmoji()}
                onPressImage={bubble => this.onPreviewImage(bubble)}
              />
              {bubble.reactions && (
                <MCView
                  row
                  wrap
                  width={200}
                  ml={15}
                  mt={1}
                  mb={10}
                  justify={mine ? 'flex-end' : 'flex-start'}>
                  {this.getReactionData(bubble.reactions).map(i => {
                    return (
                      <MCButton
                        onPress={() => this.onPressReactionView(i.users)}
                        height={32}
                        pt={1}
                        pb={1}
                        br={15}
                        ph={10}
                        mr={10}
                        alignItems="center"
                        justify="center"
                        background={bubbleColor}>
                        <H4 color={theme.colors.background}>
                          {i.text} {i.users.length}
                        </H4>
                      </MCButton>
                    );
                  })}
                </MCView>
              )}
              {bubble.edited && bubble.text !== 'chat_message_deleted' && (
                <H4 weight="italic" ml={10} mr={10} color={theme.colors.border}>
                  {t('chat_message_edited')}
                </H4>
              )}
            </MCView>
          </MCView>
          <RBSheet
            ref={ref => (this.RBSheet = ref)}
            openDuration={3500}
            closeDuration={100}
            customStyles={{
              container: {
                backgroundColor: theme.colors.background,
                height: 'auto',
                alignItems: 'center',
              },
            }}>
            {editing ? (
              <>
                <MCView width={300} mt={20}>
                  <MCTextInput
                    multiline
                    value={editText}
                    onChangeText={text => this.setState({editText: text})}
                    style={{width: '100%', minHeight: 'auto'}}
                  />
                </MCView>
                <MCButton
                  bordered
                  mt={20}
                  pl={20}
                  pr={20}
                  onPress={() => this.updateMessage()}
                  align="center">
                  <H3>{t('button_update')}</H3>
                </MCButton>
                <MCButton
                  onPress={() => this.RBSheet.close()}
                  mt={10}
                  mb={20}
                  pl={20}
                  pr={20}>
                  <H3 color={theme.colors.border}>{t('button_cancel')}</H3>
                </MCButton>
              </>
            ) : (
              <MCView align="center" pv={20}>
                <MCButton onPress={() => this.onEditMessage()}>
                  <H3>{t('chat_action_edit_message')}</H3>
                </MCButton>
                <MCButton onPress={() => this.onDeleteMessage()}>
                  <H3 color={theme.colors.danger}>
                    {t('chat_action_delete_message')}
                  </H3>
                </MCButton>
              </MCView>
            )}
          </RBSheet>
          {selectedBubble && (
            <Modal visible={showImagePreview} transparent={true}>
              <ImageViewer
                imageUrls={[{url: selectedBubble.image}]}
                renderHeader={() => null}
              />
              <MCButton
                style={{
                  position: 'absolute',
                  top: 40,
                  right: 20,
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors.background,
                }}
                onPress={() => this.setState({showImagePreview: false})}>
                <MCIcon type="FontAwesome5Pro" name="times" size={20} />
              </MCButton>
            </Modal>
          )}
        </MCView>
      </MCView>
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
  updateMessage: chatActions.updateMessage,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChatBubbleItem),
);
