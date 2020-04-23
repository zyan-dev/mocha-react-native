import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import {getStringIndexOf} from 'services/operators';
import {MCEmptyText} from 'components/styled/Text';
import {MCContent, MCRootView} from 'components/styled/View';
import ResourceItem from '../ResourceItem';

class BookResourceScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      viewAll: true,
      filterTypes: [],
    };
  }

  componentDidMount() {
    if (this.props.profile.userToken.length) {
      this.props.getAllResources();
    }
  }

  filterResource = resources => {
    const {searchText, viewAll, filterTypes} = this.state;
    const filtered = resources.filter(resource => {
      if (!viewAll && filterTypes.indexOf(resource.type) < 0) return false;
      if (
        getStringIndexOf(resource.title, searchText) < 0 &&
        getStringIndexOf(JSON.stringify(resource.tags), searchText) < 0
      )
        return false;
      return true;
    });
    return filtered;
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
        editable={false}
      />
    );
  };

  render() {
    const { t, bookmarkedResources, allResources } = this.props;

    return (
      <MCRootView>
        <MCContent>
          <FlatList
            extraData={bookmarkedResources}
            contentContainerStyle={{alignItems: 'center'}}
            data={this.filterResource(allResources)}
            renderItem={this._renderListItem}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          />
        </MCContent>
      </MCRootView>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  bookmarkResource: resourceActions.bookmarkResource,
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookResourceScreen),
);
