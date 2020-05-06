import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileExpertScreen from './Main';
import PersonalizeValueScreen from './Values';

const Stack = createStackNavigator();

class ProfileBasicStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ProfileExpert" component={ProfileExpertScreen} />
        <Stack.Screen
          name="PE_Personalize_CoreValue"
          component={PersonalizeValueScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default ProfileBasicStack;
