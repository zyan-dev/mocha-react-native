import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ReflectionScreen from './Home';
import UserManualScreen from './usermanual';
import EditUserManualScreen from './usermanual/edit';
import FeedbackStack from './feedback';
import HabitScreen from './habit';
import EditHabitScreen from './habit/Add';
import EmotionScreen from './emotion';
import NeedScreen from './need';
import EditNeedScreen from './need/edit';
import TapToCountScreen from './tab_to_count';
import EditEmotionScreen from './emotion/EditEmotion';
import EmotionPickerScreen from './emotion/EmotionPicker';
import ProfileBasicStack from './profile_basic';
import ProfileAdvanceStack from './profile_advanced';
import ProfileExpertStack from './profile_expert';
import EditPersonalityScreen from '../ProfileTab/profile/details/personality';

const Stack = createStackNavigator();

class ToolsTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ToolsTabHome" component={ReflectionScreen} />
        <Stack.Screen name="ProfileBasic" component={ProfileBasicStack} />
        <Stack.Screen name="ProfileAdvance" component={ProfileAdvanceStack} />
        <Stack.Screen name="ProfileExpert" component={ProfileExpertStack} />
        <Stack.Screen name="UserManuals" component={UserManualScreen} />
        <Stack.Screen name="EditUserManual" component={EditUserManualScreen} />
        <Stack.Screen name="Feedbacks" component={FeedbackStack} />
        <Stack.Screen name="Habits" component={HabitScreen} />
        <Stack.Screen name="EditHabit" component={EditHabitScreen} />
        <Stack.Screen name="Emotions" component={EmotionScreen} />
        <Stack.Screen name="EditEmotion" component={EditEmotionScreen} />
        <Stack.Screen name="EmotionPicker" component={EmotionPickerScreen} />
        <Stack.Screen name="Needs" component={NeedScreen} />
        <Stack.Screen name="EditNeed" component={EditNeedScreen} />
        <Stack.Screen name="TapToCounts" component={TapToCountScreen} />
        <Stack.Screen
          name="EditPersonality"
          component={EditPersonalityScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default ToolsTabStack;
