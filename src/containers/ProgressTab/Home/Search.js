import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView} from 'components/styled/View';
import {dySize} from 'utils/responsive';
import PostItem from './components/PostItem';

class ProgressSearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderPostItem = ({item}) => {
    const {profile} = this.props;
    const post = item;
    return <PostItem post={post} />;
  };

  render() {
    const {t, userPosts} = this.props;
    console.log({userPosts});
    return (
      <MCRootView justify="flex-start">
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            paddingBottom: 20,
            alignItems: 'center',
          }}
          data={userPosts}
          renderItem={this._renderPostItem}
          keyExtractor={item => item._id}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  userPosts: state.postReducer.userPosts,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressSearchTab),
);
