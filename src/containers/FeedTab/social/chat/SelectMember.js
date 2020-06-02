import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import NavigationService from 'navigation/NavigationService';
import {userActions, chatActions} from 'Redux/actions';
import {MCHeader, MCImage, MCSearchInput, MCIcon} from 'components/common';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCRootView, MCView, NativeCard} from 'components/styled/View';
import {dySize} from 'utils/responsive';

class SelectChatMemberScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isMultiple: props.route.params.multiple,
      type: props.route.params.type || 'create_room',
    };
  }

  componentDidMount() {
    this.props.setSeletedUsers([]);
    this.props.getTrustMembers({
      status: 1,
      name: '',
      page: 1,
    });
  }

  onChangeSearchText = text => {
    this.setState({searchText: text});
    this.props.getTrustMembers({
      status: 1,
      name: text,
      page: 1,
    });
  };

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  selectUser = user => {
    const {isMultiple} = this.state;
    if (isMultiple) {
      this.props.selectUser(user);
    } else {
      this.props.selectSingleUser(user);
      NavigationService.goBack();
    }
  };

  onAddMembersToChatRoom = () => {
    const {selectedUsers, selectedRoom, addMemberToRoom} = this.props;
    addMemberToRoom(selectedUsers, selectedRoom, () => {
      NavigationService.goBack();
    });
  };

  deselectUser = user => {
    const {isMultiple} = this.state;
    if (isMultiple) {
      this.props.deselectUser(user);
    }
  };

  searchNextPage = () => {
    const {
      getTrustMembers,
      searchPageLimited,
      searchPageIndex,
      pageSearching,
    } = this.props;
    if (searchPageLimited || pageSearching) return;
    getTrustMembers({page: searchPageIndex + 1});
  };

  _renderUserItem = ({item}) => {
    const {type} = this.state;
    const {theme, myProfile, selectedUsers, selectedRoom} = this.props;
    const user = item;
    // skip owner's profile
    if (user._id === myProfile._id) return null;
    // skip original chat members when adding new members in the chat room
    if (selectedRoom) {
      const find = selectedRoom.includes.find(i => i._id === user._id);
      if (type === 'add_member' && find) return null;
    }

    // check if selected
    const filtered = selectedUsers.filter(
      selected => selected._id === user._id,
    );
    const selected = filtered.length > 0;

    return (
      <NativeCard width={350} pv={1} mt={10}>
        <MCView key={user.user_id} row align="center" shadow p={0}>
          <MCButton onPress={() => this.onPressUserAvatar(user)}>
            <MCImage
              width={80}
              height={80}
              round
              type="avatar"
              image={{uri: user.avatar}}
            />
          </MCButton>
          <MCButton
            style={{flex: 1}}
            row
            align="center"
            onPress={() => {
              selected ? this.deselectUser(user) : this.selectUser(user);
            }}>
            <MCView style={{flex: 1}} ml={10} justify="center">
              <H3>{user.name}</H3>
              <H4 padding={0} color={theme.colors.border}>
                {`@${user.user_id}`}
              </H4>
            </MCView>
            {selected && (
              <MCIcon
                name="ios-checkmark"
                color={theme.colors.toggle_on}
                size={60}
              />
            )}
          </MCButton>
        </MCView>
      </NativeCard>
    );
  };

  _renderSelectedUsers = ({item}) => {
    const {theme, deselectUser} = this.props;
    const user = item;
    return (
      <MCView mr={5}>
        <MCImage
          image={{uri: user.avatar}}
          width={70}
          height={70}
          round
          type="avatar"
        />
        <MCView
          absolute
          br={15}
          background={theme.colors.text}
          style={{top: 0, right: 0}}>
          <MCButton
            width={30}
            height={30}
            align="center"
            justify="center"
            onPress={() => deselectUser(user)}>
            <MCIcon
              name="ios-close"
              color={theme.colors.background}
              style={{
                padding: 0,
                alignItem: 'center',
                justifyContent: 'center',
                marginTop: -5,
              }}
            />
          </MCButton>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {type, searchText, isMultiple} = this.state;
    const {
      t,
      theme,
      selectedUsers,
      trustMembers,
      searchPageLimited,
      isLoading,
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('title_select_chat_member')}
          hasRight={type === 'add_member'}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onAddMembersToChatRoom()}
        />
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.onChangeSearchText(text)}
        />
        <MCView width={375} style={{flex: 1}}>
          <FlatList
            style={{width: dySize(375)}}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 100,
            }}
            data={trustMembers}
            renderItem={this._renderUserItem}
            ListEmptyComponent={
              <MCEmptyText>
                {isLoading ? t('progress_loading') : t('no_result')}
              </MCEmptyText>
            }
            ListFooterComponent={
              searchPageLimited && trustMembers.length ? (
                <MCEmptyText weight="italic">{t('no_more_result')}</MCEmptyText>
              ) : null
            }
            keyExtractor={item => item._id}
            onEndReached={() => this.searchNextPage()}
            onEndReachedThreshold={0.5}
          />

          {isMultiple && selectedUsers.length > 0 && (
            <MCView height={130} align="center">
              <H4>Selected Users ( {selectedUsers.length} )</H4>
              <FlatList
                horizontal
                style={{width: dySize(375)}}
                contentContainerStyle={{paddingHorizontal: dySize(15)}}
                data={selectedUsers}
                renderItem={this._renderSelectedUsers}
                keyExtractor={item => item._id}
                ListEmptyComponent={
                  <MCEmptyText>{t('you did not select yet')}</MCEmptyText>
                }
              />
            </MCView>
          )}
        </MCView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedUsers: state.usersReducer.selectedUsers,
  trustMembers: state.usersReducer.trustMembers,
  searchPageLimited: state.usersReducer.searchPageLimited,
  searchPageIndex: state.usersReducer.searchPageIndex,
  pageSearching: state.usersReducer.pageSearching,
  myProfile: state.profileReducer,
  theme: state.routerReducer.theme,
  isLoading: state.routerReducer.isLoading,
  selectedRoom: state.chatReducer.selectedRoom,
});

const mapDispatchToProps = {
  selectUser: userActions.selectUser,
  deselectUser: userActions.deselectUser,
  selectSingleUser: userActions.selectSingleUser,
  getTrustMembers: userActions.getTrustMembers,
  setSeletedUsers: userActions.setSeletedUsers,
  addMemberToRoom: chatActions.addMemberToRoom,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectChatMemberScreen),
);
