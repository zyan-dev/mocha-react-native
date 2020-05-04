import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {
  profileActions,
  reflectionActions,
  feedbackActions,
  otherActions,
} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H2, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCImage, MCModal, MCIcon} from 'components/common';
import {selector} from 'Redux/selectors';
import OverviewCard from '../ProfileTab/profile/components/Overview';
import ContactCard from '../ProfileTab/profile/components/Contact';
import ValuesCard from '../ProfileTab/profile/components/Values';
import PurposesCard from '../ProfileTab/profile/components/Purposes';
import MotivationCard from '../ProfileTab/profile/components/Motivations';
import LanguagesCard from '../ProfileTab/profile/components/Languages';
import SkillsCard from '../ProfileTab/profile/components/Skills';
import UserManualsCard from '../ProfileTab/profile/components/UserManuals';
import HabitCard from '../ProfileTab/profile/components/habits';
import DreamCard from '../ProfileTab/profile/components/Dream';
import CoreValuesCard from '../ProfileTab/profile/components/CoreValues';
import ChronotypeCard from '../ProfileTab/profile/components/Chronotype';
import PersonalityCard from '../ProfileTab/profile/components/Personality';
import StressAndComfortCard from '../ProfileTab/profile/components/StressAndComfort';
import RiskToleranceCard from '../ProfileTab/profile/components/RiskTolerance';
import FeedbacksCard from '../ProfileTab/profile/components/Feedbacks';
import QuirksCard from '../ProfileTab/profile/components/Quirks';
import TriggersCard from '../ProfileTab/profile/components/Triggers';
import AttachmentCard from '../ProfileTab/profile/components/Attachment';
import ApproachCard from '../ProfileTab/profile/components/Approach';
import CoachingFeedbackCard from '../ProfileTab/profile/components/FeedbackCoaching';
import CriticismFeedbackCard from '../ProfileTab/profile/components/FeedbackCriticism';
import PraiseFeedbackCard from '../ProfileTab/profile/components/FeedbackPraise';
import QualitiesBehaviorCard from '../ProfileTab/profile/components/BehaviorQualities';
import ChallengesBehaviorCard from '../ProfileTab/profile/components/BehaviorChallenges';
import NutritionCard from '../ProfileTab/profile/components/Nutrition';
import HydrationCard from '../ProfileTab/profile/components/Hydration';
import NavigationService from 'navigation/NavigationService';
import {profileIcons} from 'utils/constants';
import {dySize} from 'utils/responsive';
import {FaucetWhiteSvg, FutureSvg} from 'assets/svgs';

