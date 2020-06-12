import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WaveIndicator} from 'react-native-indicators';
import NotificationPopup from 'react-native-push-notification-popup';
import Mixpanel from 'react-native-mixpanel';
import messaging from '@react-native-firebase/messaging';
import {
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

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
import {MochaLogo} from 'assets/images';
import {
  profileActions,
  feedbackActions,
  chatActions,
  otherActions,
  routerActions,
  reflectionActions,
} from 'Redux/actions';
import i18next from 'i18next';

const Stack = createStackNavigator();

class RootNavigator extends React.Component {
  componentDidMount() {
    const {
      setLoading,
      firebaseAuthentication,
      profile,
      getChatVisitStatus,
    } = this.props;

    this.checkNotificationPermission();
    this.props.checkCodePushUpdates();

    setLoading(false);
    firebaseAuthentication();
    // get unread message status
    if (profile.userToken.length > 0) getChatVisitStatus();
    // this.props.setNewUser(false);
    Mixpanel.sharedInstanceWithToken(MixpanelToken);
  }

  checkNotificationPermission = async () => {
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
    const _this = this;
    messaging().onMessage(remoteMessage => {
      if (!this.popup || !remoteMessage.notification) return;
      this.popup.show({
        onPress: function() {
          _this.processNotification(remoteMessage);
        },
        appIconSource: MochaLogo,
        appTitle: i18next.t('app_name'),
        timeText: 'Now',
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        slideOutTime: 5000,
      });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      this.processNotification(remoteMessage);
    });
  };

  processNotification(notification) {
    const {getMyFeedbacks, selectHabitUser} = this.props;
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
        selectHabitUser({_id: userId});
        NavigationService.navigate('TabTools');
        setTimeout(() => {
          NavigationService.navigate('Habits', {tabIndex: 2});
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
    const {theme, isNewUser, isLoading} = this.props;
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
            <WaveIndicator color={theme.colors.text} />
          </ABSView>
        )}
        <NotificationPopup ref={ref => (this.popup = ref)} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  isNewUser: state.routerReducer.isNewUser,
  isLoading: state.routerReducer.isLoading,
  profile: state.profileReducer,
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  setLoading: routerActions.setLoading,
  firebaseAuthentication: chatActions.firebaseAuthentication,
  getChatVisitStatus: chatActions.getChatVisitStatus,
  setNewUser: routerActions.setNewUser,
  setProfileData: profileActions.setProfileData,
  updateBasicProfile: profileActions.updateBasicProfile,
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  getUserProfile: profileActions.getUserProfile,
  gotoChatRoom: chatActions.gotoChatRoom,
  checkCodePushUpdates: otherActions.checkCodePushUpdates,
  selectHabitUser: reflectionActions.selectHabitUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNavigator);
