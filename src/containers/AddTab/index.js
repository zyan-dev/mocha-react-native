import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ReflectionScreen from './Home';
import UserManualScreen from './usermanual';
import ValueScreen from './value';
import FeedbackStack from './feedback';
import GoalScreen from './goal';
import EmotionScreen from './emotion';
import NeedScreen from './need';
import TapToCountScreen from './tab_to_count';
import EditUserManualScreen from './usermanual/edit';

const Stack = createStackNavigator();

class AddValueTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AddTabHome" component={ReflectionScreen} />
        <Stack.Screen name="UserManuals" component={UserManualScreen} />
        <Stack.Screen name="Values" component={ValueScreen} />
        <Stack.Screen name="Feedbacks" component={FeedbackStack} />
        <Stack.Screen name="Goals" component={GoalScreen} />
        <Stack.Screen name="Emotions" component={EmotionScreen} />
        <Stack.Screen name="Needs" component={NeedScreen} />
        <Stack.Screen name="TapToCounts" component={TapToCountScreen} />
        <Stack.Screen name="EditUserManual" component={EditUserManualScreen} />
      </Stack.Navigator>
    );
  }
}

export default AddValueTabStack;
