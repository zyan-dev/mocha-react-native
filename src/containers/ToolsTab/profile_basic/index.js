import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileBasicScreen from './Main';
import PersonalStoryScreen from './PersonalStoryScreen';
import FeedbackPreferenceScreen from './FeedbackPreference';
import BehaviorPreferenceScreen from './BehaviorPreference';
import RiskToleranceScreen from './RiskTolerance';
import AttachmentPatternScreen from './AattachmentPattern';
import ApproachToConflictScreen from './ApproachToConflict';
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
        <Stack.Screen
          name="PA_FeedbackPreference"
          component={FeedbackPreferenceScreen}
        />
        <Stack.Screen
          name="PA_BehaviorPreference"
          component={BehaviorPreferenceScreen}
        />
        <Stack.Screen name="PA_RiskTolerance" component={RiskToleranceScreen} />
        <Stack.Screen
          name="PA_Attachment"
          component={AttachmentPatternScreen}
        />
        <Stack.Screen name="PA_Approach" component={ApproachToConflictScreen} />
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
