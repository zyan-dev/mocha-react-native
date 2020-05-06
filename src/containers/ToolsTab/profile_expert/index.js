import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileExpertScreen from './Main';
import PersonalizeValueScreen from './Values';
import ValueStoryScreen from './ValueStory';
import BestSelfScreen from './Strength';
import MeaningLifeScreen from './MeaningLife';
import DiscoverCoreValuesScreen from '../profile_basic/DiscoverYourValues';

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
        <Stack.Screen name="PE_ValueStory" component={ValueStoryScreen} />
        <Stack.Screen name="PE_BestSelf" component={BestSelfScreen} />
        <Stack.Screen name="PE_MeaningLife" component={MeaningLifeScreen} />
        <Stack.Screen
          name="PE_CoreValues"
          component={DiscoverCoreValuesScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default ProfileBasicStack;
