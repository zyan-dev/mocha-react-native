import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {MCHeader, MCIcon} from 'components/common';
import {postActions} from 'Redux/actions';
import ProgressChallengeTab from './Challenges';
import ProgressMembersTab from './Members';
import ProgressOwnTab from './MyProgress';
import ProgressSearchTab from './Search';
import NavigationService from 'navigation/NavigationService';

class ProgressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  onPressAddPost = () => {
    this.props.setInitialPost();
    NavigationService.navigate('AddPost');
  };

  render() {
    const {t, theme} = this.props;
    const {index} = this.state;
    const routes = [
      {
        key: 'challenge',
        title: 'mountain',
      },
      {
        key: 'trustmember',
        title: 'users',
      },
      {
        key: 'own',
        title: 'user',
      },
      {
        key: 'search',
        title: 'search',
      },
    ];
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
        renderLabel={({route, focused, color}) => {
          return (
            <MCIcon
              type="FontAwesome5Pro"
              name={route.title}
              color={focused ? theme.colors.outline : theme.colors.text}
            />
          );
        }}
      />
    );
    return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <MCHeader
          title={t('title_progress')}
          hasBack={false}
          hasRight
          rightIcon="plus"
          onPressRight={() => this.onPressAddPost()}
        />
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            challenge: ProgressChallengeTab,
            trustmember: ProgressMembersTab,
            own: ProgressOwnTab,
            search: ProgressSearchTab,
          })}
          onIndexChange={i => this.setState({index: i})}
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
const mapDispatchToProps = {
  setInitialPost: postActions.setInitialPost,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressScreen),
);