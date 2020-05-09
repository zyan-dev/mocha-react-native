import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import BlogResourceScreen from './Filters/Blogs';
import BookResourceScreen from './Filters/Books';
import FeaturedResourceScreen from './Filters/Featured';
import PodcastResourceScreen from './Filters/Podcasts';
import SearchResourceScreen from './Filters/Search';
import {dySize} from 'utils/responsive';
import {MCHeader, MCSearchInput, MCIcon} from 'components/common';
import RBSheet from 'react-native-raw-bottom-sheet';
import {H4, H6, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {ResoucesRoots} from 'utils/constants';
class ResourceTabView extends React.Component {
  onChangeTabIndex = i => {
    this.setState({index: i});
    this.props.onChangeTabIndex(i);
  };

  render() {
    const {t, theme, tabIndex, isShowingUserHabit} = this.props;

    const renderScene = SceneMap({
      featured: FeaturedResourceScreen,
      search: SearchResourceScreen,
      books: BookResourceScreen,
      blogs: BlogResourceScreen,
      podcasts: PodcastResourceScreen,
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
        }}
        scrollEnabled
        tabStyle={{width: dySize(80)}}
        renderLabel={({route, focused, color}) => {
          return (
            <MCButton align="center">
              <MCIcon
                type="FontAwesome5Pro"
                name={route.icon}
                size={20}
                color={focused && theme.colors.outline}
              />
              <H5 color={focused ? theme.colors.outline : theme.colors.text}>
                {t(`resource_type_${route.title}`)}
              </H5>
            </MCButton>
          );
        }}
      />
    );

    return (
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index: tabIndex, routes: ResoucesRoots}}
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
