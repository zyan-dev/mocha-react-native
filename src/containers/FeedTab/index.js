import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import SocialStack from './social';
import SendSMSScreen from './auth/SendSMS';
import VerifySMSScreen from './auth/VerifySMS';
import CompleteSignUp from './auth/CompleteSignUp';
import FeedWelcome from './auth/Welcome';

const Stack = createStackNavigator();

class FeedTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName={this.props.userToken ? 'Social' : 'Auth_SendSMS'}
        headerMode="none">
        <Stack.Screen name="Social" component={SocialStack} />
        <Stack.Screen name="Auth_SendSMS" component={SendSMSScreen} />
        <Stack.Screen name="Auth_VerifySMS" component={VerifySMSScreen} />
        <Stack.Screen name="Auth_CompleteSignUp" component={CompleteSignUp} />
        <Stack.Screen name="Auth_Welcome" component={FeedWelcome} />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = state => ({
  userToken: state.profileReducer.userToken,
});

export default connect(mapStateToProps, undefined)(FeedTabStack);
