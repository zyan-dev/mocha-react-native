import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WaveIndicator} from 'react-native-indicators';
import NetInfo from '@react-native-community/netinfo';
import {routerActions} from 'Redux/actions';
import {ABSView} from 'components/styled/View';
import WelcomeStack from '../containers/Welcome';
import MainHomeStack from '../containers/Home';
import NavigationService from './NavigationService';
import UserProfile from '../containers/Others/UserProfile';
import SelectUserScreen from '../containers/Others/SelectUsers';
import {MixpanelToken} from 'utils/config';

import Mixpanel from 'react-native-mixpanel';

const Stack = createStackNavigator();

class RootNavigator extends React.Component {
  componentDidMount() {
    this.props.setLoading(false);
    Mixpanel.sharedInstanceWithToken(MixpanelToken);
  }

  _onNavigationStateChange = newState => {
    const {isInternetReachable, setNetworkOfflineStatus, syncData} = this.props;
    NetInfo.fetch().then(state => {
      if (!isInternetReachable && state.isInternetReachable) {
        // changed to online status
        syncData(false);
      }
      setNetworkOfflineStatus(state.isInternetReachable);
    });
  };

  render() {
    const {isNewUser, isLoading} = this.props;
    return (
      <NavigationContainer
        ref={ref => NavigationService.setNavigator(ref)}
        onStateChange={this._onNavigationStateChange}>
        <Stack.Navigator headerMode="none">
          {isNewUser && (
            <Stack.Screen name="welcomeStack" component={WelcomeStack} />
          )}
          <Stack.Screen name="mainStack" component={MainHomeStack} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="SelectUser" component={SelectUserScreen} />
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
  isInternetReachable: state.routerReducer.isInternetReachable,
});

const mapDispatchToProps = {
  setLoading: routerActions.setLoading,
  setNetworkOfflineStatus: routerActions.setNetworkOfflineStatus,
  syncData: routerActions.syncData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNavigator);
