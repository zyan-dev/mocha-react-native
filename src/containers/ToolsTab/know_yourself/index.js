import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileBasicScreen from './ProfileBasics';
import PersonalStoryScreen from './PersonalStoryScreen';
import FeedbackPreferenceScreen from './FeedbackPreference';
import BehaviorPreferenceScreen from './BehaviorPreference';
import RiskToleranceScreen from './RiskTolerance';
import AttachmentPatternScreen from './AattachmentPattern';
import ApproachToConflictScreen from './ApproachToConflict';
import DiscoverValueScreen from './DiscoverYourValues';
import BodyAwarenessScreen from './BodyAwareness';
import ChronotypeScreen from '../../ProfileTab/profile/details/chronotype';

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
        <Stack.Screen name="KY_DiscoverValue" component={DiscoverValueScreen} />
        <Stack.Screen name="KY_BodyAwareness" component={BodyAwarenessScreen} />
        <Stack.Screen name="KY_SleepChronotype" component={ChronotypeScreen} />
      </Stack.Navigator>
    );
  }
}

export default KnowYourSelfStack;
