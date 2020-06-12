import React from 'react';
import {connect} from 'react-redux';
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {
  feedbackActions,
  routerActions,
  reflectionActions,
  otherActions,
} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';
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
import {dySize} from 'utils/responsive';
import {
  FaucetWhiteSvg,
  FutureSvg,
  UserLightSvg,
  SkullCowSvg,
  SirenOnSvg,
} from 'assets/svgs';

const opacityArray = [1, 0.5, 0.2];

class ProfileScreen extends React.Component {
  state = {
    viewableItems: [],
    focusedIndex: 0,
  };
  viewabilityConfig = {
    waitForInteraction: false,
    itemVisiblePercentThreshold: 20,
  };

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

  onPressProfileIcon = (icon, index) => {
    this.props.changeProfileTab(icon.key);
    this.setState({focusedIndex: index});
    this.contentScroll &&
      this.contentScroll.scrollToIndex({animated: false, index});
  };

  onCloseWelcomeModal = () => {
    this.props.visitProfileTab();
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    const {profileLayout} = this.props;
    if (viewableItems.length === 0) return;
    const findIndex = profileLayout.findIndex(
      i => i.key === viewableItems[0].key,
    );
    this.setState({viewableItems, focusedIndex: findIndex}, () => {
      this.iconScroll &&
        this.iconScroll.scrollToIndex({
          animated: true,
          index: findIndex,
          viewPosition: 0.5,
        });
    });
  };

  _renderProfileSections = ({item}) => {
    const {
      theme,
      profile,
      chronotype,
      nutrition,
      hydration,
      stress,
      stressRecovery,
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
      approach,
      attachment,
      comfort,
      meaning,
      behaviorPreference,
      commits,
      triggers,
    } = this.props;
    const key = item.key;
    if (item.disabled) return null;
    if (item.signinRequired && !profile.userToken.length) return null;
    if (key === 'overview') return <OverviewCard profile={profile} />;
    if (key === 'contact') return <ContactCard profile={profile} />;
    if (key === 'chronotype')
      return (
        <ChronotypeCard
          theme={theme}
          chronotype={chronotype}
          onPressEdit={() => NavigationService.navigate('Chronotype')}
        />
      );
    if (key === 'nutrition')
      return (
        <NutritionCard
          nutrition={nutrition}
          onPressEdit={() => NavigationService.navigate('EditNutrition')}
        />
      );
    if (key === 'hydration')
      return (
        <HydrationCard
          theme={theme}
          hydration={hydration}
          onPressEdit={() => NavigationService.navigate('EditHydration')}
        />
      );
    if (key === 'stress_recovery')
      return (
        <StressCard
          theme={theme}
          stress={stress}
          stressRecovery={stressRecovery}
          onPressEditParts={() => NavigationService.navigate('EditBodyStress')}
          onPressEditRecovery={() =>
            NavigationService.navigate('EditStressRecovery')
          }
        />
      );
    if (key === 'strengths')
      return (
        <SkillsCard
          strength={strength}
          onPressEdit={() => NavigationService.navigate('EditStrengths')}
        />
      );
    if (key === 'core_values')
      return (
        <CoreValuesCard
          theme={theme}
          coreValues={coreValues}
          onPressEdit={() => NavigationService.navigate('EditCoreValues')}
          onPressEditValueStory={value =>
            NavigationService.navigate('EditValueStory', {value})
          }
        />
      );
    if (key === 'dreams')
      return (
        <DreamCard
          dream={dream}
          onPressEdit={() => NavigationService.navigate('EditDreams')}
        />
      );
    if (key === 'habits')
      return (
        <HabitCard
          commits={commits}
          dailyHabits={dailyHabits}
          weeklyHabits={weeklyHabits}
          onPressAll={() => this.onPressAllHabits(0)}
          theme={theme}
        />
      );
    if (key === 'coaching_feedback')
      return (
        <CoachingFeedbackCard
          coaching={coaching}
          theme={theme}
          onPressEdit={() => NavigationService.navigate('EditCoachingFeedback')}
        />
      );
    if (key === 'criticism_feedback')
      return (
        <CriticismFeedbackCard
          criticism={criticism}
          theme={theme}
          onPressEdit={() =>
            NavigationService.navigate('EditCriticismFeedback')
          }
        />
      );
    if (key === 'praise_feedback')
      return (
        <PraiseFeedbackCard
          praise={praise}
          theme={theme}
          onPressEdit={() => NavigationService.navigate('EditPraiseFeedback')}
        />
      );
    if (key === 'qualities_character')
      return (
        <QualitiesBehaviorCard
          qualities={qualities}
          behaviorPreference={behaviorPreference}
          theme={theme}
          onPressEdit={() => NavigationService.navigate('EditQualities')}
        />
      );
    if (key === 'challenges_concerns')
      return (
        <ChallengesBehaviorCard
          challenges={challenges}
          behaviorPreference={behaviorPreference}
          onPressEdit={() => NavigationService.navigate('EditChallenges')}
        />
      );
    if (key === 'approach_to_conflict')
      return (
        <ApproachCard
          approach={approach}
          onPressEdit={() => NavigationService.navigate('EditApproach')}
        />
      );
    if (key === 'attachment_pattern')
      return (
        <AttachmentCard
          attachment={attachment}
          onPressEdit={() => NavigationService.navigate('EditAttachment')}
        />
      );
    if (key === 'comfort')
      return (
        <ComfortCard
          comfort={comfort}
          onPressEdit={() => NavigationService.navigate('EditComfort')}
          theme={theme}
        />
      );
    if (key === 'meaning_life')
      return (
        <MeaningLifeCard
          meaning={meaning}
          onPressEdit={() => NavigationService.navigate('EditMeaningLife')}
          theme={theme}
        />
      );
    if (key === 'personality')
      return (
        <PersonalityCard
          personality={personality}
          onPressEdit={() => NavigationService.navigate('EditPersonality')}
        />
      );
    if (key === 'values')
      return (
        <ValuesCard
          values={values}
          onPressDetails={() => this.onPressAllValues()}
          onPressNew={() => this.onPressNewValue()}
        />
      );
    if (key === 'feedbacks')
      return (
        <FeedbacksCard
          feedbacks={feedbacks}
          onPressDetails={() => NavigationService.navigate('Feedbacks')}
          onPressNew={() => NavigationService.navigate('RequestFeedback')}
        />
      );
    if (key === 'purposes')
      return <PurposesCard onPressDetails={() => this.onPressAllPurposes()} />;
    if (key === 'motivations')
      return (
        <MotivationCard
          motivations={motivations}
          onPressDetails={() => this.onPressAllMotivations()}
          onPressNew={() => this.onPressNewMotivation()}
        />
      );
    if (key === 'languages') return <LanguagesCard onPressDetails={() => {}} />;
    if (key === 'beliefs')
      return (
        <UserManualsCard
          manuals={manuals}
          onPressDetails={() => this.onPressAllUserManuals()}
          onPressNew={() => this.onPressNewUserManual()}
        />
      );
    if (key === 'risks') return <RiskToleranceCard onPressEdit={() => {}} />;
    if (key === 'quirks') return <QuirksCard onPressEdit={() => {}} />;
    if (key === 'triggers')
      return (
        <TriggersCard
          onPressEdit={() => NavigationService.navigate('EditTriggers')}
          theme={theme}
          triggers={triggers}
        />
      );
  };

