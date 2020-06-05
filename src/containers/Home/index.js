import React from 'react';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import FeedTabStack from '../FeedTab';
import ToolsTabStack from '../ToolsTab';
import ProfileTabStack from '../ProfileTab';
import ResourceTabStack from '../ResourceTab';
import ProgressTabStack from '../ProgressTab';
import TabView from './TabView';
import {
  profileActions,
  feedbackActions,
  chatActions,
  otherActions,
} from 'Redux/actions';
import NavigationService from 'navigation/NavigationService';
import {showAlert} from 'services/operators';

const Tab = createBottomTabNavigator();

class MainHomeStack extends React.Component {
  componentDidMount() {
    this.checkPermission();
    this.props.checkCodePushUpdates();
  }

  checkPermission = async () => {
    checkNotifications().then(({status, settings}) => {
      // …
      if (status !== RESULTS.GRANTED) {
        requestNotifications(['alert', 'badge', 'sound']).then(
          ({status, settings}) => {
            // …
            if (status === RESULTS.GRANTED) {
              this.savePushToken();
              this.setUpNotificationListener();
            }
          },
        );
      } else {
        this.savePushToken();
        this.setUpNotificationListener();
      }
    });
  };

  savePushToken = async () => {
    const fcmToken = await messaging().getToken();
    this.props.setProfileData({pushToken: fcmToken});
    setTimeout(() => {
      this.props.updateBasicProfile();
    });
  };

  setUpNotificationListener = () => {
    // messaging().onMessage(remoteMessage => {
    //   alert(JSON.stringify(remoteMessage));
    // });
    messaging().onNotificationOpenedApp(remoteMessage => {
      this.processNotification(remoteMessage);
    });
  };

  processNotification(notification) {
    const {getMyFeedbacks, getUserProfile} = this.props;
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
        NavigationService.navigate('TabFeed');
        setTimeout(() => {
          NavigationService.navigate('PendingRequest');
        });
        break;
      case 'add.trustnetwork':
        NavigationService.navigate('TabFeed');
        setTimeout(() => {
          NavigationService.navigate('MyTrustNetwork');
        });
        break;
      case 'complete.habit':
        const userId = notification.data.userId;
        getUserProfile(userId);
        setTimeout(() => {
          NavigationService.navigate('UserHabit', {id: userId});
        });
        break;
      case 'receive.chat.notification':
        const roomID = notification.data.roomId;
        this.props.gotoChatRoom(roomID);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Tab.Navigator
        tabBar={props => <TabView {...props} />}
        initialRouteName="TabTools"
        backBehavior="none" // not handle back button
        headerMode="none">
        <Tab.Screen name="TabFeed" component={FeedTabStack} />
        <Tab.Screen name="TabResource" component={ResourceTabStack} />
        <Tab.Screen name="TabProgress" component={ProgressTabStack} />
        <Tab.Screen name="TabTools" component={ToolsTabStack} />
        <Tab.Screen name="TabProfile" component={ProfileTabStack} />
      </Tab.Navigator>
    );
  }
}

const mapDispatchToProps = {
  setProfileData: profileActions.setProfileData,
  updateBasicProfile: profileActions.updateBasicProfile,
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  getUserProfile: profileActions.getUserProfile,
  checkCodePushUpdates: otherActions.checkCodePushUpdates,
  gotoChatRoom: chatActions.gotoChatRoom,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(MainHomeStack);
