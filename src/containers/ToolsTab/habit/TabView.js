import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import {H5} from 'components/styled/Text';
import WeeklyHabitScreen from './Weekly';
import AnalyzeHabitScreen from './Analyze';
import DailyHabitScreen from './Daily';
import SupportHabitScreen from './Support';
import {dySize} from 'utils/responsive';

class HabitTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.initialIndex || 0,
    };
  }

  onChangeTabIndex = i => {
    this.setState({index: i});
    switch (i) {
      case 2:
        this.props.getSupportedHabits();
        break;
      default:
    }
  };

  render() {
    const {t, theme, isShowingUserHabit} = this.props;
    const {index} = this.state;
    let routes = [
      {
        key: 'daily',
        title: t('habit_daily_tabTitle'),
      },
      {
        key: 'weekly',
        title: t('habit_weekly_tabTitle'),
      },
      {
        key: 'analyze',
        title: t('habit_analyze_tabTitle'),
      },
    ];
    if (!isShowingUserHabit) {
      routes.splice(2, 0, {
        key: 'support',
        title: t('habit_support_tabTitle'),
      });
    }
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
        }}
        scrollEnabled
        tabStyle={{width: isShowingUserHabit ? dySize(125) : dySize(100)}}
        renderLabel={({route, focused, color}) => {
          return (
            <H5
              align="center"
              color={focused ? theme.colors.text : theme.colors.border}>
              {route.title}
            </H5>
          );
        }}
      />
    );
    return (
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            daily: DailyHabitScreen,
            weekly: WeeklyHabitScreen,
            analyze: AnalyzeHabitScreen,
            support: SupportHabitScreen,
          })}
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
  isShowingUserHabit: state.otherReducer.isShowingUserHabit,
});

const mapDispatchToProps = {
  getSupportedHabits: reflectionActions.getSupportedHabits,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HabitTabView),
);
