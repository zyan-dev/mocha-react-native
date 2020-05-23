import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';

import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCImage, MCIcon, MCSearchInput} from 'components/common';
import {ResourceContentRoots} from 'utils/constants';
import BookResourceScreen from '../Books/Books';
import {dySize} from 'utils/responsive';

class GlobalResourceScreen extends React.PureComponent {
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
    const {
      getAllResources,
      setALLResourcePageIndex,
      setSearchResourcePageIndex,
    } = this.props;
    setSearchResourcePageIndex(1);
    setALLResourcePageIndex(1);
  }

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  filterResource(searchText) {
    this.setState({searchText});
    if (searchText) {
      this.searchBooks();
    }
  }

  searchBooks = _.debounce(() => {
    const {searchText} = this.state;
    const {searchResources, resourceSearchResourceIndex} = this.props;
    searchResources({
      title: searchText,
      type: 'books',
      pageIndex: resourceSearchResourceIndex,
    });
  }, 2000);

  render() {
    const {focused, sort, selectedMember, searchText} = this.state;
    const {t, theme, searchedResources, allResources} = this.props;
    let resources = allResources,
      from = 'global';
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
  allResources: state.resourceReducer.allResources,
  resourceAllPageIndex: state.resourceReducer.resourceAllPageIndex,
  profile: state.profileReducer,
  searchedResources: state.resourceReducer.searchedResources,
  resourceSearchResourceIndex:
    state.resourceReducer.resourceSearchResourceIndex,
});

const mapDispatchToProps = {
  getAllResources: resourceActions.getAllResources,
  setALLResourcePageIndex: resourceActions.setALLResourcePageIndex,
  searchResources: resourceActions.searchResources,
  setSearchResourcePageIndex: resourceActions.setSearchResourcePageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GlobalResourceScreen),
);
