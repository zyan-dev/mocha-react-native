import React from 'react';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedTabStack from '../FeedTab';
import ToolsTabStack from '../ToolsTab';
import ProfileTabStack from '../ProfileTab';
import AddResourceTabStack from '../ResourceTab';
import TabView from './TabView';
import {
  profileActions,
  userActions,
  feedbackActions,
  reflectionActions,
} from 'Redux/actions';
import NavigationService from 'navigation/NavigationService';

const Tab = createBottomTabNavigator();

class MainHomeStack extends React.Component {
  componentDidMount() {
    const {
      setProfileData,
      getAllTrustMembers,
      getMyFeedbacks,
      getUserProfile,
      getUserReflections,
    } = this.props;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function(token) {
        const fcmToken = await messaging().getToken();
        console.log('FCM PushToken: ', fcmToken); // used FCM token instead of APNs token on iOS
        setProfileData({pushToken: fcmToken});
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        // process the notification here
        // Sample notification data
        // {
        //   foreground: false,
        //   userInteraction: true,
        //   message: 'Tian asked you feedback',
        //   data: {
        //     remote: true,
        //     'google.c.sender.id': '662639718845',
        //     'google.c.a.e': '1',
        //     notificationId: '5BDDC2CD-954E-4340-8043-61BDCD2FFF3F',
        //     type: 'request.feedback',
        //     'gcm.message_id': '1585932751509582'
        //   },
        //   badge: undefined,
        //   alert: 'Tian asked you feedback',
        //   sound: 'default',
        //   finish: [Function: finish]
        // }
        switch (notification.data.type) {
          case 'request.feedback':
            getMyFeedbacks();
            NavigationService.navigate('TabProfile');
            setTimeout(() => {
              NavigationService.navigate('Feedbacks', {tabIndex: 2});
            });
            break;
          case 'feedback.received':
            getMyFeedbacks();
            NavigationService.navigate('TabProfile');
            setTimeout(() => {
              NavigationService.navigate('Feedbacks');
            });
            break;
          case 'send.request':
            getAllTrustMembers();
            NavigationService.navigate('TabFeed');
            setTimeout(() => {
              NavigationService.navigate('PendingRequest');
            });
            break;
          case 'add.trustnetwork':
            getAllTrustMembers();
            NavigationService.navigate('TabFeed');
            setTimeout(() => {
              NavigationService.navigate('MyTrustNetwork');
            });
            break;
          case 'complete.habit':
            const userId = notification.data.userId;
            getUserProfile(userId);
            getUserReflections(userId);
            setTimeout(() => {
              NavigationService.navigate('UserHabit', {id: userId});
            });
            break;
          default:
            break;
        }
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
  }

  render() {
    return (
      <Tab.Navigator
        tabBar={props => <TabView {...props} />}
        initialRouteName="TabTools"
        backBehavior="none" // not handle back button
        headerMode="none">
        <Tab.Screen name="TabFeed" component={FeedTabStack} />
        <Tab.Screen name="TabResource" component={AddResourceTabStack} />
        <Tab.Screen name="TabTools" component={ToolsTabStack} />
        <Tab.Screen name="TabProfile" component={ProfileTabStack} />
      </Tab.Navigator>
    );
  }
}

const mapDispatchToProps = {
  setProfileData: profileActions.setProfileData,
  getAllTrustMembers: userActions.getAllTrustMembers,
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  getUserProfile: profileActions.getUserProfile,
  getUserReflections: reflectionActions.getUserReflections,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(MainHomeStack);
