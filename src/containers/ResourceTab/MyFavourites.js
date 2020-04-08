import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {reflectionActions, otherActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCContent, MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCHeader, MCReadMoreText, MCTagsView} from 'components/common';
import {H3, H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
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
        onPressBookmark={(id) => this.props.bookmarkResource(id)}
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
  bookmarkResource: otherActions.bookmarkResource,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FavouriteResourceScreen),
);
