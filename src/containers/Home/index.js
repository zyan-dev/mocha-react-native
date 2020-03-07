import React from 'react';
import {connect} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedTabStack from '../FeedTab';
import AddValueTabStack from '../AddValueTab';
import ProfileTabStack from '../ProfileTab';
import TabView from './TabView';
import {profileActions} from 'Redux/actions';

var PushNotification = require('react-native-push-notification');

const Tab = createBottomTabNavigator();

class MainHomeStack extends React.Component {
  componentDidMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        this.props.setProfileData({pushToken: token});
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        // process the notification
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: 'YOUR GCM (OR FCM) SENDER ID',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }
  render() {
    return (
      <Tab.Navigator
        tabBar={() => <TabView />}
        initialRouteName="TabAddValue"
        headerMode="none">
        <Tab.Screen name="TabFeed" component={FeedTabStack} />
        <Tab.Screen name="TabAddValue" component={AddValueTabStack} />
        <Tab.Screen name="TabProfile" component={ProfileTabStack} />
      </Tab.Navigator>
    );
  }
}

const mapDispatchToProps = {
  setProfileData: profileActions.setProfileData,
};

export default connect(undefined, mapDispatchToProps)(MainHomeStack);
