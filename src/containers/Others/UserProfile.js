import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {
  profileActions,
  reflectionActions,
  feedbackActions,
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
import ObjectivesCard from '../ProfileTab/profile/components/Objectives';
import ChronotypeCard from '../ProfileTab/profile/components/Chronotype';
import PersonalityCard from '../ProfileTab/profile/components/Personality';
import StressAndComfortCard from '../ProfileTab/profile/components/StressAndComfort';
import RiskToleranceCard from '../ProfileTab/profile/components/RiskTolerance';
import FeedbacksCard from '../ProfileTab/profile/components/Feedbacks';
import QuirksCard from '../ProfileTab/profile/components/Quirks';
import TriggersCard from '../ProfileTab/profile/components/Triggers';
import AttachmentCard from '../ProfileTab/profile/components/Attachment';
import ApproachCard from '../ProfileTab/profile/components/Approach';
import FeedbackPreferenceCard from '../ProfileTab/profile/components/FeedbackPreference';
import BehaviorPreferenceCard from '../ProfileTab/profile/components/BehaviorPreference';
import NavigationService from 'navigation/NavigationService';
import {profileIcons} from 'utils/constants';
import {dySize} from 'utils/responsive';

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
    } = this.props;
    const find = allUsers.find(user => user._id === id);
    if (find) {
      getUserProfile(id);
      getUserReflections(id);
      getUserFeedbacks(id);
    } else {
      this.setState({unknownUser: true});
    }
  }

  onPressProfileIcon = icon => {
    this.setState({selected: icon.key});
  };

  onPressAllObjectives = tabIndex => {
    NavigationService.navigate('UserObjective', {
      id: this.props.profile._id,
      tabIndex,
    });
  };

  onPressHeaderAvatar = () => {
    this.setState({showAvatarModal: true});
  };

  render() {
    const {selected, unknownUser, showAvatarModal} = this.state;
    const {
      t,
      theme,
      profile,
      manuals,
      values,
      feedbacks,
      motivations,
      chronotype,
      personality,
      dailyObjectives,
      weeklyObjectives,
      feedbackPreference,
      behaviorPreference,
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
          title={t('other_profile_page_headerText')}
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
              {selected === 'value' && (
                <ValuesCard values={values} editable={false} />
              )}
              {selected === 'purpose' && <PurposesCard editable={false} />}
              {selected === 'motivation' && (
                <MotivationCard motivations={motivations} editable={false} />
              )}
              {selected === 'languages' && <LanguagesCard editable={false} />}
              {selected === 'skill' && <SkillsCard editable={false} />}
              {selected === 'belief' && (
                <UserManualsCard manuals={manuals} editable={false} />
              )}
              {selected === 'objective' && (
                <ObjectivesCard
                  editable={false}
                  dailyObjectives={dailyObjectives}
                  weeklyObjectives={weeklyObjectives}
                  onPressAllDaily={() => this.onPressAllObjectives(0)}
                  onPressAllWeekly={() => this.onPressAllObjectives(1)}
                />
              )}
              {selected === 'chronotype' && (
                <ChronotypeCard chronotype={chronotype} editable={false} />
              )}
              {selected === 'personality' && (
                <PersonalityCard personality={personality} editable={false} />
              )}
              {selected === 'stress' && (
                <StressAndComfortCard editable={false} />
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
              {profileIcons.map(icon => (
                <MCButton
                  key={icon.key}
                  width={50}
                  align="center"
                  onPress={() => this.onPressProfileIcon(icon)}>
                  <MCIcon
                    type={icon.iconType}
                    name={icon.icon}
                    size={selected === icon.key ? 30 : 20}
                    color={
                      selected === icon.key
                        ? theme.colors.outline
                        : theme.colors.text
                    }
                  />
                </MCButton>
              ))}
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
  goals: selector.reflections.getUserSpecialReflections(state, 'Goal'),
  manuals: selector.reflections.getUserSpecialReflections(state, 'Manual'),
  values: selector.reflections.getUserSpecialReflections(state, 'Value'),
  feedbacks: selector.feedbacks.getUserFeedbacks(state).received,
  motivations: selector.reflections.getUserSpecialReflections(
    state,
    'Motivation',
  ),
  chronotype: selector.reflections.findUserSpecialReflections(
    state,
    'Chronotype',
  ),
  personality: selector.reflections.findUserSpecialReflections(
    state,
    'Personality',
  ),
  dailyObjectives: selector.reflections
    .getUserSpecialReflections(state, 'Objective')
    .filter(({data}) => data.isDaily),
  weeklyObjectives: selector.reflections
    .getUserSpecialReflections(state, 'Objective')
    .filter(({data}) => !data.isDaily),
  feedbackPreference: selector.reflections.findUserSpecialReflections(
    state,
    'FeedbackPreference',
  ),
  behaviorPreference: selector.reflections.findUserSpecialReflections(
    state,
    'BehaviorPreference',
  ),
});

const mapDispatchToProps = {
  getUserProfile: profileActions.getUserProfile,
  getUserReflections: reflectionActions.getUserReflections,
  getUserFeedbacks: feedbackActions.getUserFeedbacks,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserProfileScreen),
);
