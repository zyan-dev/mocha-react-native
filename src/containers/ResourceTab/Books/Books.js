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
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      viewAll: true,
      filterTypes: [],
    };
  }

  sortBook = (books, flag) => {
    let direction = 'asc';
    if (!flag) {
      direction = 'desc';
    }

    return _.orderBy(books, ['data.impacts'], [direction]);
  };

  _renderListItem = ({item}) => {
    const {bookmarkedResources, from} = this.props;

    const bookmarked = bookmarkedResources.indexOf(item._id) > -1;
    return (
      <MCView align="center">
        <NativeCard width={320} mt={10} mb={10} ml={10} mr={10}>
          <BookItem
            resource={item}
            bookmarked={bookmarked}
            onPressBookmark={id => {
              this.props.bookmarkResource(id);
              this.forceUpdate();
            }}
            editable={false}
            from={from}
          />
        </NativeCard>
      </MCView>
    );
  };

  render() {
    const {
      t,
      bookmarkedResources,
      allResources,
      selectedMember,
      sort,
      from,
      searchResult,
    } = this.props;
    let books = [];

    if (from === 'global') {
      searchResult.forEach(resource => {
        books.push(resource.data[0]);
      });
    } else {
      allResources.forEach(resource => {
        resource.data.map(item => {
          if (item.type == 'books' && item.data) {
            if (selectedMember._id == item.ownerId) {
              books.push(item);
            } else if (_.isEmpty(selectedMember)) {
              books.push(item);
            }
          }
        });
      });
      books = this.sortBook(books, sort);
    }

    return (
      <MCRootView align="center">
        <FlatList
          extraData={bookmarkedResources}
          data={books}
          renderItem={this._renderListItem}
          keyExtractor={item => item._id}
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          numColumns={1}
          style={{width: dySize(350)}}
        />
      </MCRootView>
    );
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
