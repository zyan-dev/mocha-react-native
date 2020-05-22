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
import {NativeCard, MCView, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';

class SendRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedUser: null,
      showModal: false,
      sentUserIds: [],
    };
  }

  componentDidMount() {
    this.props.getUntrustmembers({page: 1});
  }

  onPressUser = user => {
    this.setState({selectedUser: user, showModal: true});
  };

  sendRequest = () => {
    const {selectedUser, sentUserIds} = this.state;
    this.props.sendContactRequest({to: selectedUser._id});
    this.setState({showModal: false});
    sentUserIds.push(selectedUser._id);
    this.setState({sentUserIds});
  };

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  filterUser = users => {
    const {searchText} = this.state;
    const {myProfile} = this.props;
    return users.filter(user => {
      if (!user.name || !user.user_id) return false;
      if (user._id === myProfile._id) return null;
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
    const {sentUserIds} = this.state;
    const {theme} = this.props;
    const user = item;
    const sent = sentUserIds.indexOf(user._id) > -1;
    return (
      <NativeCard width={350} pv={1} mt={10}>
        <MCView key={user.user_id} row align="center" p={0}>
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
            <H4 padding={0} color={theme.colors.border}>{`@${
              user.user_id
            }`}</H4>
          </MCView>
          {sent ? (
            <MCButton>
              <MCIcon
                name="ios-checkmark-circle-outline"
                color={theme.colors.text}
                size={30}
              />
            </MCButton>
          ) : (
            <MCButton onPress={() => this.onPressUser(user)}>
              <MCIcon
                name="ios-add-circle-outline"
                color={theme.colors.toggle_on}
                size={30}
              />
            </MCButton>
          )}
        </MCView>
      </NativeCard>
    );
  };

  render() {
    const {t, theme, searchedUnTrustMembers, searchPageLimited} = this.props;
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
          data={this.filterUser(searchedUnTrustMembers)}
          renderItem={this._renderUserItem}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          ListFooterComponent={
            searchPageLimited &&
            this.filterUser(searchedUnTrustMembers).length ? (
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
                width={80}
                height={80}
                image={{uri: selectedUser.avatar}}
                round
                type="avatar"
              />
              <H3 weight="bold" mt={20}>
                {selectedUser.name}
              </H3>
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
  searchedUnTrustMembers: state.usersReducer.searchedUnTrustMembers,
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
