import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {userActions, postActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {MCSearchInput, MCImage} from 'components/common';
import {H3, MCEmptyText} from 'components/styled/Text';
import {MCContent} from 'components/styled/View';
import PostItem from './components/PostItem';
import {dySize} from 'utils/responsive';

class ProgressMembersTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };
  }

  onChangeSearchName = text => {
    const {getTrustMembers} = this.props;
    this.setState({searchName: text});
    getTrustMembers({
      status: 1,
      name: text,
      page: 1,
    });
  };

  searchNextPageUsers = () => {
    const {
      userPageLimited,
      userPageSearching,
      userSearchIndex,
      getTrustMembers,
    } = this.props;
    if (userPageLimited || userPageSearching) return;
    getTrustMembers({
      status: 1,
      name: text,
      page: userSearchIndex + 1,
    });
  };

  onPressUser = user => {
    this.props.selectPostUser(user);
    this.props.getPostsById({id: user._id, page: 1});
  };

  searchNextPagePosts = () => {
    const {pageLimited, pageSearching, pageIndex, getPostsById} = this.props;
    if (pageLimited || pageSearching) return;
    getPostsById({id: user._id, page: pageIndex + 1});
  };

  _renderAvatar = ({item}) => {
    const {theme, selectedUser} = this.props;
    const user = item;
    const selected = selectedUser._id === user._id;
    return (
      <MCButton mr={10} onPress={() => this.onPressUser(user)} br={20}>
        <MCImage
          image={{uri: user.avatar}}
          type="avatar"
          width={40}
          height={40}
          round
          style={{
            borderWidth: selected ? dySize(2) : 0,
            borderColor: theme.colors.outline,
          }}
        />
      </MCButton>
    );
  };

  _renderPostItem = ({item}) => {
    const post = item;
    return <PostItem post={post} editable={false} />;
  };

  render() {
    const {t, trustMembers, selectedUser, userPosts, pageLimited} = this.props;
    const {searchName} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCSearchInput
          width={350}
          text={searchName}
          onChange={text => this.onChangeSearchName(text)}
          placeholder={t('placeholder_search_by_name')}
        />
        <MCView width={350} height={60} justify="center">
          <FlatList
            data={trustMembers}
            horizontal
            renderItem={this._renderAvatar}
            keyExtractor={item => item._id}
            onEndReached={() => this.searchNextPageUsers()}
            onEndReachedThreshold={0.5}
          />
        </MCView>
        {selectedUser && (
          <FlatList
            contentContainerStyle={{
              width: dySize(375),
              paddingHorizontal: dySize(15),
              alignItems: 'center',
            }}
            data={userPosts}
            renderItem={this._renderPostItem}
            keyExtractor={item => item._id}
            onEndReached={() => this.searchNextPagePosts()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              pageLimited && userPosts.length ? (
                <MCEmptyText weight="italic">{t('no_more_result')}</MCEmptyText>
              ) : null
            }
            ListEmptyComponent={
              <MCEmptyText weight="italic">
                {t('result_has_no_posts')}
              </MCEmptyText>
            }
            ListHeaderComponent={
              <H3 width={345}>
                {t('label_whose_posts', {who: selectedUser.name})}
              </H3>
            }
          />
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  trustMembers: state.usersReducer.trustMembers,
  userSearchIndex: state.usersReducer.searchPageIndex,
  userPageLimited: state.usersReducer.searchPageLimited,
  userPageSearching: state.usersReducer.pageSearching,
  selectedUser: state.postReducer.selectedUser,
  userPosts: state.postReducer.userPosts,
  pageIndex: state.postReducer.pageIndex,
  pageLimited: state.postReducer.pageLimited,
  pageSearching: state.postReducer.pageSearching,
});

const mapDispatchToProps = {
  getTrustMembers: userActions.getTrustMembers,
  selectPostUser: postActions.selectPostUser,
  getPostsById: postActions.getPostsById,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressMembersTab),
);
