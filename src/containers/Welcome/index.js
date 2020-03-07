import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeToMocha from './WelcomeToMocha';
import WelcomePickTheme from './WelcomePickTheme';
import WelcomeReflectionPoint from './WelcomeReflectionPoint';
import WelcomeToTab from './WelcomeToTab';

const Stack = createStackNavigator();

class WelcomeStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="WelcomeToMocha" component={WelcomeToMocha} />
        <Stack.Screen name="WelcomePickTheme" component={WelcomePickTheme} />
        <Stack.Screen
          name="WelcomeReflectionPoint"
          component={WelcomeReflectionPoint}
        />
        <Stack.Screen name="WelcomeToTab" component={WelcomeToTab} />
      </Stack.Navigator>
    );
  }
}

export default WelcomeStack;
