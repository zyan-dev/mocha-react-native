import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileBasicScreen from './ProfileBasics';
import PersonalStoryScreen from './PersonalStoryScreen';
import FeedbackPreferenceScreen from './FeedbackPreference';

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
      </Stack.Navigator>
    );
  }
}

export default KnowYourSelfStack;
