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
      getMyResources,
      getBookmarkedResources,
      getTrustMemberResources,
      getRecommendedResources,
      myResources,
    } = this.props;

    switch (index) {
      case 0:
        // getAllResources(1);
        getRecommendedResources(1);
        break;
      case 1:
        getTrustMemberResources(1);
        break;
      case 2:
        if (myResources.length == 0) getMyResources(1);
        break;
      case 3:
        getBookmarkedResources(1);
        break;
    }
  };

  render() {
    const {t, theme, tabIndex} = this.props;

    const renderScene = SceneMap({
      // globe: GlobalResourceScreen,
      recommend: RecommendedResourcesScreen,
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
  myResources: state.resourceReducer.myResources,
});

const mapDispatchToProps = {
  getAllResources: resourceActions.getAllResources,
  getMyResources: resourceActions.getMyResources,
  getBookmarkedResources: resourceActions.getBookmarkedResources,
  getTrustMemberResources: resourceActions.getTrustMemberResources,
  getRecommendedResources: resourceActions.getRecommendedResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceTabView),
);
