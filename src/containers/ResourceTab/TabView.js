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

class ResourceTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.initialIndex || 0,
    };
  }

  onChangeTabIndex = i => {
    this.setState({index: i});
  };

  render() {
    const {t, theme, isShowingUserObjective} = this.props;
    const {index} = this.state;
    const routes = [
      {
        key: 'featured',
        title: 'featured',
        icon: 'book'
      },
      {
        key: 'search',
        title: 'search',
        icon: 'search'
      },
      {
        key: 'books',
        title: 'book',
        icon: 'book'
      },
      {
        key: 'blogs',
        title: 'blog',
        icon: 'blog'
      },
      {
        key: 'podcasts',
        title: 'podcast',
        icon: 'book'
      }
    ];

    const renderScene = SceneMap({
      featured: FeaturedResourceScreen,
      search: SearchResourceScreen,
      books: BookResourceScreen,
      blogs: BlogResourceScreen,
      podcasts: PodcastResourceScreen
    })

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
            <MCButton align='center'>
              <MCIcon
                type="FontAwesome5"
                name={route.icon}
                size={20}
                color={focused &&  theme.colors.outline}/>
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
          navigationState={{index, routes}}
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
  theme: state.routerReducer.theme
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceTabView),
);
