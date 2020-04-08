import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {MCEmptyText} from 'components/styled/Text';
import ResourceItem from './ResourceItem';

class FavouriteResourceScreen extends React.PureComponent {
  filter = (resources) => {
    const {bookmarkedResources} = this.props;
    const filtered = resources.filter((resource) => {
      return bookmarkedResources.indexOf(resource._id) > -1;
    });
    return filtered;
  };

  _renderListItem = ({item}) => {
    return (
      <ResourceItem
        resource={item}
        bookmarked
        onPressBookmark={(id) => {
          this.props.bookmarkResource(id);
          this.forceUpdate();
        }}
        onPressEdit={this.onPressEdit}
        onPressRemove={this.onPressRemove}
        editable={false}
      />
    );
  };

  render() {
    const {t, allResources} = this.props;
    return (
      <MCRootView>
        <MCHeader
          title={t('resources_favourite_headerTitle')}
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            data={this.filter(allResources)}
            renderItem={this._renderListItem}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
});

const mapDispatchToProps = {
  bookmarkResource: resourceActions.bookmarkResource,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FavouriteResourceScreen),
);
