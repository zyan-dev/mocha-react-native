import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileAdvanceScreen from './Main';
import CoachingFeedbackScreen from './CoachingFeedback';
import CriticismFeedbackScreen from './CriticismFeedback';
import PriaseFeedbackScreen from './PriaseFeedback';
import QualitiesCharacterScreen from './QualitiesCharacter';
import ChallengesConcernsScreen from './ChallengesConcerns';
import ApproachToConflictScreen from './ApproachToConflict';
import AttachmentPatternScreen from './AttachmentPattern';
import ComfortingScreen from './Comforting';
import StressRecoveryScreen from './StressRecovery';

const Stack = createStackNavigator();

class ProfileAdvancedStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ProfileAdvanced" component={ProfileAdvanceScreen} />
        <Stack.Screen name="PA_Coaching" component={CoachingFeedbackScreen} />
        <Stack.Screen name="PA_Criticism" component={CriticismFeedbackScreen} />
        <Stack.Screen name="PA_Praise" component={PriaseFeedbackScreen} />
        <Stack.Screen
          name="PA_Qualities_Character"
          component={QualitiesCharacterScreen}
        />
        <Stack.Screen
          name="PA_Challenges_Concerns"
          component={ChallengesConcernsScreen}
        />
        <Stack.Screen name="PA_Approach" component={ApproachToConflictScreen} />
        <Stack.Screen
          name="PA_Attachment"
          component={AttachmentPatternScreen}
        />
        <Stack.Screen name="PA_Comforting" component={ComfortingScreen} />
        <Stack.Screen
          name="PA_StressRecovery"
          component={StressRecoveryScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default ProfileAdvancedStack;
