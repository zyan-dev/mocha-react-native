import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeToMocha from './WelcomeToMocha';
import WelcomeOnboardScreen from './onboarding';

const Stack = createStackNavigator();

class WelcomeStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="WelcomeToMocha" component={WelcomeToMocha} />
        <Stack.Screen name="WelcomeOnboard" component={WelcomeOnboardScreen} />
      </Stack.Navigator>
    );
  }
}

export default WelcomeStack;
