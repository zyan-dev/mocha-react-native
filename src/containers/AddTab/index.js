import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddReflectionScreen from './Home';
import AddUserManualScreen from './usermanual';
import AddValueScreen from './value';
import AddFeedbackScreen from './feedback';
import AddGoalScreen from './goal';
import AddEmotionScreen from './emotion';
import AddNeedScreen from './need';
import AddTapToCountScreen from './tab_to_count';

const Stack = createStackNavigator();

class AddValueTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AddTabHome" component={AddReflectionScreen} />
        <Stack.Screen name="AddUserManual" component={AddUserManualScreen} />
        <Stack.Screen name="AddValue" component={AddValueScreen} />
        <Stack.Screen name="AddFeedback" component={AddFeedbackScreen} />
        <Stack.Screen name="AddGoal" component={AddGoalScreen} />
        <Stack.Screen name="AddEmotion" component={AddEmotionScreen} />
        <Stack.Screen name="AddNeed" component={AddNeedScreen} />
        <Stack.Screen name="AddTapToCount" component={AddTapToCountScreen} />
      </Stack.Navigator>
    );
  }
}

export default AddValueTabStack;
