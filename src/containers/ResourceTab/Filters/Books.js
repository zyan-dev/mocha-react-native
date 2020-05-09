import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import {getStringIndexOf} from 'services/operators';
import {MCEmptyText} from 'components/styled/Text';
import {MCRootView} from 'components/styled/View';
import BookItem from '../Books/BookItem';
import {dySize} from 'utils/responsive';

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

  _renderListItem = ({item}) => {
    const {bookmarkedResources} = this.props;

    const bookmarked = bookmarkedResources.indexOf(item._id) > -1;
    return (
      <BookItem
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
    const {t, bookmarkedResources, allResources} = this.props;
    let books = [];
    allResources.forEach(resource => {
      if (resource.type == 'books' && resource.data) {
        books.push(resource);
      }
    });

    return (
      <MCRootView align="center">
        <FlatList
          extraData={bookmarkedResources}
          // contentContainerStyle={{alignItems: 'center'}}
          data={books}
          renderItem={this._renderListItem}
          keyExtractor={item => item._id}
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          numColumns={2}
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
