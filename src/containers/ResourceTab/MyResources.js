import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {MCEmptyText} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';
import ResourceItem from './ResourceItem';

class MyResourceScreen extends React.PureComponent {
  onPressNew = () => {
    this.props.setInitialResource();
    NavigationService.navigate('AddResource');
  };

  onPressEdit = item => {
    this.props.selectResource(item);
    NavigationService.navigate('AddResource');
  };

  onPressRemove = item => {
    this.props.removeResources([item._id]);
  };

  _renderListItem = ({item}) => {
    const {bookmarkedResources} = this.props;
    const bookmarked = bookmarkedResources.indexOf(item._id) > -1;
    return (
      <ResourceItem
        resource={item}
        bookmarked={bookmarked}
        onPressBookmark={id => {
          this.props.bookmarkResource(id);
          this.forceUpdate();
        }}
        onPressEdit={this.onPressEdit}
        onPressRemove={this.onPressRemove}
      />
    );
  };

  getMyResources = resources => {
    const {profile} = this.props;
    return resources.filter(resource => resource.owner === profile._id);
  };

  render() {
    const {t, allResources} = this.props;
    return (
      <MCRootView>
        <MCHeader
          title={t('resources_mylist_headerTitle')}
          hasRight={true}
          rightIcon="plus"
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            data={this.getMyResources(allResources)}
            renderItem={this._renderListItem}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
});

const mapDispatchToProps = {
  setInitialResource: resourceActions.setInitialResource,
  removeResources: resourceActions.removeResources,
  selectResource: resourceActions.selectResource,
  bookmarkResource: resourceActions.bookmarkResource,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MyResourceScreen),
);
