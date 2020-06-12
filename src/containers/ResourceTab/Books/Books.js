import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import {resourceActions} from 'Redux/actions';
import {MCEmptyText} from 'components/styled/Text';
import {MCRootView, NativeCard} from 'components/styled/View';
import BookItem from './BookItem';
import {dySize} from 'utils/responsive';
import {MCView} from '../../../components/styled/View';
import {impacts} from '../../../utils/constants';

class BookResourceScreen extends React.PureComponent {
  sortBook = (books, flag) => {
    let direction = 'asc';
    if (!flag) {
      direction = 'desc';
    }

    return _.orderBy(books, ['data.score'], [direction]);
  };

  _renderListItem = ({item}) => {
    const {from} = this.props;

    return (
      <MCView align="center">
        <NativeCard width={320} mt={10} mb={10} ml={10} mr={10}>
          <BookItem
            resource={item}
            onPressBookmark={data => {
              this.props.toggleBookmarkedResource(data);
              this.forceUpdate();
            }}
            editable={false}
            from={from}
          />
        </NativeCard>
      </MCView>
    );
  };

  getNextPage = () => {
    const {
      from,
      pageSearching,
      getSelectedMemberResources,
      getBookmarkedResources,
      resourceBookmarkPageIndex,
      resourceBookmarkLimited,
      resourceMemberPageIndex,
      resourceMemberLimited,
      resourceSearchResourceIndex,
      resourceSearchResourceLimited,
      searchText,
      selectedMember,
    } = this.props;

    if (from == 'search') {
      if (resourceSearchResourceLimited || pageSearching) return;
      searchResources({
        title: searchText,
        type: 'books',
        pageIndex: resourceSearchResourceIndex + 1,
      });
    } else if (from === 'bookmark') {
      if (resourceBookmarkLimited || pageSearching) return;
      getBookmarkedResources(resourceBookmarkPageIndex + 1);
    } else if (from === 'recommended') {
      return;
      // if (resourceRcommendResourceLimited || pageSearching) return;
      // getRecommendedResources(resourceRecommendResourceIndex + 1);
    } else {
      if (resourceMemberLimited || pageSearching) return;
      getSelectedMemberResources({
        pageIndex: resourceMemberPageIndex + 1,
        member: selectedMember._id,
      });
    }
  };

  render() {
    const {
      t,
      selectedMember,
      sort,
      from,
      selectedResources,
      pageSearching,
      resourceBookmarkLimited,
      resourceSearchResourceLimited,
      resourceMemberLimited,
      resourceRcommendResourceLimited,
    } = this.props;
    let books = [],
      pageLimited = false;

    if (from === 'search') {
      selectedResources.forEach(resource => {
        books.push(resource.data[0]);
      });
      pageLimited = resourceSearchResourceLimited;
    } else if (from === 'bookmark') {
      selectedResources.forEach(resource => {
        books.push(resource.data[0]);
      });
      pageLimited = resourceBookmarkLimited;
    } else if (from === 'recommended') {
      books = this.sortBook(selectedResources, sort);
      pageLimited = resourceRcommendResourceLimited;
    } else {
      books = this.sortBook(selectedResources, sort);
      pageLimited = resourceMemberLimited;
    }

    return (
      <MCRootView align="center">
        <FlatList
          data={books}
          renderItem={this._renderListItem}
          keyExtractor={item => item._id}
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={
            <MCEmptyText>
              {pageSearching ? t('progress_loading') : t('no_result')}
            </MCEmptyText>
          }
          numColumns={1}
          style={{width: dySize(350)}}
          ListFooterComponent={
            pageLimited &&
            books.length && (
              <MCEmptyText weight="italic">{t('no_more_result')}</MCEmptyText>
            )
          }
          keyExtractor={item => item._id}
          onEndReached={() => this.getNextPage()}
          onEndReachedThreshold={0.5}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  allResources: state.resourceReducer.allResources,
  profile: state.profileReducer,
  resourceAllPageIndex: state.resourceReducer.resourceAllPageIndex,
  resourceMemberPageIndex: state.resourceReducer.resourceMemberPageIndex,
  resourceBookmarkPageIndex: state.resourceReducer.resourceBookmarkPageIndex,
  resourceSearchResourceIndex:
    state.resourceReducer.resourceSearchResourceIndex,
  pageSearching: state.resourceReducer.pageSearching,
  resourceAllPageLimited: state.resourceReducer.resourceAllPageLimited,
  resourceMemberLimited: state.resourceReducer.resourceMemberLimited,
  resourceBookmarkLimited: state.resourceReducer.resourceBookmarkLimited,
  resourceSearchResourceLimited:
    state.resourceReducer.resourceSearchResourceLimited,
  resourceRcommendResourceLimited:
    state.resourceReducer.resourceRcommendResourceLimited,
});

const mapDispatchToProps = {
  toggleBookmarkedResource: resourceActions.toggleBookmarkedResource,
  getAllResources: resourceActions.getAllResources,
  getBookmarkedResources: resourceActions.getBookmarkedResources,
  getSelectedMemberResources: resourceActions.getSelectedMemberResources,
  searchResources: resourceActions.searchResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookResourceScreen),
);
