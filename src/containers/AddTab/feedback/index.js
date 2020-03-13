import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddFeedbackScreen from './add';
import SelectQuestionScreen from './SelectQuestions';

const Stack = createStackNavigator();

class AddFeedbackStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AddFeedback" component={AddFeedbackScreen} />
        <Stack.Screen name="SelectQuestion" component={SelectQuestionScreen} />
      </Stack.Navigator>
    );
  }
}

export default AddFeedbackStack;