  renderProfileIcon = ({item, index}) => {
    const {viewableItems, focusedIndex} = this.state;
    const {theme, profile, profileTab} = this.props;
    const layout = item;
    if (layout.signinRequired && !profile.userToken.length) return null;
    if (layout.disabled) return null;
    const selected =
      viewableItems.length && viewableItems[0].key === layout.key;
    const size = selected ? 25 : 20;
    const color = selected ? theme.colors.outline : theme.colors.text;
    return (
      <MCButton
        key={layout.key}
        width={50}
        height={50}
        align="center"
        justify="center"
        onPress={() => this.onPressProfileIcon(layout, index)}
        style={{opacity: opacityArray[Math.abs(focusedIndex - index) % 3]}}>
        {layout.key === 'hydration' ? (
          <FaucetWhiteSvg size={size} color={color} />
        ) : layout.key === 'dreams' ? (
          <FutureSvg size={size} color={color} />
        ) : layout.key === 'meaning_life' ? (
          <SkullCowSvg size={size} color={color} />
        ) : layout.key === 'chronotype' ? (
          <MCIcon type="FontAwesome5Pro" name="bed" color={color} />
        ) : layout.key === 'triggers' ? (
          <SirenOnSvg size={size} color={color} />
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
    const {t, theme, profileLayout, showDrawer, visitedProfile} = this.props;
    const {focusedIndex} = this.state;
    return (
      <MCRootView justify="flex-start">
        <OvalGreenImage />
        <OvalYellowImage />
        <MCHeader
          hasBack={false}
          hasRight
          rightIcon="bars"
          title={t('profile_title')}
          onPressRight={() => showDrawer(true)}
        />
        <MCView row style={{flex: 1}}>
          <MCView width={335}>
            <FlatList
              ref={ref => (this.contentScroll = ref)}
              data={profileLayout}
              renderItem={this._renderProfileSections}
              keyExtractor={item => item.key}
              contentContainerStyle={{
                width: dySize(335),
                paddingHorizontal: dySize(15),
                paddingBottom: 200,
              }}
              viewabilityConfig={this.viewabilityConfig}
              onViewableItemsChanged={this.onViewableItemsChanged}
              onScrollToIndexFailed={info => {
                this.contentScroll.scrollToIndex({
                  animated: false,
                  index: info.highestMeasuredFrameIndex,
                });
                setTimeout(() => {
                  this.contentScroll.scrollToIndex({
                    animated: false,
                    index: focusedIndex,
                  });
                }, 1000);
              }}
            />
          </MCView>
          <MCView
            width={45}
            justify="center"
            row
            align="center"
            style={{height: '100%'}}>
            <MCView height={250}>
              <FlatList
                ref={ref => (this.iconScroll = ref)}
                data={profileLayout}
                renderItem={this.renderProfileIcon}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                  width: dySize(45),
                  paddingVertical: dySize(100),
                }}
              />
            </MCView>
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
            <UserLightSvg size={30} color={theme.colors.text} />
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
  triggers: selector.reflections.findMySpecialReflections(state, 'Triggers'),
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
