import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import {H5} from 'components/styled/Text';
import WeeklyObjectiveScreen from './Weekly';
import AnalyzeObjectiveScreen from './Analyze';
import DailyObjectiveScreen from './Daily';
import SupportObjectiveScreen from './Support';
import {dySize} from 'utils/responsive';

class ObjectiveTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.initialIndex || 0,
    };
  }

  onChangeTabIndex = (i) => {
    this.setState({index: i});
    switch (i) {
      case 3:
        this.props.getSupportedObjectives();
        break;
      default:
    }
  };

  render() {
    const {t, theme, isShowingUserObjective} = this.props;
    const {index} = this.state;
    const routes = [
      {
        key: 'daily',
        title: t('objective_daily_tabTitle'),
      },
      {
        key: 'weekly',
        title: t('objective_weekly_tabTitle'),
      },
      {
        key: 'analyze',
        title: t('objective_analyze_tabTitle'),
      },
    ];
    if (!isShowingUserObjective) {
      routes.push({
        key: 'accountability',
        title: t('objective_accountability_tabTitle'),
      });
    }
    const renderTabBar = (props) => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
        }}
        scrollEnabled
        tabStyle={{width: isShowingUserObjective ? dySize(125) : dySize(100)}}
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
            daily: DailyObjectiveScreen,
            weekly: WeeklyObjectiveScreen,
            analyze: AnalyzeObjectiveScreen,
            accountability: SupportObjectiveScreen,
          })}
          onIndexChange={(i) => this.onChangeTabIndex(i)}
          initialLayout={Dimensions.get('window')}
          renderTabBar={renderTabBar}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
  isShowingUserObjective: state.otherReducer.isShowingUserObjective,
});

const mapDispatchToProps = {
  getSupportedObjectives: reflectionActions.getSupportedObjectives,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ObjectiveTabView),
);
