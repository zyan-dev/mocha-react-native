import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WaveIndicator} from 'react-native-indicators';
import Mixpanel from 'react-native-mixpanel';

import {ABSView} from 'components/styled/View';
import WelcomeStack from '../containers/Welcome';
import VerificationStack from '../containers/Auth';
import MainHomeStack from '../containers/Home';
import UserProfile from '../containers/Others/UserProfile';
import SelectUserScreen from '../containers/Others/SelectUsers';
import UserHabitScreen from '../containers/Others/UserHabits';
import ContactScreen from '../containers/Contact';
import NavigationService from './NavigationService';
import {MixpanelToken} from 'utils/config';
import {routerActions, chatActions} from 'Redux/actions';

const Stack = createStackNavigator();

class RootNavigator extends React.Component {
  componentDidMount() {
    this.props.setLoading(false);
    this.props.firebaseAuthentication();
    // this.props.setNewUser(false);
    Mixpanel.sharedInstanceWithToken(MixpanelToken);
  }

  render() {
    const {isNewUser, isLoading} = this.props;
    return (
      <NavigationContainer ref={ref => NavigationService.setNavigator(ref)}>
        <Stack.Navigator headerMode="none">
          {isNewUser && (
            <Stack.Screen name="welcomeStack" component={WelcomeStack} />
          )}
          <Stack.Screen name="mainStack" component={MainHomeStack} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="UserHabit" component={UserHabitScreen} />
          <Stack.Screen name="SelectUser" component={SelectUserScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
          <Stack.Screen
            name="VerificationStack"
            component={VerificationStack}
          />
        </Stack.Navigator>
        {isLoading && (
          <ABSView>
            <WaveIndicator color="white" />
          </ABSView>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  isNewUser: state.routerReducer.isNewUser,
  isLoading: state.routerReducer.isLoading,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  setLoading: routerActions.setLoading,
  firebaseAuthentication: chatActions.firebaseAuthentication,
  setNewUser: routerActions.setNewUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNavigator);
