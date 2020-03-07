import React from 'react';
import Drawer from 'react-native-drawer';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './profile';
import ProfileSideMenu from './SideMenu';
import {routerActions} from 'Redux/actions';
import {dySize} from 'utils/responsive';
import TimeLineScreen from './TimeLine';
import AnalyzeScreen from './Analyze';
import SendMochaCVScreen from './SendMochaCV';
import ManageNotifications from './ManageNotifications';
import PurchaseSubscription from './PurchaseSubscription';

const Stack = createStackNavigator();

class ProfileTabStack extends React.Component {
  render() {
    const {isDrawerOpened, showDrawer} = this.props;
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={<ProfileSideMenu />}
        type="overlay"
        acceptDoubleTap
        open={isDrawerOpened}
        onOpen={() => showDrawer(true)}
        onClose={() => showDrawer(false)}
        tabToClose
        acceptTap
        tweenDuration={100}
        panThreshold={0.08}
        openDrawerOffset={dySize(100)}
        negotiatePan
        side="left"
        tweenHandler={ratio => ({main: {opacity: (2 - ratio) / 2}})}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="TimeLine" component={TimeLineScreen} />
          <Stack.Screen name="Analyze" component={AnalyzeScreen} />
          <Stack.Screen name="SendMochaCV" component={SendMochaCVScreen} />
          <Stack.Screen
            name="ManageNotifications"
            component={ManageNotifications}
          />
          <Stack.Screen name="Purchase" component={PurchaseSubscription} />
        </Stack.Navigator>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  isDrawerOpened: state.routerReducer.isProfileDrawerOpened,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabStack);
