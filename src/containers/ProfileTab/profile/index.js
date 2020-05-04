import React from 'react';
import {connect} from 'react-redux';
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import {
  feedbackActions,
  routerActions,
  reflectionActions,
  otherActions,
} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {UserSvg} from 'assets/svgs';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCModal} from 'components/common';
import {selector} from 'Redux/selectors';
import OverviewCard from './components/Overview';
import ContactCard from './components/Contact';
import ValuesCard from './components/Values';
import CoreValuesCard from './components/CoreValues';
import PurposesCard from './components/Purposes';
import MotivationCard from './components/Motivations';
import LanguagesCard from './components/Languages';
import SkillsCard from './components/Skills';
import UserManualsCard from './components/UserManuals';
import HabitCard from './components/habits';
import ChronotypeCard from './components/Chronotype';
import PersonalityCard from './components/Personality';
import StressAndComfortCard from './components/StressAndComfort';
import RiskToleranceCard from './components/RiskTolerance';
import FeedbacksCard from './components/Feedbacks';
import QuirksCard from './components/Quirks';
import TriggersCard from './components/Triggers';
import AttachmentCard from './components/Attachment';
import ApproachCard from './components/Approach';
import CoachingFeedbackCard from './components/FeedbackCoaching';
import CriticismFeedbackCard from './components/FeedbackCriticism';
import PraiseFeedbackCard from './components/FeedbackPraise';
import QualitiesBehaviorCard from './components/BehaviorQualities';
import ChallengesBehaviorCard from './components/BehaviorChallenges';
import NutritionCard from './components/Nutrition';
import HydrationCard from './components/Hydration';
import DreamCard from './components/Dream';
import NavigationService from 'navigation/NavigationService';
import {showAlert, getStringWithOutline} from 'services/operators';
import {profileIcons} from 'utils/constants';
import {dySize} from 'utils/responsive';
import {FaucetWhiteSvg, FutureSvg} from 'assets/svgs';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcomeModal: false,
    };
  }

  WelcomeProfileDescription = {
    title: i18next.t('welcome_profile_description', {
      bold: i18next.t('outline_profile_basics'),
    }),
    boldWordKeys: ['profile_basics'],
  };

  componentDidMount() {
    const {visitedProfile, profile, getMyFeedbacks} = this.props;
    if (profile.userToken.length > 0) {
      getMyFeedbacks();
    }
    if (!visitedProfile) {
      this.setState({showWelcomeModal: true});
    }
  }

  onPressAllValues = () => {
    NavigationService.navigate('Values');
  };
  onPressNewValue = () => {
    this.props.setInitialReflection('value');
    NavigationService.navigate('EditValue');
  };

  onPressAllMotivations = () => {
    NavigationService.navigate('Motivations');
  };

  onPressNewMotivation = () => {
    this.props.setInitialReflection('motivation');
    NavigationService.navigate('AddMotivation');
  };

  onPressAllPurposes = () => {};

  onPressAllHabits = tabIndex => {
    if (!this.props.profile.userToken) {
      showAlert('You need to sign up');
    } else {
      NavigationService.navigate('Habits', {tabIndex});
    }
  };

  onPressAllUserManuals = () => {
    NavigationService.navigate('UserManuals');
  };
  onPressNewUserManual = () => {
    this.props.setInitialReflection('manual');
    NavigationService.navigate('EditUserManual');
  };

  onPressNewFeedback = () => {
    if (!this.props.profile.userToken) {
      showAlert('You need to sign up');
    } else {
      NavigationService.navigate('TabTools');
      setTimeout(() => {
        NavigationService.navigate('Feedbacks');
      });
    }
  };

  onPressAllPersonalities = () => {};
  onPressAllSkills = () => {};
  onPressAllQuirks = () => {};
  onPressAllTriggers = () => {};
  onPressAllAttachments = () => {};
  onPressAllApproaches = () => {};
  onPressAllLanguages = () => {};
  onPressAllRisks = () => {};
  onPressAllAnswers = () => {};
  onPressProfileIcon = icon => {
    this.props.changeProfileTab(icon.key);
  };

  onCloseWelcomeModal = () => {
    this.props.visitProfileTab();
    this.setState({showWelcomeModal: false});
  };

  renderProfileIcon = icon => {
    const {theme, profile, profileTab} = this.props;
    if (icon.signinRequired && !profile.userToken.length) return null;
    const selected = profileTab === icon.key;
    const size = selected ? 30 : 20;
    const color = selected ? theme.colors.outline : theme.colors.text;
    return (
      <MCButton
        key={icon.key}
        width={50}
        align="center"
        onPress={() => this.onPressProfileIcon(icon)}>
        {icon.key === 'hydration' ? (
          <FaucetWhiteSvg size={size} color={color} />
        ) : icon.key === 'dream' ? (
          <FutureSvg size={size} color={color} />
        ) : (
          <MCIcon
            type={icon.iconType}
            name={icon.icon}
            size={size}
            color={color}
          />
        )}
      </MCButton>
    );
  };

  render() {
    const {
      t,
      theme,
      profile,
      profileTab,
      chronotype,
      nutrition,
      hydration,
      stress,
      strength,
      coreValues,
      dream,
      dailyHabits,
      weeklyHabits,
      values,
      feedbacks,
      motivations,
      manuals,
      personality,
      coaching,
      criticism,
      praise,
      qualities,
      challenges,
      behaviorPreference,
      commits,
      showDrawer,
    } = this.props;
    const {showWelcomeModal} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          leftIcon="bars"
          title={t('profile_title')}
          onPressBack={() => showDrawer(true)}
        />
        <MCView row style={{flex: 1}}>
          <MCView width={325}>
            <MCContent
              style={{width: dySize(325)}}
              contentContainerStyle={{padding: dySize(10)}}>
              {profileTab === 'overview' && <OverviewCard profile={profile} />}
              {profileTab === 'contact' && <ContactCard profile={profile} />}
              {profileTab === 'chronotype' && (
                <ChronotypeCard
                  theme={theme}
                  chronotype={chronotype}
                  onPressEdit={() => NavigationService.navigate('Chronotype')}
                />
              )}
              {profileTab === 'nutrition' && (
                <NutritionCard
                  nutrition={nutrition}
                  onPressEdit={() =>
                    NavigationService.navigate('EditNutrition')
                  }
                />
              )}
              {profileTab === 'hydration' && (
                <HydrationCard
                  theme={theme}
                  hydration={hydration}
                  onPressEdit={() =>
                    NavigationService.navigate('EditHydration')
                  }
                />
              )}
              {profileTab === 'stress' && (
                <StressAndComfortCard
                  theme={theme}
                  stress={stress}
                  onPressEdit={() =>
                    NavigationService.navigate('EditBodyStress')
                  }
                />
              )}
              {profileTab === 'skill' && (
                <SkillsCard
                  strength={strength}
                  onPressEdit={() =>
                    NavigationService.navigate('EditStrengths')
                  }
                />
              )}
              {profileTab === 'value' && (
                <ValuesCard
                  values={values}
                  onPressDetails={() => this.onPressAllValues()}
                  onPressNew={() => this.onPressNewValue()}
                />
              )}
              {profileTab === 'core_values' && (
                <CoreValuesCard
                  theme={theme}
                  coreValues={coreValues}
                  onPressEdit={() =>
                    NavigationService.navigate('EditCoreValues')
                  }
                />
              )}
              {profileTab === 'dream' && (
                <DreamCard
                  dream={dream}
                  onPressEdit={() => NavigationService.navigate('EditDreams')}
                />
              )}
              {profileTab === 'habit' && (
                <HabitCard
                  commits={commits}
                  dailyHabits={dailyHabits}
                  weeklyHabits={weeklyHabits}
                  onPressAll={() => this.onPressAllHabits(0)}
                  theme={theme}
                />
              )}
              {profileTab === 'coaching_feedback' && (
                <CoachingFeedbackCard
                  coaching={coaching}
                  theme={theme}
                  onPressEdit={() =>
                    NavigationService.navigate('EditCoachingFeedback')
                  }
                />
              )}
              {profileTab === 'criticism_feedback' && (
                <CriticismFeedbackCard
                  criticism={criticism}
                  theme={theme}
                  onPressEdit={() =>
                    NavigationService.navigate('EditCriticismFeedback')
                  }
                />
              )}
              {profileTab === 'praise_feedback' && (
                <PraiseFeedbackCard
                  praise={praise}
                  theme={theme}
                  onPressEdit={() =>
                    NavigationService.navigate('EditPraiseFeedback')
                  }
                />
              )}
              {profileTab === 'qualities_character' && (
                <QualitiesBehaviorCard
                  qualities={qualities}
                  behaviorPreference={behaviorPreference}
                  theme={theme}
                  onPressEdit={() =>
                    NavigationService.navigate('EditQualities')
                  }
                />
              )}
              {profileTab === 'challenges_concerns' && (
                <ChallengesBehaviorCard
                  challenges={challenges}
                  behaviorPreference={behaviorPreference}
                  onPressEdit={() =>
                    NavigationService.navigate('EditChallenges')
                  }
                />
              )}
              {profileTab === 'purpose' && (
                <PurposesCard
                  onPressDetails={() => this.onPressAllPurposes()}
                />
              )}
              {profileTab === 'motivation' && (
                <MotivationCard
                  motivations={motivations}
                  onPressDetails={() => this.onPressAllMotivations()}
                  onPressNew={() => this.onPressNewMotivation()}
                />
              )}
              {profileTab === 'languages' && (
                <LanguagesCard onPressDetails={() => {}} />
              )}
              {profileTab === 'belief' && (
                <UserManualsCard
                  manuals={manuals}
                  onPressDetails={() => this.onPressAllUserManuals()}
                  onPressNew={() => this.onPressNewUserManual()}
                />
              )}
              {profileTab === 'personality' && (
                <PersonalityCard personality={personality} />
              )}
              {profileTab === 'risk' && (
                <RiskToleranceCard onPressEdit={() => {}} />
              )}
              {profileTab === 'feedback' && (
                <FeedbacksCard
                  feedbacks={feedbacks}
                  onPressDetails={() => NavigationService.navigate('Feedbacks')}
                  onPressNew={() => this.onPressNewFeedback()}
                />
              )}
              {profileTab === 'quirk' && <QuirksCard onPressEdit={() => {}} />}
              {profileTab === 'trigger' && (
                <TriggersCard onPressEdit={() => {}} />
              )}
              {profileTab === 'attachment' && (
                <AttachmentCard onPressEdit={() => {}} />
              )}
              {profileTab === 'approach' && (
                <ApproachCard onPressEdit={() => {}} />
              )}
            </MCContent>
          </MCView>
          <MCView
            width={50}
            style={{borderLeftWidth: 1, borderColor: theme.colors.border}}>
            <MCContent>
              {profileIcons.map(icon => this.renderProfileIcon(icon))}
            </MCContent>
          </MCView>
        </MCView>
        <MCModal
          hasCloseButton={false}
          isVisible={showWelcomeModal}
          onClose={() => this.setState({showModal: false})}>
          <MCView align="center" width={280} mt={20}>
            <H3 mb={10} underline>
              {t('welcome_profile_title')}
            </H3>
            <UserSvg size={30} color={theme.colors.text} />
            <H4 mt={20} pv={1}>
              {t('welcome_tools_take_a_look')}
            </H4>
            {getStringWithOutline(this.WelcomeProfileDescription)}
            <MCButton
              bordered
              mt={20}
              width={80}
              align="center"
              onPress={() => this.onCloseWelcomeModal()}>
              <H3>{t('modal_ok')}</H3>
            </MCButton>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  profileTab: state.otherReducer.profileTab,
  visitedProfile: state.routerReducer.visitedProfile,
  chronotype: selector.reflections.findMySpecialReflections(
    state,
    'Chronotype',
  ),
  nutrition: selector.reflections.findMySpecialReflections(state, 'Nutrition'),
  hydration: selector.reflections.findMySpecialReflections(state, 'Hydration'),
  stress: selector.reflections.findMySpecialReflections(state, 'Stress'),
  strength: selector.reflections.findMySpecialReflections(state, 'Strength'),
  coreValues: selector.reflections.findMySpecialReflections(
    state,
    'CoreValues',
  ),
  dream: selector.reflections.findMySpecialReflections(state, 'Dream'),
  dailyHabits: selector.reflections
    .getMySpecialReflections(state, 'Habit')
    .filter(({data}) => data.isDaily),
  weeklyHabits: selector.reflections
    .getMySpecialReflections(state, 'Habit')
    .filter(({data}) => !data.isDaily),
  manuals: selector.reflections.getMySpecialReflections(state, 'Manual'),
  values: selector.reflections.getMySpecialReflections(state, 'Value'),
  manuals: selector.reflections.getMySpecialReflections(state, 'Manual'),
  motivations: selector.reflections.getMySpecialReflections(
    state,
    'Motivation',
  ),
  feedbacks: selector.feedbacks.getMyFeedbacks(state).received,
  personality: selector.reflections.findMySpecialReflections(
    state,
    'Personality',
  ),
  coaching: selector.reflections.findMySpecialReflections(
    state,
    'CoachingFeedback',
  ),
  criticism: selector.reflections.findMySpecialReflections(
    state,
    'CriticismFeedback',
  ),
  praise: selector.reflections.findMySpecialReflections(
    state,
    'PraiseFeedback',
  ),
  qualities: selector.reflections.findMySpecialReflections(state, 'Qualities'),
  challenges: selector.reflections.findMySpecialReflections(
    state,
    'Challenges',
  ),
  commits: state.otherReducer.commits,
});

const mapDispatchToProps = {
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  showDrawer: routerActions.setProfileDrawerOpened,
  setInitialReflection: reflectionActions.setInitialReflection,
  visitProfileTab: routerActions.visitProfileTab,
  changeProfileTab: otherActions.changeProfileTab,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileScreen),
);
