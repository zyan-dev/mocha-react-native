import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {routerActions, userActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
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
        row
        align="center"
        width={340}
        pt={10}
        pb={10}
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
        <MCView style={{flex: 1}} ml={10} justify="center">
          <H3>{user.name}</H3>
          <H4 padding={0} color={theme.colors.border}>{`@${user.user_id}`}</H4>
        </MCView>
      </MCButton>
    );
  };

  render() {
    const {searchText} = this.state;
    const {
      t,
      theme,
      pageSearching,
      searchedUsers,
      searchPageLimited,
    } = this.props;
    if (!searchedUsers) return null;
    return (
      <View style={{flex: 1}}>
        <MCView
          width={375}
          align="center"
          style={{position: 'relative', zIndex: 10}}
          overflow="visible">
          <MCSearchInput
            width={350}
            text={searchText}
            onChange={text => this.onChangeSearchText(text)}
            // onBlur={() => this.setState({searchText: ''})}
          />
          {searchText.length > 0 && (
            <MCView style={{marginTop: -10, maxHeight: 300}}>
              <FlatList
                style={{
                  borderWidth: searchedUsers.length > 0 ? 1 : 0,
                  borderRadius: 4,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                  width: dySize(350),
                }}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                  padding: dySize(5),
                }}
                data={searchedUsers}
                renderItem={this._renderUserItem}
                ListEmptyComponent={
                  <MCView bordered align="center">
                    <MCEmptyText>
                      {pageSearching ? t('progress_loading') : t('no_result')}
                    </MCEmptyText>
                  </MCView>
                }
                ListFooterComponent={
                  searchPageLimited && searchedUsers.length ? (
                    <MCEmptyText weight="italic">
                      {t('no_more_result')}
                    </MCEmptyText>
                  ) : null
                }
                keyExtractor={item => item._id}
                onEndReached={() => this.searchNextPage()}
                onEndReachedThreshold={0.5}
              />
            </MCView>
          )}
        </MCView>
        {searchText.length === 0 && (
          <MCContent
            style={{zIndex: 9}}
            contentContainerStyle={{
              paddingHorizontal: dySize(12),
              paddingVertical: dySize(5),
            }}>
            <H4 align="center" color={theme.colors.border}>
              {t('no_feeds')}
            </H4>
          </MCContent>
        )}
      </View>
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
