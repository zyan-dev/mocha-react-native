import React from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {withTranslation} from 'react-i18next';
import {MCRootView} from 'components/styled/View';
import PostItem from './components/PostItem';
import {dySize} from 'utils/responsive';

class ProgressOwnTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderPostItem = ({item}) => {
    const post = item;
    return <PostItem post={post} />;
  };

  render() {
    const {t, myPosts} = this.props;
    console.log({myPosts});
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

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressOwnTab),
);
