import React from 'react';
import {View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from '../../navigation/NavigationService';
import ResourceTabView from './TabView';
import {ResoucesRoots} from 'utils/constants';
class ResourceSearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      viewAll: true,
      filterTypes: [],
      tabIndex: 2,
    };
  }

  onPressFilterOption = () => {
    this.RBSheet && this.RBSheet.open();
  };

  onPressFilterItem = type => {
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

  onPressRight = () => {
    NavigationService.navigate('AddResource', {
      root: ResoucesRoots[this.state.tabIndex],
    });
  };

  render() {
    const {tabIndex} = this.state;
    const {t, profile} = this.props;

    if (!profile.userToken.length) {
      return (
        <MCRootView>
          <H4 mb={10}>{t('sign_up_required')}</H4>
          <MCButton
            bordered
            onPress={() => NavigationService.navigate('TabFeed')}>
            <H4>{t('sign_up_button')}</H4>
          </MCButton>
        </MCRootView>
      );
    }
    return (
      <View style={{flex: 1}}>
        <MCHeader
          title={t('resources')}
          onPressBack={() => this.onPressFilterOption()}
          hasRight
          rightIcon="bars"
          onPressRight={() => this.onPressRight()}
          hasBack={false}
          headerIcon={
            <MCView ml={10}>
              <MCIcon type="FontAwesome5" name="book-reader" size={30} />
            </MCView>
          }
        />
        <ResourceTabView
          tabIndex={tabIndex}
          onChangeTabIndex={i => this.setState({tabIndex: i})}
        />
      </View>
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
  showDrawer: routerActions.setProfileDrawerOpened,
  bookmarkResource: resourceActions.bookmarkResource,
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceSearchScreen),
);
