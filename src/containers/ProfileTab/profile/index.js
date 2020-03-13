import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {feedbackActions, routerActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {selector} from 'Redux/selectors';
import BasicProfile from './cards/BasicProfile';
import ContactCard from './cards/ContactCard';
import ValueAndPurpose from './cards/ValueAndPurpose';
import MotivationCard from './cards/Motivation';
import BeliefAndGoal from './cards/BeliefAndGoal';
import ChronotypeAndPersonality from './cards/ChronotypeAndPersonality';
import SkillAndFeedback from './cards/SkillAndFeedback';
import QuirkAndTrigger from './cards/QuirkAndTrigger';
import AttachmentAndApproach from './cards/AttachmentAndApproach';
import LanguageAndRisk from './cards/LanguageAndRisk';
import StressAndComfort from './cards/StressAndComfort';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getMyFeedbacks();
  }

  render() {
    const {
      t,
      profile,
      manuals,
      goals,
      values,
      showDrawer,
      feedbacks,
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          hasBack={false}
          title={t('profile_headerTitle')}
          rightIcon="md-menu"
          onPressRight={() => showDrawer(true)}
        />
        <MCContent contentContainerStyle={{paddingBottom: 100}}>
          <MCView align="center">
            <BasicProfile profile={profile} />
            <ContactCard profile={profile} />
            <ValueAndPurpose
              values={values}
              onPressAllValues={() => console.log('Go to all values')}
              onPressAllPurposes={() => console.log('Go to all purposes')}
            />
            <MotivationCard
              onPressAllMotivations={() => console.log('Go to all motivations')}
            />
            <BeliefAndGoal
              manuals={manuals}
              goals={goals}
              onPressAllBeliefs={() => console.log('Go to all beliefs')}
              onPressAllGoals={() => console.log('Go to all goals')}
            />
            <ChronotypeAndPersonality
              onPressAllChronotypes={() => console.log('Go to all chronotypes')}
              onPressAllPersonalities={() =>
                console.log('Go to all personalities')
              }
            />
            <SkillAndFeedback
              feedbacks={feedbacks}
              onPressAllSkills={() => console.log('Go to all skills')}
              onPressAllFeedbacks={() => console.log('Go to all feedbacks')}
            />
            <QuirkAndTrigger
              onPressAllQuirks={() => console.log('Go to all quirks')}
              onPressAllTriggers={() => console.log('Go to all triggers')}
            />
            <AttachmentAndApproach
              onPressAllAttachments={() => console.log('Go to all attachments')}
              onPressAllApproaches={() => console.log('Go to all approaches')}
            />
            <LanguageAndRisk
              onPressAllLanguages={() => console.log('Go to all languages')}
              onPressAllRisks={() => console.log('Go to all risks')}
            />
            <StressAndComfort
              onPressAllAnswers={() => console.log('Go to all answers')}
            />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  goals: selector.reflections.getMyGoals(state),
  manuals: selector.reflections.getMyManuals(state),
  values: selector.reflections.getMyValues(state),
  feedbacks: selector.feedbacks.getMyFeedbacks(state).received,
});

const mapDispatchToProps = {
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ProfileScreen),
);
