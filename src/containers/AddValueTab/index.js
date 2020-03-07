import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddValueScreen from './AddValue';

const Stack = createStackNavigator();

class AddValueTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AddValue" component={AddValueScreen} />
      </Stack.Navigator>
    );
  }
}

export default AddValueTabStack;
