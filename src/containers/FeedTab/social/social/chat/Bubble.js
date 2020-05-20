import React from 'react';
import {Alert, Modal} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {chatActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageViewer from 'react-native-image-zoom-viewer';
import {MCView} from 'components/styled/View';
import {MCImage, MCIcon} from 'components/common';
import {H3, H4, H5, MCTextInput} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {convertChatMessage} from 'services/operators';
import {MCButton} from 'components/styled/Button';

const bubbleColor = '#AAAAAA';
const bubbleColorMine = '#303030';

class ChatBubbleItem extends React.Component {
  static propTypes = {
    bubbleId: PropTypes.object.isRequired,
    hasAvatar: PropTypes.bool.isRequired,
  };

  state = {
    selectedBubble: null,
    editing: false,
    editText: '',
    showImagePreview: false,
  };

  onEditBubble = (bubble, mine) => {
    if (bubble.text === 'chat_message_deleted') return;
    if (bubble.text === 'who_chat_message_created_room') return;
    if (bubble.text.indexOf('chat_message_who_added_whom') > -1) return;
    if (mine) {
      this.setState({selectedBubble: bubble});
      // this.RBSheet && this.RBSheet.open();
      this.setState({showImagePreview: true});
    } else {
      //  go to preview screen directly
    }
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
    const {t, deleteMessage, selectedRoom} = this.props;
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

  render() {
    const {selectedBubble, editing, editText, showImagePreview} = this.state;
    const {
      t,
      theme,
      hasAvatar,
      bubbleId,
      profile,
      selectedRoom,
      roomMessages,
    } = this.props;
    const bubble = roomMessages[bubbleId];
    let bubbleUser = selectedRoom.includes.find(i => i._id === bubble.userId);
    let mine = false;
    if (bubble.userId === profile._id) {
      mine = true;
    }
    if (!bubbleUser) return null;
    return (
      <MCView
        row
        mt={12}
        width={350}
        justify={mine ? 'flex-end' : 'flex-start'}
        overflow="visible"
        key={bubbleId}>
        {!mine && hasAvatar && (
          <MCImage
            round
            image={{uri: bubbleUser.avatar}}
            width={30}
            height={30}
            type="avatar"
          />
        )}
        {!mine && !hasAvatar && <MCView width={30} />}
        <MCView mt={-10}>
          {!mine && hasAvatar && <H5 ml={15}>{bubbleUser.name}</H5>}
          <MCView mt={mine && hasAvatar ? 10 : 0}>
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
            <MCButton
              onPress={() => this.onEditBubble(bubble, mine)}
              br={10}
              ml={10}
              mr={10}
              ph={5}
              pv={5}
              justify="center"
              // align={mine ? 'flex-end' : 'flex-start'}
              br={10}
              background={mine ? bubbleColorMine : bubbleColor}
              style={{
                maxWidth: dySize(240),
                minWidth: dySize(40),
                minHeight: dySize(40),
              }}>
              {bubble.image && (
                <MCImage
                  image={{uri: bubble.image}}
                  width={230}
                  height={120}
                  br={10}
                />
              )}
              {bubble.text && (
                <H4 color={mine ? 'white' : 'black'} ph={5}>
                  {convertChatMessage(bubble, selectedRoom)}
                </H4>
              )}
            </MCButton>
          </MCView>
        </MCView>
        <RBSheet
          ref={ref => (this.RBSheet = ref)}
          openDuration={500}
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
                  value={editText}
                  onChangeText={text => this.setState({editText: text})}
                  style={{width: '100%'}}
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
              {selectedBubble && selectedBubble.image && (
                <MCButton
                  onPress={() => this.setState({showImagePreview: true})}>
                  <H3>{t('chat_action_preview_image')}</H3>
                </MCButton>
              )}
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
        {selectedBubble && selectedBubble.image && (
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
