import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import RBSheet from 'react-native-raw-bottom-sheet';

import {resourceActions} from 'Redux/actions';
import SocialResourcesScreen from './Filters/SocialResources';
import BookmarkResourcesScreen from './Filters/BookmarkResource';
import RecommendedResourcesScreen from './Filters/RecommendedResource';
import {MCIcon} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {ResourcesRoots} from 'utils/constants';

class ResourceTabView extends React.Component {
  onChangeTabIndex = i => {
    const {userToken} = this.props;
    this.setState({index: i});
    this.props.onChangeTabIndex(i);
    if (userToken) this.getResources(i);
  };

  getResources = index => {
    const {
      getAllResources,
      getBookmarkedResources,
      getSelectedMemberResources,
      getRecommendedOwners,
      networksWithResourcePermission,
      resetMemberResources,
      setMemberResourcePageIndex,
      profile,
      selectedMemberId,
      resourceMemberLimited,
    } = this.props;

    switch (index) {
      case 0:
        // getAllResources(1);
        getRecommendedOwners(1);
        break;
      case 1:
        if (resourceMemberLimited) return;
        setMemberResourcePageIndex(1);
        profile &&
          getSelectedMemberResources({
            member: selectedMemberId ? selectedMemberId : profile._id,
            pageIndex: 1,
          });
        break;
      case 2:
        getBookmarkedResources(1);
        break;
    }
  };

  render() {
    const {t, theme, tabIndex} = this.props;

    const renderScene = SceneMap({
      recommend: RecommendedResourcesScreen,
      bookmark: BookmarkResourcesScreen,
      social: SocialResourcesScreen,
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
        }}
        renderLabel={({route, focused, color}) => {
          return (
            <MCButton align="center">
              <MCIcon
                type="FontAwesome5Pro"
                name={route.icon}
                size={20}
                color={focused && theme.colors.outline}
              />
            </MCButton>
          );
        }}
      />
    );

    return (
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index: tabIndex, routes: ResourcesRoots}}
          renderScene={renderScene}
          onIndexChange={i => this.onChangeTabIndex(i)}
          initialLayout={Dimensions.get('window')}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  userToken: state.profileReducer.userToken,
  networksWithResourcePermission:
    state.networkReducer.networksWithResourcePermission,
  profile: state.profileReducer,
  selectedMemberId: state.resourceReducer.selectedMemberId,
  resourceMemberLimited: state.resourceReducer.resourceMemberLimited,
});

const mapDispatchToProps = {
  getAllResources: resourceActions.getAllResources,
  getBookmarkedResources: resourceActions.getBookmarkedResources,
  getSelectedMemberResources: resourceActions.getSelectedMemberResources,
  resetMemberResources: resourceActions.resetMemberResources,
  setMemberResourcePageIndex: resourceActions.setMemberResourcePageIndex,
  getRecommendedOwners: resourceActions.getRecommendedOwners,
  setRecommendedOwnersPageIndex: resourceActions.setRecommendedOwnersPageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceTabView),
);
