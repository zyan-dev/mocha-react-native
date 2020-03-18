import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddFeedbackScreen from './add';
import SelectQuestionScreen from './SelectQuestions';
import CompletedFeedbackScreen from './completed';

const Stack = createStackNavigator();

class FeedbackStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AddFeedback" component={AddFeedbackScreen} />
        <Stack.Screen name="SelectQuestion" component={SelectQuestionScreen} />
        <Stack.Screen
          name="CompletedFeedback"
          component={CompletedFeedbackScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default FeedbackStack;
