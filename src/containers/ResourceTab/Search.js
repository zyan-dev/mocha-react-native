import React from 'react';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {MCContent, MCRootView, MCView} from 'components/styled/View';
import {MCHeader, MCSearchInput} from 'components/common';
import RBSheet from 'react-native-raw-bottom-sheet';
import {H4, MCIcon, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {ResourceTypes} from 'utils/constants';
import {getStringIndexOf} from 'services/operators';
import ResourceItem from './ResourceItem';

class ResourceSearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      viewAll: true,
      filterTypes: [],
    };
  }

  componentDidMount() {
    this.props.getAllResources();
  }

  onPressFilterOption = () => {
    this.RBSheet && this.RBSheet.open();
  };

  onPressFilterItem = (type) => {
    const {filterTypes, viewAll} = this.state;
    const index = filterTypes.indexOf(type.type);
    if (index > -1) {
      filterTypes.splice(index, 1);
    } else {
      filterTypes.push(type.type);
    }
    if (type.type === 'all') {
      this.setState({viewAll: true, filterTypes: []});
    } else {
      this.setState({viewAll: false, filterTypes});
    }
    this.forceUpdate();
  };

  filterResource = (resources) => {
    const {searchText, viewAll, filterTypes} = this.state;
    const filtered = resources.filter((resource) => {
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
        onPressBookmark={(id) => {
          this.props.bookmarkResource(id);
          this.forceUpdate();
        }}
        editable={false}
      />
    );
  };

  render() {
    const {searchText, filterTypes, viewAll} = this.state;
    const {
      t,
      theme,
      showDrawer,
      allResources,
      bookmarkedResources,
    } = this.props;
    return (
      <MCRootView>
        <MCHeader
          title={t('resources')}
          leftIconType="FontAwesome5"
          leftIcon="filter"
          onPressBack={() => this.onPressFilterOption()}
          hasRight
          rightIcon="md-menu"
          onPressRight={() => showDrawer(true)}
        />
        <MCSearchInput
          placeholder={t('resource_search_placeholder')}
          text={searchText}
          onChange={(searchText) => this.setState({searchText})}
        />
        <MCContent>
          <FlatList
            extraData={bookmarkedResources}
            contentContainerStyle={{alignItems: 'center'}}
            data={this.filterResource(allResources)}
            renderItem={this._renderListItem}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          />
        </MCContent>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={dySize(400)}
          duration={250}
          customStyles={{
            container: {
              backgroundColor: theme.colors.background,
            },
          }}>
          <MCView row wrap justify="center" align="center" mt={20}>
            {[{type: 'all', icon: 'globe'}]
              .concat(ResourceTypes)
              .map((type) => {
                let outlined = filterTypes.indexOf(type.type) > -1;
                if (viewAll) outlined = false;
                if (type.type === 'all') outlined = viewAll;
                return (
                  <MCButton
                    key={type.type}
                    onPress={() => this.onPressFilterItem(type)}
                    bordered
                    br={8}
                    mr={10}
                    ml={10}
                    mb={10}
                    width={100}
                    height={100}
                    style={{
                      borderColor: outlined
                        ? theme.colors.outline
                        : theme.colors.border,
                      borderWidth: outlined ? 3 : 1,
                    }}
                    justify="center"
                    align="center">
                    <MCIcon type="FontAwesome5" name={type.icon} size={30} />
                    <H4>{t(`resource_type_${type.type}`)}</H4>
                  </MCButton>
                );
              })}
          </MCView>
        </RBSheet>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  bookmarkResource: resourceActions.bookmarkResource,
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ResourceSearchScreen),
);
