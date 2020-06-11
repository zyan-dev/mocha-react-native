import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedTabStack from '../FeedTab';
import ToolsTabStack from '../ToolsTab';
import ProfileTabStack from '../ProfileTab';
import ResourceTabStack from '../ResourceTab';
import ProgressTabStack from '../ProgressTab';
import TabView from './TabView';

const Tab = createBottomTabNavigator();

class MainHomeStack extends React.Component {
  render() {
    return (
      <Tab.Navigator
        tabBar={props => <TabView {...props} />}
        initialRouteName="TabProgress"
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
