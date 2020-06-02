import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {routerActions, userActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCHeader, MCSearchInput, MCImage} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class SocialSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
    this.props.findUserByName({name: '', page: 1});
  }

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  onChangeSearchText = text => {
    this.setState({searchText: text});
    this.props.setSearchPageIndex(1);
    this.props.findUserByName({name: text, page: 1});
  };

  searchNextPage = () => {
    const {searchText} = this.state;
    const {
      findUserByName,
      searchPageLimited,
      searchPageIndex,
      pageSearching,
    } = this.props;
    if (searchPageLimited || pageSearching) return;
    findUserByName({name: searchText, page: searchPageIndex + 1});
  };

  _renderUserItem = ({item}) => {
    const {theme, profile} = this.props;
    const user = item;
    if (user._id === profile._id) return null;
    return (
      <MCButton
        align="center"
        width={117}
        pt={10}
        pb={10}
        pl={10}
        pr={10}
        onPress={() => this.onPressUserAvatar(user)}
        style={{
          borderBottomWidth: 0.2,
          borderColor: theme.colors.border,
        }}>
        <MCImage
          width={60}
          height={60}
          round
          type="avatar"
          image={{uri: user.avatar}}
        />
        <H3 align="center">{user.name}</H3>
      </MCButton>
    );
  };

  render() {
    const {searchText} = this.state;
    const {
      t,
      theme,
      profile,
      pageSearching,
      searchedUsers,
      searchPageLimited,
    } = this.props;
    if (!searchedUsers) return null;
    return (
      <MCRootView justify="flex-start" background="transparent">
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.onChangeSearchText(text)}
          // onBlur={() => this.setState({searchText: ''})}
        />
        <FlatList
          contentContainerStyle={{
            width: dySize(350),
            paddingTop: dySize(20),
          }}
          numColumns={3}
          keyboardShouldPersistTaps="always"
          data={searchedUsers.filter(i => i._id !== profile._id)}
          renderItem={this._renderUserItem}
          ListEmptyComponent={
            <MCView align="center">
              <MCEmptyText>
                {pageSearching ? t('progress_loading') : t('no_result')}
              </MCEmptyText>
            </MCView>
          }
          ListFooterComponent={
            searchPageLimited && searchedUsers.length ? (
              <MCEmptyText weight="italic">{t('no_more_result')}</MCEmptyText>
            ) : null
          }
          keyExtractor={item => item._id}
          onEndReached={() => this.searchNextPage()}
          onEndReachedThreshold={0.5}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  searchedUsers: state.usersReducer.searchedUsers,
  searchPageLimited: state.usersReducer.searchPageLimited,
  searchPageIndex: state.usersReducer.searchPageIndex,
  pageSearching: state.usersReducer.pageSearching,
  theme: state.routerReducer.theme,
  isLoading: state.routerReducer.isLoading,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setSocialDrawerOpened,
  findUserByName: userActions.findUserByName,
  setSearchPageIndex: userActions.setSearchPageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SocialSearchScreen),
);
