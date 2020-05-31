import React from 'react';
import {Alert, Linking} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {MCIcon, MCImage} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {showAlert} from 'services/operators';
import {dySize} from 'utils/responsive';
import {TouchableOpacity} from 'react-native-gesture-handler';

const bubbleColor = '#AAAAAA';
const bubbleColorMine = '#303030';

class BubbleMessageItem extends React.PureComponent {
  static propTypes = {
    bubble: PropTypes.object.isRequired,
    selectedRoom: PropTypes.object.isRequired,
    onEditBubble: PropTypes.func,
    onPressEmoji: PropTypes.func,
    onPressImage: PropTypes.func,
  };

  state = {
    onEditBubble: () => undefined,
    onPressEmoji: () => undefined,
    onPressImage: () => undefined,
  };

  openUrl = url => {
    const {t} = this.props;
    Alert.alert(
      t('alert_title_mocha'),
      t('alert_redirect_hyperlink') + '\n\n' + url,
      [
        {
          text: t('button_cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('button_yes'),
          onPress: () => {
            Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              } else {
                showAlert("Don't know how to open URI: " + url);
              }
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {
      t,
      theme,
      profile,
      onEditBubble,
      onPressEmoji,
      onPressImage,
      bubble,
      selectedRoom,
    } = this.props;
    const mine = bubble.userId === profile._id;

    // for created chat message
    const owner = selectedRoom.includes.find(i => i._id === bubble.userId);

    // for added chat message
    const text = bubble.text;
    const keys = text.split('&');
    const who = owner ? owner.name : '???';
    let names = [];
    keys.map((key, index) => {
      if (index === 0) return;
      const find = selectedRoom.includes.find(i => i._id === key);
      if (find) names.push(find.name);
      else names.push('???');
    });
    const whom = names.map((name, index) => {
      if (names.length === 1 && index === 0) return `@${name}`;
      if (index === names.length - 1 && index > 0) return ` and @${name}`;
      else return ` @${name}`;
    });

    // for messages which contains link
    let linkMsg = [];
    var urlRegex = new RegExp(/(https?:\/\/[^\s]+)/g);
    bubble.text.split(/\s|\n/g).map(word => {
      if (urlRegex.test(word)) {
        linkMsg.push(
          <H3 color="#1050B0" underline onPress={() => this.openUrl(word)}>
            {word}
          </H3>,
        );
      } else {
        linkMsg.push(word + ' ');
      }
    });
    const editable =
      bubble.text !== 'who_chat_message_created_room' &&
      bubble.text !== 'chat_message_deleted' &&
      bubble.text.indexOf('chat_message_who_added_whom') < 0;

    return (
      <MCView row>
        {mine && editable && (
          <TouchableOpacity onPress={() => onEditBubble(bubble, mine)}>
            <MCIcon name="md-more" color={theme.colors.border} />
          </TouchableOpacity>
        )}
        <MCView
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
            <MCButton onPress={() => onPressImage(bubble)}>
              <MCImage
                image={{uri: bubble.image}}
                width={220}
                height={120}
                br={10}
              />
            </MCButton>
          )}
          {bubble.text === 'who_chat_message_created_room' ? (
            <H3 color={mine ? 'white' : 'black'} ph={5}>
              {t('who_chat_message_created_room', {
                who: `@${owner.name}`,
              })}
            </H3>
          ) : bubble.text.indexOf('chat_message_who_added_whom') > -1 ? (
            <H3 color={mine ? 'white' : 'black'} ph={5}>
              {t('chat_message_who_added_whom', {who, whom})}
            </H3>
          ) : bubble.text === 'chat_message_deleted' ? (
            <H4
              ph={5}
              weight="italic"
              style={{opacity: 0.5}}
              color={mine ? 'white' : 'black'}>
              {t('chat_message_deleted')}
            </H4>
          ) : bubble.text.indexOf('https://') > -1 ? (
            <H3 color={mine ? 'white' : 'black'} ph={5}>
              {linkMsg}
            </H3>
          ) : bubble.text.length > 0 ? (
            <H3 color={mine ? 'white' : 'black'} ph={5}>
              {bubble.text}
            </H3>
          ) : null}
        </MCView>
        {!mine && (
          <MCButton onPress={() => onPressEmoji()} pt={1} pl={0} ml={-10}>
            <MCIcon
              type="FontAwesome5Pro"
              name="grin"
              color={theme.colors.border}
            />
          </MCButton>
        )}
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BubbleMessageItem),
);
