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

const books = [
  {
    _id: 123123123,
    title: 'Fooled by Randomness',
    author: 'Nassim Taleb',
    pages: 200,
    length: '5h 20',
    released: new Date(),
    impact: ['must read', 'strongly', 'impectful'],
    skills: ['react', 'react native', 'node', 'express'],
    url: '',
    description:
      'Humans are social creatures: In this simple and obvious fact lies both the problem and the solution to the current crisis of loneliness. In his groundbreaking book, the 19th surgeon general of the United States Dr. Vivek Murthy makes a case for loneliness as a public health concern: a root cause and contributor to',
  },
  {
    _id: 123123125,
    title: 'Thinking Fast and Slow',
    author: 'Nassim Taleb',
    pages: 200,
    length: '5h 20',
    released: new Date(),
    impact: ['must read', 'strongly', 'impectful'],
    skills: ['react', 'react native', 'node', 'express'],
    url: '',
    description:
      'Humans are social creatures: In this simple and obvious fact lies both the problem and the solution to the current crisis of loneliness. In his groundbreaking book, the 19th surgeon general of the United States Dr. Vivek Murthy makes a case for loneliness as a public health concern: a root cause and contributor to',
  },
  {
    _id: 123123126,
    title: 'The Power of Habit',
    author: 'Nassim Taleb',
    pages: 200,
    length: '5h 20',
    released: new Date(),
    impact: ['must read', 'strongly', 'impectful'],
    url: '',
    skills: [],
    description:
      'Humans are social creatures: In this simple and obvious fact lies both the problem and the solution to the current crisis of loneliness. In his groundbreaking book, the 19th surgeon general of the United States Dr. Vivek Murthy makes a case for loneliness as a public health concern: a root cause and contributor to',
  },
  {
    _id: 123123128,
    title: 'The Power of Habit',
    author: 'Nassim Taleb',
    pages: 200,
    length: '5h 20',
    released: new Date(),
    impact: ['must read', 'strongly', 'impectful'],
    skills: [],
    url: '',
    description:
      'Humans are social creatures: In this simple and obvious fact lies both the problem and the solution to the current crisis of loneliness. In his groundbreaking book, the 19th surgeon general of the United States Dr. Vivek Murthy makes a case for loneliness as a public health concern: a root cause and contributor to',
  },
];

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

    return (
      <MCRootView align="center">
        <FlatList
          extraData={bookmarkedResources}
          contentContainerStyle={{alignItems: 'center'}}
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
