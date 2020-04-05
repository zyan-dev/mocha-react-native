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

class ObjectiveTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  render() {
    const {t, theme} = this.props;
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
    const renderTabBar = (props) => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
          borderColor: 'red',
        }}
        renderLabel={({route, focused, color}) => {
          return (
            <H5 color={focused ? theme.colors.text : theme.colors.border}>
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
          })}
          onIndexChange={(i) => this.setState({index: i})}
          initialLayout={Dimensions.get('window')}
          renderTabBar={renderTabBar}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(mapStateToProps, undefined)(ObjectiveTabView),
);