class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unknownUser: false,
      selected: 'overview',
      showAvatarModal: false,
    };
  }

  componentDidMount() {
    const {id} = this.props.route.params;
    const {
      allUsers,
      getUserProfile,
      getUserReflections,
      getUserFeedbacks,
      getUserCommits,
    } = this.props;
    const find = allUsers.find(user => user._id === id);
    if (find) {
      getUserProfile(id);
      getUserReflections(id);
      getUserFeedbacks(id);
      getUserCommits(id);
    } else {
      this.setState({unknownUser: true});
    }
  }

  onPressProfileIcon = icon => {
    this.setState({selected: icon.key});
  };

  onPressAllHabits = tabIndex => {
    NavigationService.navigate('UserHabit', {
      id: this.props.profile._id,
      tabIndex,
    });
  };

  onPressHeaderAvatar = () => {
    this.setState({showAvatarModal: true});
  };

  renderProfileIcon = icon => {
    const {selected} = this.state;
    const {theme} = this.props;
    const focused = selected === icon.key;
    const size = focused ? 30 : 20;
    const color = focused ? theme.colors.outline : theme.colors.text;
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
    const {selected, unknownUser, showAvatarModal} = this.state;
    const {
      t,
      theme,
      profile,
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
      commits,
    } = this.props;
    if (unknownUser) {
      return (
        <MCRootView justify="flex-start">
          <MCHeader />
          <MCView align="center" mt={50}>
            <H2 align="center">{t('unknown_user_displayText')}</H2>
          </MCView>
        </MCRootView>
      );
    }
    if (!profile.user_id) {
      return <MCRootView justify="flex-start" />;
    }
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={profile.name}
          hasRight={selected !== 'overview'}
          rightImage={
            <MCImage
              image={{uri: profile.avatar}}
              round
              width={40}
              height={40}
            />
          }
          onPressRight={() => this.onPressHeaderAvatar()}
        />
        <MCView row style={{flex: 1}}>
          <MCView width={325}>
            <MCContent
              style={{width: dySize(325)}}
              contentContainerStyle={{padding: dySize(10)}}>
              {selected === 'overview' && (
                <OverviewCard profile={profile} editable={false} />
              )}
              {selected === 'contact' && (
                <ContactCard profile={profile} editable={false} />
              )}
              {selected === 'chronotype' && (
                <ChronotypeCard
                  theme={theme}
                  chronotype={chronotype}
                  editable={false}
                />
              )}
              {selected === 'nutrition' && (
                <NutritionCard editable={false} nutrition={nutrition} />
              )}
              {selected === 'hydration' && (
                <HydrationCard
                  theme={theme}
                  editable={false}
                  hydration={hydration}
                />
              )}
              {selected === 'stress' && (
                <StressAndComfortCard
                  stress={stress}
                  theme={theme}
                  editable={false}
                />
              )}
              {selected === 'skill' && (
                <SkillsCard strength={strength} editable={false} />
              )}
              {selected === 'core_values' && (
                <CoreValuesCard
                  theme={theme}
                  coreValues={coreValues}
                  editable={false}
                />
              )}
              {selected === 'dream' && (
                <DreamCard dream={dream} editable={false} />
              )}
              {selected === 'habit' && (
                <HabitCard
                  commits={commits}
                  editable={false}
                  dailyHabits={dailyHabits}
                  weeklyHabits={weeklyHabits}
                  theme={theme}
                />
              )}
              {selected === 'coaching_feedback' && (
                <CoachingFeedbackCard
                  coaching={coaching}
                  theme={theme}
                  editable={false}
                />
              )}
              {selected === 'criticism_feedback' && (
                <CriticismFeedbackCard
                  criticism={criticism}
                  theme={theme}
                  editable={false}
                />
              )}
              {selected === 'praise_feedback' && (
                <PraiseFeedbackCard
                  praise={praise}
                  theme={theme}
                  editable={false}
                />
              )}
              {selected === 'qualities_character' && (
                <QualitiesBehaviorCard
                  qualities={qualities}
                  theme={theme}
                  editable={false}
                />
              )}
              {selected === 'challenges_concerns' && (
                <ChallengesBehaviorCard
                  challenges={challenges}
                  editable={false}
                />
              )}
              {selected === 'value' && (
                <ValuesCard values={values} editable={false} />
              )}
              {selected === 'purpose' && <PurposesCard editable={false} />}
              {selected === 'motivation' && (
                <MotivationCard motivations={motivations} editable={false} />
              )}
              {selected === 'languages' && <LanguagesCard editable={false} />}

              {selected === 'belief' && (
                <UserManualsCard manuals={manuals} editable={false} />
              )}

              {selected === 'personality' && (
                <PersonalityCard personality={personality} editable={false} />
              )}

              {selected === 'risk' && <RiskToleranceCard editable={false} />}
              {selected === 'feedback' && (
                <FeedbacksCard feedbacks={feedbacks} editable={false} />
              )}
              {selected === 'quirk' && <QuirksCard editable={false} />}
              {selected === 'trigger' && <TriggersCard editable={false} />}
              {selected === 'attachment' && <AttachmentCard editable={false} />}
              {selected === 'approach' && <ApproachCard editable={false} />}
              {selected === 'feedback_preference' && (
                <FeedbackPreferenceCard
                  feedbackPreference={feedbackPreference}
                  editable={false}
                />
              )}
              {selected === 'behavior_preference' && (
                <BehaviorPreferenceCard
                  behaviorPreference={behaviorPreference}
                  editable={false}
                />
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
          isVisible={showAvatarModal}
          onClose={() => this.setState({showAvatarModal: false})}>
          <MCView align="center" width={280} mt={20}>
            <MCImage
              image={{uri: profile.avatar}}
              round
              width={200}
              height={200}
            />
            <H4>{profile.name}</H4>
            <H5 color={theme.colors.border}>{`@${profile.user_id}`}</H5>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.usersReducer.userProfile,
  allUsers: state.usersReducer.allUsers,
  chronotype: selector.reflections.findUserSpecialReflections(
    state,
    'Chronotype',
  ),
  nutrition: selector.reflections.findUserSpecialReflections(
    state,
    'Nutrition',
  ),
  hydration: selector.reflections.findUserSpecialReflections(
    state,
    'Hydration',
  ),
  stress: selector.reflections.findUserSpecialReflections(
    state,
    'StressResponse',
  ),
  strength: selector.reflections.findUserSpecialReflections(state, 'Strengths'),
  coreValues: selector.reflections.findUserSpecialReflections(
    state,
    'CoreValues',
  ),
  dream: selector.reflections.findUserSpecialReflections(state, 'Dreams'),
  dailyHabits: selector.reflections
    .getUserSpecialReflections(state, 'Habit')
    .filter(({data}) => data.isDaily),
  weeklyHabits: selector.reflections
    .getUserSpecialReflections(state, 'Habit')
    .filter(({data}) => !data.isDaily),
  goals: selector.reflections.getUserSpecialReflections(state, 'Goal'),
  manuals: selector.reflections.getUserSpecialReflections(state, 'Manual'),
  values: selector.reflections.getUserSpecialReflections(state, 'Value'),
  feedbacks: selector.feedbacks.getUserFeedbacks(state).received,
  motivations: selector.reflections.getUserSpecialReflections(
    state,
    'Motivation',
  ),
  personality: selector.reflections.findUserSpecialReflections(
    state,
    'Personality',
  ),
  coaching: selector.reflections.findUserSpecialReflections(
    state,
    'CoachingFeedback',
  ),
  criticism: selector.reflections.findUserSpecialReflections(
    state,
    'CriticismFeedback',
  ),
  praise: selector.reflections.findUserSpecialReflections(
    state,
    'PraiseFeedback',
  ),
  qualities: selector.reflections.findUserSpecialReflections(
    state,
    'Qualities',
  ),
  challenges: selector.reflections.findUserSpecialReflections(
    state,
    'Challenges',
  ),
  commits: state.otherReducer.commits,
});

const mapDispatchToProps = {
  getUserProfile: profileActions.getUserProfile,
  getUserReflections: reflectionActions.getUserReflections,
  getUserFeedbacks: feedbackActions.getUserFeedbacks,
  getUserCommits: otherActions.getUserCommits,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserProfileScreen),
);
