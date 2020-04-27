import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ReflectionScreen from './Home';
import UserManualScreen from './usermanual';
import EditUserManualScreen from './usermanual/edit';
import ValueScreen from './value';
import EditValueScreen from './value/edit';
import FeedbackStack from './feedback';
import ObjectiveScreen from './goal';
import EditObjectiveScreen from './goal/Add';
import EmotionScreen from './emotion';
import NeedScreen from './need';
import EditNeedScreen from './need/edit';
import TapToCountScreen from './tab_to_count';
import EditEmotionScreen from './emotion/edit';
import KnowYourSelfStack from './profile_basic';

const Stack = createStackNavigator();

class ToolsTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ToolsTabHome" component={ReflectionScreen} />
        <Stack.Screen name="ProfileBasic" component={KnowYourSelfStack} />
        <Stack.Screen name="UserManuals" component={UserManualScreen} />
        <Stack.Screen name="EditUserManual" component={EditUserManualScreen} />
        <Stack.Screen name="Values" component={ValueScreen} />
        <Stack.Screen name="EditValue" component={EditValueScreen} />
        <Stack.Screen name="Feedbacks" component={FeedbackStack} />
        <Stack.Screen name="Objectives" component={ObjectiveScreen} />
        <Stack.Screen name="EditObjective" component={EditObjectiveScreen} />
        <Stack.Screen name="Emotions" component={EmotionScreen} />
        <Stack.Screen name="EditEmotion" component={EditEmotionScreen} />
        <Stack.Screen name="Needs" component={NeedScreen} />
        <Stack.Screen name="EditNeed" component={EditNeedScreen} />
        <Stack.Screen name="TapToCounts" component={TapToCountScreen} />
      </Stack.Navigator>
    );
  }
}

export default ToolsTabStack;
