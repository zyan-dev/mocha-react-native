import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {postActions} from 'Redux/actions';
import {MCSearchInput} from 'components/common';
import {MCRootView} from 'components/styled/View';
import {MCEmptyText} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import PostItem from './components/PostItem';

class ProgressSearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  onChangeSearchText = text => {
    this.setState({searchText: text});
    this.props.getPosts({title: text, page: 1});
  };

  searchNextPage = () => {
    const {searchText} = this.state;
    const {getPosts, pageLimited, pageSearching, pageIndex} = this.props;
    if (pageLimited || pageSearching) return;
    getPosts({title: searchText, page: pageIndex + 1});
  };

  _renderPostItem = ({item}) => {
    const {profile} = this.props;
    const post = item;
    if (post.ownerId === profile._id) return null;
    return <PostItem post={post} editable={false} />;
  };

  render() {
    const {searchText} = this.state;
    const {t, userPosts, pageLimited} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.onChangeSearchText(text)}
          placeholder={t('resource_search_book_placeholder')}
        />
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            paddingBottom: 20,
            alignItems: 'center',
          }}
          data={userPosts}
          renderItem={this._renderPostItem}
          keyExtractor={item => item._id}
          onEndReached={() => this.searchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            pageLimited && userPosts.length ? (
              <MCEmptyText weight="italic">{t('no_more_result')}</MCEmptyText>
            ) : null
          }
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  userPosts: state.postReducer.userPosts,
  pageLimited: state.postReducer.pageLimited,
  pageSearching: state.postReducer.pageSearching,
  pageIndex: state.postReducer.pageIndex,
});

const mapDispatchToProps = {
  getPosts: postActions.getPosts,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressSearchTab),
);
