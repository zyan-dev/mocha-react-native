import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SendSMSScreen from './SendSMS';
import VerifySMSScreen from './VerifySMS';
import CompleteSignUp from './CompleteSignUp';
import OurValuesScreen from './OurValues';
import OurCommunityRuleScreen from './OurCommunityRules';
import WelcomeScreen from './Welcome';

const Stack = createStackNavigator();

class VerificationStack extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Auth_OurValues" headerMode="none">
        <Stack.Screen name="Auth_SendSMS" component={SendSMSScreen} />
        <Stack.Screen name="Auth_VerifySMS" component={VerifySMSScreen} />
        <Stack.Screen name="Auth_CompleteSignUp" component={CompleteSignUp} />
        <Stack.Screen name="Auth_OurValues" component={OurValuesScreen} />
        <Stack.Screen name="Auth_Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="Auth_OurCommunityRule"
          component={OurCommunityRuleScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default VerificationStack;
