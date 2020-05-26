import React from 'react';
import {connect} from 'react-redux';
import Drawer from 'react-native-drawer';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from './social';
import SendRequestScreen from './send_request';
import MyTrustNetworkScreen from './manage_trustnetwork';
import ManageTrustNetworkScreen from './manage_trustnetwork/Manage';
import PendingRequestScreen from './pending';
import CommunityRulesScreen from './CommunityRules';
import AddPendingUserScreen from './pending/Add';
import CreateChatRoomScreen from './social/chat/Create';
import SelectChatMemberScreen from './social/chat/SelectMember';
import ChatRoomScreen from './social/chat/Room';
import SocialSideMenu from './SideMenu';
import {dySize} from 'utils/responsive';
import {routerActions} from 'Redux/actions';

const Stack = createStackNavigator();

class SocialStack extends React.Component {
  render() {
    const {isDrawerOpened, showDrawer} = this.props;
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={<SocialSideMenu />}
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
          <Stack.Screen name="Feed" component={FeedScreen} />
          <Stack.Screen name="SendRequest" component={SendRequestScreen} />
          <Stack.Screen
            name="MyTrustNetwork"
            component={MyTrustNetworkScreen}
          />
          <Stack.Screen
            name="ManageTrustNetwork"
            component={ManageTrustNetworkScreen}
          />
          <Stack.Screen
            name="PendingRequest"
            component={PendingRequestScreen}
          />
          <Stack.Screen
            name="CommunityRules"
            component={CommunityRulesScreen}
          />
          <Stack.Screen
            name="AddPendingUser"
            component={AddPendingUserScreen}
          />
          <Stack.Screen
            name="CreateChatRoom"
            component={CreateChatRoomScreen}
          />
          <Stack.Screen
            name="SelectChatMember"
            component={SelectChatMemberScreen}
          />
          <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </Stack.Navigator>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  isDrawerOpened: state.routerReducer.isSocialDrawerOpened,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setSocialDrawerOpened,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialStack);
