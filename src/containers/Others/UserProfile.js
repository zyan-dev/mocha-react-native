import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {
  profileActions,
  reflectionActions,
  feedbackActions,
} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H2} from 'components/styled/Text';
import {MCHeader} from 'components/common';
import {selector} from 'Redux/selectors';
import BasicProfile from '../ProfileTab/profile/cards/BasicProfile';
import ContactCard from '../ProfileTab/profile/cards/ContactCard';
import ValueAndPurpose from '../ProfileTab/profile/cards/ValueAndPurpose';
import MotivationCard from '../ProfileTab/profile/cards/Motivation';
import BeliefAndObjective from '../ProfileTab/profile/cards/BeliefAndObjective';
import ChronotypeAndPersonality from '../ProfileTab/profile/cards/ChronotypeAndPersonality';
import SkillAndFeedback from '../ProfileTab/profile/cards/SkillAndFeedback';
import QuirkAndTrigger from '../ProfileTab/profile/cards/QuirkAndTrigger';
import AttachmentAndApproach from '../ProfileTab/profile/cards/AttachmentAndApproach';
import LanguageAndRisk from '../ProfileTab/profile/cards/LanguageAndRisk';
import StressAndComfort from '../ProfileTab/profile/cards/StressAndComfort';
import NavigationService from 'navigation/NavigationService';

class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unknownUser: false,
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
    const find = allUsers.find((user) => user._id === id);
    if (find) {
      getUserProfile(id);
      getUserReflections(id);
      getUserFeedbacks(id);
    } else {
      this.setState({unknownUser: true});
    }
  }

  render() {
    const {id} = this.props.route.params;
    const {
      t,
      allUsers,
      profile,
      manuals,
      goals,
      values,
      feedbacks,
      motivations,
      chronotype,
      personality,
      dailyObjectives,
      weeklyObjectives,
    } = this.props;
    const find = allUsers.find((user) => user._id === id);
    console.log('User Chronotype', chronotype);
    if (!find) {
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
        <MCHeader title={t('other_profile_page_headerText')} />
        <MCContent contentContainerStyle={{paddingBottom: 100}}>
          <MCView align="center">
            <BasicProfile profile={profile} editable={false} />
            <ContactCard profile={profile} editable={false} />
            <ValueAndPurpose values={values} />
            <MotivationCard motivations={motivations} />
            <BeliefAndObjective
              onPressAllObjectives={() =>
                NavigationService.navigate('UserObjective', {id: profile._id})
              }
              manuals={manuals}
              dailyObjectives={dailyObjectives}
              weeklyObjectives={weeklyObjectives}
            />
            <ChronotypeAndPersonality
              chronotype={chronotype}
              personality={personality}
            />
            <SkillAndFeedback feedbacks={feedbacks} />
            <QuirkAndTrigger />
            <AttachmentAndApproach />
            <LanguageAndRisk />
            <StressAndComfort />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
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
});

const mapDispatchToProps = {
  getUserProfile: profileActions.getUserProfile,
  getUserReflections: reflectionActions.getUserReflections,
  getUserFeedbacks: feedbackActions.getUserFeedbacks,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen),
);
