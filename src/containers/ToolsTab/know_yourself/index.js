import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileBasicScreen from './ProfileBasics';
import PersonalStoryScreen from './PersonalStoryScreen';
import FeedbackPreferenceScreen from './FeedbackPreference';
import BehaviorPreferenceScreen from './BehaviorPreference';
import RiskToleranceScreen from './RiskTolerance';
import AttachmentPatternScreen from './AattachmentPattern';
import ApproachToConflictScreen from './ApproachToConflict';

const Stack = createStackNavigator();

class KnowYourSelfStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="KY_ProfileBasics" component={ProfileBasicScreen} />
        <Stack.Screen name="KY_PersonalStory" component={PersonalStoryScreen} />
        <Stack.Screen
          name="KY_FeedbackPreference"
          component={FeedbackPreferenceScreen}
        />
        <Stack.Screen
          name="KY_BehaviorPreference"
          component={BehaviorPreferenceScreen}
        />
        <Stack.Screen name="KY_RiskTolerance" component={RiskToleranceScreen} />
        <Stack.Screen
          name="KY_Attachment"
          component={AttachmentPatternScreen}
        />
        <Stack.Screen name="KY_Approach" component={ApproachToConflictScreen} />
      </Stack.Navigator>
    );
  }
}

export default KnowYourSelfStack;