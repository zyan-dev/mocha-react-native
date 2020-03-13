import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeStack from '../containers/Welcome';
import MainHomeStack from '../containers/Home';
import NavigationService from './NavigationService';
import UserProfile from '../containers/Others/UserProfile';
import SelectUserScreen from '../containers/Others/SelectUsers';

const Stack = createStackNavigator();

class RootNavigator extends React.Component {
  render() {
    const {isNewUser} = this.props;
    return (
      <NavigationContainer ref={ref => NavigationService.setNavigator(ref)}>
        <Stack.Navigator headerMode="none">
          {isNewUser && (
            <Stack.Screen name="welcomeStack" component={WelcomeStack} />
          )}
          <Stack.Screen name="mainStack" component={MainHomeStack} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="SelectUser" component={SelectUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  isNewUser: state.routerReducer.isNewUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
