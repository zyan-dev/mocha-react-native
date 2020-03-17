import React from 'react';
import {PushNotificationIOS, Platform} from 'react-native';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedTabStack from '../FeedTab';
import AddValueTabStack from '../AddTab';
import ProfileTabStack from '../ProfileTab';
import TabView from './TabView';
import {profileActions} from 'Redux/actions';

const Tab = createBottomTabNavigator();

class MainHomeStack extends React.Component {
  componentDidMount() {
    const _this = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('PushToken:', token.token);
        _this.props.setProfileData({pushToken: token.token});
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        // process the notification here
        // required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: '662639718845',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    // this.getToken();
  }

  getToken = async () => {
    const granted = messaging().requestPermission();
    if (!granted) {
      return;
    }
    if (Platform.OS === 'ios') {
      console.log('John: ', 'registering');
      await messaging().registerForRemoteNotifications();
      console.log('John: ', 'registered');
      const fcmToken = await messaging().getAPNSToken();
      console.log('iOS PushToken: ', fcmToken);
    } else {
      const fcmToken = await messaging().getToken();
      console.log('Android PushToken: ', fcmToken);
    }
  };

  render() {
    return (
      <Tab.Navigator
        tabBar={props => <TabView {...props} />}
        initialRouteName="TabAddValue"
        backBehavior="none" // not handle back button
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
