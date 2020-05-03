import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileBasicScreen from './Main';
import PersonalStoryScreen from './PersonalStoryScreen';
import RiskToleranceScreen from './RiskTolerance';
import DiscoverValueScreen from './DiscoverYourValues';
import StressResponseScreen from './StressResponse';
import SetHabitScreen from './SetHabit';
import NutritionScreen from './Nutrition';
import HydrationScreen from './Hydration';
import StrengthScreen from './Strength';
import DreamScreen from './Dream';
import ChronotypeScreen from '../../ProfileTab/profile/details/chronotype';

const Stack = createStackNavigator();

class ProfileBasicStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ProfileBasics" component={ProfileBasicScreen} />
        <Stack.Screen name="PA_PersonalStory" component={PersonalStoryScreen} />
        <Stack.Screen name="PA_RiskTolerance" component={RiskToleranceScreen} />
        <Stack.Screen name="PB_DiscoverValue" component={DiscoverValueScreen} />
        <Stack.Screen
          name="PB_StressResponse"
          component={StressResponseScreen}
        />
        <Stack.Screen name="PB_SleepChronotype" component={ChronotypeScreen} />
        <Stack.Screen name="PB_SetHabit" component={SetHabitScreen} />
        <Stack.Screen name="PB_Nutrition" component={NutritionScreen} />
        <Stack.Screen name="PB_Hydration" component={HydrationScreen} />
        <Stack.Screen name="PB_Strengths" component={StrengthScreen} />
        <Stack.Screen name="PB_Dream" component={DreamScreen} />
      </Stack.Navigator>
    );
  }
}

export default ProfileBasicStack;
