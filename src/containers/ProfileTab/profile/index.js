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
import StressCard from './components/Stress';
import RiskToleranceCard from './components/RiskTolerance';
import FeedbacksCard from './components/Feedbacks';
import QuirksCard from './components/Quirks';
import TriggersCard from './components/Triggers';
import AttachmentCard from './components/Attachment';
import ApproachCard from './components/Approach';
import ComfortCard from './components/Comfort';
import MeaningLifeCard from './components/MeaningLife';
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
import {
  FaucetWhiteSvg,
  FutureSvg,
  ProfileCrownSvg,
  SkullCowSvg,
} from 'assets/svgs';

class ProfileScreen extends React.Component {
  WelcomeProfileDescription = {
    title: i18next.t('welcome_profile_description', {
      bold: i18next.t('outline_profile_basics'),
    }),
    boldWordKeys: ['profile_basics'],
  };

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
  };

  renderProfileIcon = layout => {
    const {theme, profile, profileTab} = this.props;
    if (layout.signinRequired && !profile.userToken.length) return null;
    if (layout.disabled) return null;
    const selected = profileTab === layout.key;
    const size = selected ? 30 : 20;
    const color = selected ? theme.colors.outline : theme.colors.text;
    return (
      <MCButton
        key={layout.key}
        width={50}
        align="center"
        onPress={() => this.onPressProfileIcon(layout)}>
        {layout.key === 'hydration' ? (
          <FaucetWhiteSvg size={size} color={color} />
        ) : layout.key === 'dreams' ? (
          <FutureSvg size={size} color={color} />
        ) : layout.key === 'meaning_life' ? (
          <SkullCowSvg size={size} color={color} />
        ) : (
          <MCIcon
            type={layout.iconType}
            name={layout.icon}
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
      profileLayout,
      profileTab,
      chronotype,
      nutrition,
      hydration,
      stress,
      stressRecovery,
      strength,
      coreValues,
      valueStory,
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
      approach,
      attachment,
      comfort,
      meaning,
      behaviorPreference,
      commits,
      showDrawer,
      visitedProfile,
    } = this.props;
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
              {profileTab === 'stress_recovery' && (
                <StressCard
                  theme={theme}
                  stress={stress}
                  stressRecovery={stressRecovery}
                  onPressEditParts={() =>
                    NavigationService.navigate('EditBodyStress')
                  }
                  onPressEditRecovery={() =>
                    NavigationService.navigate('EditStressRecovery')
                  }
                />
              )}
              {profileTab === 'strengths' && (
                <SkillsCard
                  strength={strength}
                  onPressEdit={() =>
                    NavigationService.navigate('EditStrengths')
                  }
                />
              )}
              {profileTab === 'values' && (
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
                  valueStory={valueStory}
                  onPressEdit={() =>
                    NavigationService.navigate('EditCoreValues')
                  }
                  onPressEditValueStory={value =>
                    NavigationService.navigate('EditValueStory', {value})
                  }
                />
              )}
              {profileTab === 'dreams' && (
                <DreamCard
                  dream={dream}
                  onPressEdit={() => NavigationService.navigate('EditDreams')}
                />
              )}
              {profileTab === 'habits' && (
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
              {profileTab === 'approach_to_conflict' && (
                <ApproachCard
                  approach={approach}
                  onPressEdit={() => NavigationService.navigate('EditApproach')}
                />
              )}
              {profileTab === 'attachment_pattern' && (
                <AttachmentCard
                  attachment={attachment}
                  onPressEdit={() =>
                    NavigationService.navigate('EditAttachment')
                  }
                />
              )}
              {profileTab === 'comfort' && (
                <ComfortCard
                  comfort={comfort}
                  onPressEdit={() => NavigationService.navigate('EditComfort')}
                  theme={theme}
                />
              )}
              {profileTab === 'meaning_life' && (
                <MeaningLifeCard
                  meaning={meaning}
                  onPressEdit={() =>
                    NavigationService.navigate('EditMeaningLife')
                  }
                  theme={theme}
                />
              )}
              {profileTab === 'purposes' && (
                <PurposesCard
                  onPressDetails={() => this.onPressAllPurposes()}
                />
              )}
              {profileTab === 'motivations' && (
                <MotivationCard
                  motivations={motivations}
                  onPressDetails={() => this.onPressAllMotivations()}
                  onPressNew={() => this.onPressNewMotivation()}
                />
              )}
              {profileTab === 'languages' && (
                <LanguagesCard onPressDetails={() => {}} />
              )}
              {profileTab === 'beliefs' && (
                <UserManualsCard
                  manuals={manuals}
                  onPressDetails={() => this.onPressAllUserManuals()}
                  onPressNew={() => this.onPressNewUserManual()}
                />
              )}
              {profileTab === 'personality' && (
                <PersonalityCard
                  personality={personality}
                  onPressEdit={() =>
                    NavigationService.navigate('EditPersonality')
                  }
                />
              )}
              {profileTab === 'risks' && (
                <RiskToleranceCard onPressEdit={() => {}} />
              )}
              {profileTab === 'feedbacks' && (
                <FeedbacksCard
                  feedbacks={feedbacks}
                  onPressDetails={() => NavigationService.navigate('Feedbacks')}
                  onPressNew={() => this.onPressNewFeedback()}
                />
              )}
              {profileTab === 'quirks' && <QuirksCard onPressEdit={() => {}} />}
              {profileTab === 'triggers' && (
                <TriggersCard onPressEdit={() => {}} />
              )}
            </MCContent>
          </MCView>
          <MCView
            width={50}
            style={{borderLeftWidth: 1, borderColor: theme.colors.border}}>
            <MCContent>
              {profileLayout.map(layout => this.renderProfileIcon(layout))}
            </MCContent>
          </MCView>
        </MCView>
        <MCModal
          hasCloseButton={false}
          isVisible={!visitedProfile}
          onClose={() => this.onCloseWelcomeModal()}>
          <MCView align="center" width={280} mt={20}>
            <H3 mb={10} underline>
              {t('welcome_profile_title')}
            </H3>
            <ProfileCrownSvg size={30} theme={theme} />
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
              <H3>{t('button_ok')}</H3>
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
  profileLayout: state.otherReducer.profileLayout,
  profileTab: state.otherReducer.profileTab,
  visitedProfile: state.routerReducer.visitedProfile,
  chronotype: selector.reflections.findMySpecialReflections(
    state,
    'Chronotype',
  ),
  nutrition: selector.reflections.findMySpecialReflections(state, 'Nutrition'),
  hydration: selector.reflections.findMySpecialReflections(state, 'Hydration'),
  stress: selector.reflections.findMySpecialReflections(
    state,
    'StressResponse',
  ),
  stressRecovery: selector.reflections.findMySpecialReflections(
    state,
    'StressRecovery',
  ),
  strength: selector.reflections.findMySpecialReflections(state, 'Strengths'),
  coreValues: selector.reflections.findMySpecialReflections(
    state,
    'CoreValues',
  ),
  valueStory: selector.reflections.findMySpecialReflections(
    state,
    'ValueStory',
  ),
  dream: selector.reflections.findMySpecialReflections(state, 'Dreams'),
  dailyHabits: selector.reflections
    .getMySpecialReflections(state, 'Habit')
    .filter(({data}) => data.isDaily),
  weeklyHabits: selector.reflections
    .getMySpecialReflections(state, 'Habit')
    .filter(({data}) => !data.isDaily),
  manuals: selector.reflections.getMySpecialReflections(state, 'Manual'),
  values: selector.reflections.getMySpecialReflections(state, 'Value'),
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
  approach: selector.reflections.findMySpecialReflections(state, 'Approach'),
  attachment: selector.reflections.findMySpecialReflections(
    state,
    'Attachment',
  ),
  comfort: selector.reflections.findMySpecialReflections(state, 'Comfort'),
  meaning: selector.reflections.findMySpecialReflections(state, 'MeaningLife'),
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
