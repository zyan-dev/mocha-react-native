import React from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {withTranslation} from 'react-i18next';
import {postActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import PostItem from './components/PostItem';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class ProgressOwnTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressEdit = post => {
    this.props.selectPost(post);
    NavigationService.navigate('AddPost');
  };

  onPressRemove = post => {
    this.props.removePosts([post._id]);
  };

  _renderPostItem = ({item}) => {
    const post = item;
    return (
      <PostItem
        post={post}
        onPressEdit={() => this.onPressEdit(post)}
        onPressRemove={() => this.onPressRemove(post)}
      />
    );
  };

  render() {
    const {t, myPosts} = this.props;
    console.log('My Posts', myPosts.length);
    return (
      <MCRootView justify="flex-start">
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            paddingBottom: 20,
            alignItems: 'center',
          }}
          data={myPosts}
          renderItem={this._renderPostItem}
          keyExtractor={item => item._id}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  myPosts: state.postReducer.myPosts,
});

const mapDispatchToProps = {
  selectPost: postActions.selectPost,
  removePosts: postActions.removePosts,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressOwnTab),
);
