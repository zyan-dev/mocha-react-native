import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {userActions} from 'Redux/actions';
import {
  MCHeader,
  MCSearchInput,
  MCImage,
  MCModal,
  MCIcon,
} from 'components/common';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {selector} from 'Redux/selectors';
import NavigationService from 'navigation/NavigationService';
import {MCCard, MCView, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';

class SendRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedUser: null,
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.getUntrustmembers({page: 1});
  }

  onPressUser = user => {
    this.setState({selectedUser: user, showModal: true});
  };

  sendRequest = () => {
    const {selectedUser} = this.state;
    this.props.sendContactRequest({to: selectedUser._id});
    this.setState({showModal: false});
  };

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  filterUser = users => {
    const {searchText} = this.state;
    return users.filter(user => {
      if (!user.name || !user.user_id) return false;
      if (
        user.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        user.user_id.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
        return true;
      else return false;
    });
  };

  searchNextPage = () => {
    const {
      getUntrustmembers,
      searchPageLimited,
      searchPageIndex,
      pageSearching,
    } = this.props;
    if (searchPageLimited || pageSearching) return;
    getUntrustmembers({page: searchPageIndex + 1});
  };

  _renderUserItem = ({item}) => {
    const {theme} = this.props;
    const user = item;
    return (
      <MCCard
        key={user.user_id}
        row
        align="center"
        width={350}
        shadow
        mt={10}
        p={0}>
        <MCButton onPress={() => this.onPressUserAvatar(user)}>
          <MCImage
            width={80}
            height={80}
            round
            type="avatar"
            image={{uri: user.avatar}}
          />
        </MCButton>
        <MCView style={{flex: 1}} ml={10} justify="center">
          <H3>{user.name}</H3>
          <H4 padding={0} color={theme.colors.border}>{`@${user.user_id}`}</H4>
        </MCView>
        <MCButton onPress={() => this.onPressUser(user)}>
          <MCIcon
            name="ios-add-circle-outline"
            color={theme.colors.toggle_on}
            size={30}
          />
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, theme, searchedUsers, searchPageLimited} = this.props;
    const {searchText, selectedUser, showModal} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('feed_menu_send_request')} />
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.setState({searchText: text})}
        />
        <FlatList
          style={{width: dySize(375)}}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 100,
          }}
          data={this.filterUser(searchedUsers)}
          renderItem={this._renderUserItem}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          ListFooterComponent={
            searchPageLimited && this.filterUser(searchedUsers).length ? (
              <MCEmptyText weight="italic">{t('no_more_result')}</MCEmptyText>
            ) : null
          }
          keyExtractor={item => item._id}
          onEndReached={() => this.searchNextPage()}
          onEndReachedThreshold={0.5}
        />
        {selectedUser && (
          <MCModal
            isVisible={showModal}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={320} ph={20} pv={20}>
              <MCImage
                width={60}
                height={60}
                image={{uri: selectedUser.avatar}}
                round
              />
              <H3 weight="bold">{selectedUser.name}</H3>
              <H4 align="center">{t('contact_request_modal_question')}</H4>
              <MCButton bordered mt={20} onPress={() => this.sendRequest()}>
                <H3 width={100} align="center">
                  {t('yes')}
                </H3>
              </MCButton>
            </MCView>
          </MCModal>
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  myProfile: state.profileReducer,
  allUsers: selector.users.getAllMembersWithNetworkState(state),
  searchedUsers: state.usersReducer.searchedUsers,
  searchPageLimited: state.usersReducer.searchPageLimited,
  searchPageIndex: state.usersReducer.searchPageIndex,
  pageSearching: state.usersReducer.pageSearching,
});

const mapDispatchToProps = {
  sendContactRequest: userActions.sendContactRequest,
  getUntrustmembers: userActions.getUntrustmembers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SendRequestScreen),
);
