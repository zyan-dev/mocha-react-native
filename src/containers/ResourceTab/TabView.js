import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import RBSheet from 'react-native-raw-bottom-sheet';

import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import FeaturedResourceScreen from './Filters/Featured';
import AllResourcesScreen from './Filters/AllResources';
import MyResourceScreen from './Filters/MyResource';
import SearchResourceScreen from './Filters/Search';
import {MCHeader, MCSearchInput, MCIcon} from 'components/common';
import {H4, H6, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {ResourcesRoots} from 'utils/constants';
import {dySize} from 'utils/responsive';

class ResourceTabView extends React.Component {
  onChangeTabIndex = i => {
    this.setState({index: i});
    this.props.onChangeTabIndex(i);
  };

  render() {
    const {t, theme, tabIndex, isShowingUserHabit} = this.props;

    const renderScene = SceneMap({
      globe: FeaturedResourceScreen,
      search: SearchResourceScreen,
      users: AllResourcesScreen,
      user: MyResourceScreen,
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
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceTabView),
);
