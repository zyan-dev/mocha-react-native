import React from 'react';
import Drawer from 'react-native-drawer';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './profile';
import ProfileSideMenu from './SideMenu';
import {routerActions} from 'Redux/actions';
import {dySize} from 'utils/responsive';
import ProfileLayoutScreen from './ProfileLayout';
import SettingsScreen from './settings';
import PhoneUpdateScreen from './settings/PhoneUpdate';
import TimeLineScreen from './settings/TimeLine';
import AnalyzeScreen from './settings/Analyze';
import SendMochaCVScreen from './SendMochaCV';
import ManageNotifications from './ManageNotifications';
import PurchaseSubscription from './PurchaseSubscription';
import FeedbackScreen from './profile/details/feedback';
import ChronotypeScreen from './profile/details/chronotype';
import MotivationListScreen from './profile/details/motivations';
import CreateMotivationScreen from './profile/details/motivations/create';
import PersonalityScreen from './profile/details/personality';
import UserManualScreen from '../ToolsTab/usermanual';
import EditUserManualScreen from '../ToolsTab/usermanual/edit';
import HabitScreen from '../ToolsTab/habit';
import EditHabitScreen from '../ToolsTab/habit/Add';
import FeedbackStack from '../ToolsTab/feedback';
import FeedbackPreferenceScreen from '../ToolsTab/profile_advanced/CoachingFeedback';
import BehaviorPreferenceScreen from '../ToolsTab/profile_advanced/QualitiesCharacter';
import EditNutritionScreen from '../ToolsTab/profile_basic/Nutrition';
import EditHydrationScreen from '../ToolsTab/profile_basic/Hydration';
import EditStrengthScreen from '../ToolsTab/profile_basic/Strength';
import EditBodyStressScreen from '../ToolsTab/profile_basic/StressResponse';
import AddValueScreen from '../ToolsTab/value/Add';
import EditDreamScreen from '../ToolsTab/profile_basic/Dream';
import EditCoreValuesScreen from '../ToolsTab/profile_basic/DiscoverYourValues';
import EditCoachingFeedbackScreen from '../ToolsTab/profile_advanced/CoachingFeedback';
import EditCriticismFeedbackScreen from '../ToolsTab/profile_advanced/CriticismFeedback';
import EditPraiseFeedbackScreen from '../ToolsTab/profile_advanced/PriaseFeedback';
import EditQualitiesScreen from '../ToolsTab/profile_advanced/QualitiesCharacter';
import EditChallengesScreen from '../ToolsTab/profile_advanced/ChallengesConcerns';
import EditApproachScreen from '../ToolsTab/profile_advanced/ApproachToConflict';
import EditAttachmentScreen from '../ToolsTab/profile_advanced/AttachmentPattern';
import EditStressRecoveryScreen from '../ToolsTab/profile_advanced/StressRecovery';
import EditComfortScreen from '../ToolsTab/profile_advanced/Comforting';
import EditMeaningLifeScreen from '../ToolsTab/profile_expert/MeaningLife';
import EditValueStoryScreen from '../ToolsTab/profile_expert/ValueStory';
import EditPersonalityScreen from './profile/details/personality';
import BestSelfSubmitScreen from './profile/details/feedback/BestSelf';
import EditTriggersScreen from './profile/EditTriggers';
import VerificationStack from '../Auth';

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
        openDrawerOffset={dySize(75)}
        negotiatePan
        side="left"
        tweenHandler={ratio => ({main: {opacity: (2 - ratio) / 2}})}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="UserManuals" component={UserManualScreen} />
          <Stack.Screen
            name="EditUserManual"
            component={EditUserManualScreen}
          />
          <Stack.Screen name="Habits" component={HabitScreen} />
          <Stack.Screen name="EditHabit" component={EditHabitScreen} />

          <Stack.Screen name="ProfileLayout" component={ProfileLayoutScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="PhoneUpdate" component={PhoneUpdateScreen} />
          <Stack.Screen name="TimeLine" component={TimeLineScreen} />
          <Stack.Screen name="Analyze" component={AnalyzeScreen} />
          <Stack.Screen name="Verification" component={VerificationStack} />
          <Stack.Screen name="SendMochaCV" component={SendMochaCVScreen} />
          <Stack.Screen
            name="ManageNotifications"
            component={ManageNotifications}
          />
          <Stack.Screen name="Purchase" component={PurchaseSubscription} />
          <Stack.Screen name="Feedbacks" component={FeedbackScreen} />
          <Stack.Screen name="RequestFeedback" component={FeedbackStack} />
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
          <Stack.Screen name="EditDreams" component={EditDreamScreen} />
          <Stack.Screen name="EditTriggers" component={EditTriggersScreen} />
          <Stack.Screen
            name="EditCoreValues"
            component={EditCoreValuesScreen}
          />
          <Stack.Screen
            name="EditBodyStress"
            component={EditBodyStressScreen}
          />
          <Stack.Screen
            name="EditStressRecovery"
            component={EditStressRecoveryScreen}
          />
          <Stack.Screen
            name="EditCoachingFeedback"
            component={EditCoachingFeedbackScreen}
          />
          <Stack.Screen
            name="EditCriticismFeedback"
            component={EditCriticismFeedbackScreen}
          />
          <Stack.Screen
            name="EditPraiseFeedback"
            component={EditPraiseFeedbackScreen}
          />
          <Stack.Screen name="EditQualities" component={EditQualitiesScreen} />
          <Stack.Screen
            name="EditChallenges"
            component={EditChallengesScreen}
          />
          <Stack.Screen
            name="EditPersonality"
            component={EditPersonalityScreen}
          />
          <Stack.Screen name="EditApproach" component={EditApproachScreen} />
          <Stack.Screen
            name="EditAttachment"
            component={EditAttachmentScreen}
          />
          <Stack.Screen name="EditComfort" component={EditComfortScreen} />
          <Stack.Screen
            name="EditMeaningLife"
            component={EditMeaningLifeScreen}
          />
          <Stack.Screen
            name="EditValueStory"
            component={EditValueStoryScreen}
          />
          <Stack.Screen
            name="SubmitBestSelfFeedback"
            component={BestSelfSubmitScreen}
          />
          <Stack.Screen name="AddValue" component={AddValueScreen} />
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
