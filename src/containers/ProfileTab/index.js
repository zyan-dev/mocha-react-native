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
import FeedbackScreen from './profile/details/feedback';
import ChronotypeScreen from './profile/details/chronotype';
import MotivationListScreen from './profile/details/motivations';
import CreateMotivationScreen from './profile/details/motivations/create';
import PersonalityScreen from './profile/details/personality';
import ValueScreen from '../ToolsTab/value';
import EditValueScreen from '../ToolsTab/value/edit';
import UserManualScreen from '../ToolsTab/usermanual';
import EditUserManualScreen from '../ToolsTab/usermanual/edit';
import ObjectiveScreen from '../ToolsTab/goal';
import EditObjectiveScreen from '../ToolsTab/goal/Add';
import FeedbackPreferenceScreen from '../ToolsTab/profile_basic/FeedbackPreference';
import BehaviorPreferenceScreen from '../ToolsTab/profile_basic/BehaviorPreference';
import EditNutritionScreen from '../ToolsTab/profile_basic/Nutrition';
import EditHydrationScreen from '../ToolsTab/profile_basic/Hydration';
import EditStrengthScreen from '../ToolsTab/profile_basic/Strength';
import EditBodyStressScreen from '../ToolsTab/profile_basic/StressResponse';

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
          <Stack.Screen name="Values" component={ValueScreen} />
          <Stack.Screen name="EditValue" component={EditValueScreen} />
          <Stack.Screen name="UserManuals" component={UserManualScreen} />
          <Stack.Screen
            name="EditUserManual"
            component={EditUserManualScreen}
          />
          <Stack.Screen name="Objectives" component={ObjectiveScreen} />
          <Stack.Screen name="EditObjective" component={EditObjectiveScreen} />

          <Stack.Screen name="TimeLine" component={TimeLineScreen} />
          <Stack.Screen name="Analyze" component={AnalyzeScreen} />
          <Stack.Screen name="SendMochaCV" component={SendMochaCVScreen} />
          <Stack.Screen
            name="ManageNotifications"
            component={ManageNotifications}
          />
          <Stack.Screen name="Purchase" component={PurchaseSubscription} />
          <Stack.Screen name="Feedbacks" component={FeedbackScreen} />
          <Stack.Screen name="Chronotype" component={ChronotypeScreen} />
          <Stack.Screen name="Motivations" component={MotivationListScreen} />
          <Stack.Screen name="Personality" component={PersonalityScreen} />
          <Stack.Screen
            name="FeedbackPreference"
            component={FeedbackPreferenceScreen}
          />
          <Stack.Screen
            name="BehaviorPreference"
            component={BehaviorPreferenceScreen}
          />
          <Stack.Screen
            name="AddMotivation"
            component={CreateMotivationScreen}
          />
          <Stack.Screen name="EditNutrition" component={EditNutritionScreen} />
          <Stack.Screen name="EditHydration" component={EditHydrationScreen} />
          <Stack.Screen name="EditStrengths" component={EditStrengthScreen} />
          <Stack.Screen
            name="EditBodyStress"
            component={EditBodyStressScreen}
          />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileTabStack);
