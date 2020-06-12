import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as _ from 'lodash';
import FeedTabStack from '../FeedTab';
import ToolsTabStack from '../ToolsTab';
import ProfileTabStack from '../ProfileTab';
import ResourceTabStack from '../ResourceTab';
import ProgressTabStack from '../ProgressTab';
import TabView from './TabView';

const Tab = createBottomTabNavigator();
const screenKeys = [
  'TabFeed',
  'TabResource',
  'TabProgress',
  'TabTools',
  'TabProfile',
];

class MainHomeStack extends React.Component {
  render() {
    const initialIndex = _.get(this.props.route, ['params', 'index'], 2);
    return (
      <Tab.Navigator
        tabBar={props => <TabView {...props} initialIndex={initialIndex} />}
        initialRouteName={screenKeys[initialIndex]}
        backBehavior="none" // not handle back button
        headerMode="none">
        <Tab.Screen name="TabFeed" component={FeedTabStack} />
        <Tab.Screen name="TabResource" component={ResourceTabStack} />
        <Tab.Screen name="TabProgress" component={ProgressTabStack} />
        <Tab.Screen name="TabTools" component={ToolsTabStack} />
        <Tab.Screen name="TabProfile" component={ProfileTabStack} />
      </Tab.Navigator>
    );
  }
}

export default MainHomeStack;
