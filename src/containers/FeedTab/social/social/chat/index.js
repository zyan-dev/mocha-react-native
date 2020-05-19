import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import * as _ from 'lodash';
import {chatActions} from 'Redux/actions';
import {MCRootView, MCView, NativeCard} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class SocialChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressChatRoom = room => {
    this.props.selectChatRoom(room);
    setTimeout(() => {
      NavigationService.navigate('ChatRoom');
    });
  };

  _renderChatItem = ({item}) => {
    const {t, theme, profile} = this.props;
    const chatRoom = item;
    let lastUser = chatRoom.includes.find(i => i._id === chatRoom.last_userId);
    if (chatRoom.last_userId === profile._id) lastUser = profile;
    return (
      <NativeCard width={350} mt={10} ph={1} pv={5}>
        <MCButton onPress={() => this.onPressChatRoom(chatRoom)}>
          <MCView
            row
            justify="space-between"
            align="center"
            style={{paddingRight: dySize(20)}}>
            <H3 weight="bold" mr={20} style={{flex: 1}} numberOfLines={2}>
              {t(chatRoom.room_name)}
            </H3>
            {chatRoom.members.slice(0, 3).map((member, index) => {
              const find = chatRoom.includes.find(i => i._id === member);
              if (!find) return;
              return (
                <MCView mr={-15}>
                  <MCImage
                    image={{uri: find.avatar}}
                    round
                    type="avatar"
                    width={30}
                    height={30}
                  />
                  {chatRoom.members.length > 3 && index === 2 && (
                    <MCView
                      absolute
                      width={30}
                      height={30}
                      background={theme.colors.background}
                      align="center"
                      justify="center"
                      style={{opacity: 0.8}}>
                      <H4 weight="bold">+{chatRoom.members.length - 3}</H4>
                    </MCView>
                  )}
                </MCView>
              );
            })}
          </MCView>
          <MCView row justify="space-between" align="center">
            <H4 style={{flex: 1}} weight="italic" color={theme.colors.border}>
              {chatRoom.last_userId === profile._id ? (
                <H4 weight="italic">You</H4>
              ) : (
                <H4 weight="italic">{_.get(lastUser, ['name'], 'Someone')}</H4>
              )}
              {': '}
              {t(chatRoom.last_message || 'chat_message_created_room')}
            </H4>
            <H4 color={theme.colors.border}>
              {moment(chatRoom.last_updated).fromNow()}
            </H4>
          </MCView>
        </MCButton>
      </NativeCard>
    );
  };

  _onRefresh = () => {
    this.props.getMyChatRooms();
  };

  render() {
    const {t, myRooms, loading} = this.props;
    return (
      <MCRootView justify="flex-start" background="transparent">
        <FlatList
          contentContainerStyle={{width: dySize(375), alignItems: 'center'}}
          data={myRooms}
          renderItem={this._renderChatItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={loading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  myRooms: state.chatReducer.myRooms,
  loading: state.chatReducer.loading,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  selectChatRoom: chatActions.selectChatRoom,
  getMyChatRooms: chatActions.getMyChatRooms,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SocialChatScreen),
);
