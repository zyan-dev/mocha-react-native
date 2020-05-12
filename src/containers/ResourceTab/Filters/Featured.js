import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {MCEmptyText} from 'components/styled/Text';
import {H3} from 'components/styled/Text';

class FeatureResourceScreen extends React.PureComponent {
  filter = resources => {
    const {bookmarkedResources} = this.props;
    const filtered = resources.filter(resource => {
      return bookmarkedResources.indexOf(resource._id) > -1;
    });
    return filtered;
  };

  _renderListItem = ({item}) => {
    return (
      <MCRootView>
        <H3>Featured Page</H3>
      </MCRootView>
    );
  };

  render() {
    const {t, allResources} = this.props;
    return (
      <MCRootView>
        <H3>Featured Page</H3>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
});

const mapDispatchToProps = {
  bookmarkResource: resourceActions.bookmarkResource,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FeatureResourceScreen),
);
