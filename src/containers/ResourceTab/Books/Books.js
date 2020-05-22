import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import {resourceActions} from 'Redux/actions';
import {getStringIndexOf} from 'services/operators';
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

    return _.orderBy(books, ['data.impacts'], [direction]);
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
      getAllResources,
      getMyResources,
      getTrustMemberResources,
      getBookmarkedResources,
      resourceAllPageIndex,
      resourceAllPageLimited,
      resourceMyPageIndex,
      resourceMyPageLimited,
      resourceBookmarkPageIndex,
      resourceBookmarkLimited,
      resourceTrustMemberPageIndex,
      resourceTrustMemberLimited,
      resourceSearchResourceIndex,
      resourceSearchResourceLimited,
      searchText,
    } = this.props;

    if (from == 'global') {
      if (resourceAllPageLimited || pageSearching) return;
      getAllResources(resourceAllPageIndex + 1);
    } else if (from == 'search') {
      if (resourceSearchResourceLimited || pageSearching) return;
      searchResources({
        title: searchText,
        type: 'books',
        pageIndex: resourceSearchResourceIndex + 1,
      });
    } else if (from === 'my-resource') {
      if (resourceMyPageLimited || pageSearching) return;
      getMyResources(resourceMyPageIndex + 1);
    } else if (from === 'bookmark') {
      if (resourceBookmarkLimited || pageSearching) return;
      getBookmarkedResources(resourceBookmarkPageIndex + 1);
    } else {
      if (resourceTrustMemberLimited || pageSearching) return;
      getTrustMemberResources(resourceTrustMemberPageIndex + 1);
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
      resourceAllPageLimited,
      resourceMyPageLimited,
      resourceBookmarkLimited,
      resourceSearchResourceLimited,
      resourceTrustMemberLimited,
    } = this.props;
    let books = [],
      pageLimited = false;

    if (from === 'global') {
      selectedResources.forEach(resource => {
        books.push(resource.data[0]);
      });
      pageLimited = resourceAllPageLimited;
    } else if (from === 'search') {
      selectedResources.forEach(resource => {
        books.push(resource.data[0]);
      });
      pageLimited = resourceSearchResourceLimited;
    } else if (from === 'bookmark') {
      selectedResources.forEach(resource => {
        books.push(resource.data[0]);
      });
      pageLimited = resourceBookmarkLimited;
    } else if (from === 'my-resource') {
      books = this.sortBook(selectedResources, sort);
      pageLimited = resourceMyPageLimited;
    } else {
      selectedResources.forEach(resource => {
        if (
          resource.type == 'books' &&
          selectedMember._id == resource.trustMember._id
        ) {
          books.push(resource);
        }
      });
      books = this.sortBook(books, sort);
      pageLimited = resourceTrustMemberLimited;
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
  resourceTrustMemberPageIndex:
    state.resourceReducer.resourceTrustMemberPageIndex,
  resourceMyPageIndex: state.resourceReducer.resourceMyPageIndex,
  resourceBookmarkPageIndex: state.resourceReducer.resourceBookmarkPageIndex,
  resourceSearchResourceIndex:
    state.resourceReducer.resourceSearchResourceIndex,
  pageSearching: state.resourceReducer.pageSearching,
  resourceAllPageLimited: state.resourceReducer.resourceAllPageLimited,
  resourceTrustMemberLimited: state.resourceReducer.resourceTrustMemberLimited,
  resourceMyPageLimited: state.resourceReducer.resourceMyPageLimited,
  resourceBookmarkLimited: state.resourceReducer.resourceBookmarkLimited,
  resourceSearchResourceLimited:
    state.resourceReducer.resourceSearchResourceLimited,
});

const mapDispatchToProps = {
  toggleBookmarkedResource: resourceActions.toggleBookmarkedResource,
  getAllResources: resourceActions.getAllResources,
  getMyResources: resourceActions.getMyResources,
  getBookmarkedResources: resourceActions.getBookmarkedResources,
  getTrustMemberResources: resourceActions.getTrustMemberResources,
  searchResources: resourceActions.searchResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookResourceScreen),
);
