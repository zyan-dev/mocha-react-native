import React from 'react';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';

import {MCIcon, MCSearchInput} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3} from 'components/styled/Text';
import BookResourceScreen from '../Books/Books';
import {ResourceContentRoots} from 'utils/constants';

class BookmarkResourcesScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: ResourceContentRoots[0].key,
      selectedMember: {},
      sort: true,
      searchText: '',
    };
  }

  componentDidMount() {
    this.props.setBookmarkedResourcePageIndex(1);
  }

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  filterResource(searchText) {
    this.setState({searchText});
    this.props.setSearchResourcePageIndex(1);
    if (searchText) {
      this.searchBooks();
    }
  }

  searchBooks = _.debounce(() => {
    const {searchText} = this.state;
    const {searchResources} = this.props;
    searchResources({
      title: searchText,
      type: 'books',
      pageIndex: 1,
    });
  }, 1000);

  render() {
    const {selectedMember, sort, searchText, focused} = this.state;
    const {t, bookmarkedResources, theme, searchedResources} = this.props;
    let resources = bookmarkedResources,
      from = 'bookmark';
    if (searchText) {
      resources = searchedResources;
      from = 'search';
    }

    return (
      <MCRootView>
        <MCSearchInput
          placeholder={t('resource_search_placeholder')}
          text={searchText}
          onChange={searchText => this.filterResource(searchText)}
        />
        <MCView row>
          {ResourceContentRoots.map(item => (
            <MCButton onPress={() => this.onPressItem(item)}>
              <MCIcon
                type="FontAwesome5Pro"
                name={item.icon}
                size={20}
                color={focused == item.key && theme.colors.outline}
              />
            </MCButton>
          ))}
        </MCView>
        {focused == 'books' ? (
          <BookResourceScreen
            selectedMember={selectedMember}
            sort={sort}
            from={from}
            selectedResources={resources}
          />
        ) : (
          <MCContent>
            <MCView align="center">
              <H3>Coming Soon</H3>
            </MCView>
          </MCContent>
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  resourceBookmarkPageIndex: state.resourceReducer.resourceBookmarkPageIndex,
  profile: state.profileReducer,
  searchedResources: state.resourceReducer.searchedResources,
  resourceSearchResourceIndex:
    state.resourceReducer.resourceSearchResourceIndex,
});

const mapDispatchToProps = {
  getBookmarkedResources: resourceActions.getBookmarkedResources,
  setBookmarkedResourcePageIndex:
    resourceActions.setBookmarkedResourcePageIndex,
  searchResources: resourceActions.searchResources,
  resetSearchResources: resourceActions.resetSearchResources,
  setSearchResourcePageIndex: resourceActions.setSearchResourcePageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookmarkResourcesScreen),
);
