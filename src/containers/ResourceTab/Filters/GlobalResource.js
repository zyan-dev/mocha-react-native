import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

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
      searchResult: [],
    };
  }

  componentDidMount() {
    this.setState({searchResult: this.props.allResources});
  }

  componentDidUpdate(preProps, prevState) {
    if (preProps.allResources !== this.props.allResources) {
      this.setState({searchResult: this.props.allResources});
    }
  }

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  filterResource(searchText) {
    this.setState({searchText});
    const {allResources} = this.props;
    const searchResult = allResources.filter(v =>
      v.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    this.setState({searchResult});
  }

  render() {
    const {
      focused,
      sort,
      selectedMember,
      searchText,
      searchResult,
    } = this.state;
    const {t, theme} = this.props;
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
            from="global"
            selectedResources={searchResult}
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
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GlobalResourceScreen),
);
