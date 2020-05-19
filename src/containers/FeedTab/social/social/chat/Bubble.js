import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {chatActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCHeader, MCImage, MCIcon, MCModal} from 'components/common';
import {MCTextInput, H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import styled from 'styled-components';

const bubbleColor = '#AAAAAA';
const bubbleColorMine = '#303030';

const BubbleSnippet = styled.View`
  position: absolute;
  width: 50px;
  height: 50px;
  border-bottom-left-radius: 30000px;
  border-bottom-right-radius: 30000px;
  background: ${bubbleColor};
  top: -15px;
  left: 8px;
`;

class ChatBubbleItem extends React.Component {
  static propTypes = {
    bubbleId: PropTypes.object.isRequired,
    hasAvatar: PropTypes.bool.isRequired,
  };

  render() {
    const {
      t,
      hasAvatar,
      bubbleId,
      profile,
      selectedRoom,
      roomMessages,
    } = this.props;
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
          <MCView>
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
            <MCView
              br={10}
              ml={10}
              mr={10}
              ph={10}
              justify="center"
              align={mine ? 'flex-end' : 'flex-start'}
              br={10}
              background={mine ? bubbleColorMine : bubbleColor}
              style={{
                maxWidth: dySize(250),
                minWidth: dySize(40),
                minHeight: dySize(40),
              }}>
              {bubble.text && (
                <H4 color={mine ? 'white' : 'black'}>
                  {bubble.text === 'who_chat_message_created_room'
                    ? t('who_chat_message_created_room', {who: bubbleUser.name})
                    : bubble.text}
                </H4>
              )}
            </MCView>
          </MCView>
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
  )(ChatBubbleItem),
);
