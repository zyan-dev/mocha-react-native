import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import RBSheet from 'react-native-raw-bottom-sheet';

import {resourceActions} from 'Redux/actions';
import GlobalResourceScreen from './Filters/GlobalResource';
import SocialResourcesScreen from './Filters/SocialResources';
import MyResourceScreen from './Filters/MyResource';
import BookmarkResourcesScreen from './Filters/BookmarkResource';
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
      getMyResources,
      getBookmarkedResources,
      getTrustMemberResources,
      resourceAllPageIndex,
      resourceMyPageIndex,
      resourceBookmarkPageIndex,
      resourceTrustMemberPageIndex,
    } = this.props;

    switch (index) {
      case 0:
        if (resourceAllPageIndex == 1) getAllResources(resourceAllPageIndex);
        else getAllResources(resourceAllPageIndex + 1);
        break;
      case 1:
        if (resourceTrustMemberPageIndex == 1)
          getTrustMemberResources(resourceTrustMemberPageIndex);
        else getTrustMemberResources(resourceTrustMemberPageIndex + 1);
        break;
      case 2:
        if (resourceMyPageIndex == 1) getMyResources(resourceMyPageIndex);
        else getMyResources(resourceMyPageIndex + 1);
        break;
      case 3:
        if (resourceBookmarkPageIndex == 1)
          getBookmarkedResources(resourceBookmarkPageIndex);
        else getBookmarkedResources(resourceBookmarkPageIndex + 1);
        break;
    }
  };

  render() {
    const {t, theme, tabIndex} = this.props;

    const renderScene = SceneMap({
      globe: GlobalResourceScreen,
      bookmark: BookmarkResourcesScreen,
      social: SocialResourcesScreen,
      me: MyResourceScreen,
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
  resourceAllPageIndex: state.resourceReducer.resourceAllPageIndex,
  resourceTrustMemberPageIndex:
    state.resourceReducer.resourceTrustMemberPageIndex,
  resourceMyPageIndex: state.resourceReducer.resourceMyPageIndex,
  resourceBookmarkPageIndex: state.resourceReducer.resourceBookmarkPageIndex,
  resourceSearchResourceIndex:
    state.resourceReducer.resourceSearchResourceIndex,
});

const mapDispatchToProps = {
  getAllResources: resourceActions.getAllResources,
  getMyResources: resourceActions.getMyResources,
  getBookmarkedResources: resourceActions.getBookmarkedResources,
  getTrustMemberResources: resourceActions.getTrustMemberResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceTabView),
);
