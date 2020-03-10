import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {feedbackActions, routerActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import BasicProfile from './cards/BasicProfile';
import ContactCard from './cards/ContactCard';
import ValueAndPurpose from './cards/ValueAndPurpose';
import MotivationCard from './cards/Motivation';
import BeliefAndGoal from './cards/BeliefAndGoal';
import ChronotypeAndPersonality from './cards/ChronotypeAndPersonality';
import SkillAndFeedback from './cards/SkillAndFeedback';
import QuickAndTrigger from './cards/QuickAndTrigger';
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
    const {t, showDrawer} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasBack={false}
          title={t('profile_headerTitle')}
          rightIcon="md-menu"
          onPressRight={() => showDrawer(true)}
        />
        <MCContent contentContainerStyle={{paddingBottom: 100}}>
          <MCView align="center">
            <BasicProfile />
            <ContactCard />
            <ValueAndPurpose />
            <MotivationCard />
            <BeliefAndGoal />
            <ChronotypeAndPersonality />
            <SkillAndFeedback />
            <QuickAndTrigger />
            <AttachmentAndApproach />
            <LanguageAndRisk />
            <StressAndComfort />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  userReflections: state.reflectionReducer.userReflectons,
  myReflections: state.reflectionReducer.myReflections,
});

const mapDispatchToProps = {
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ProfileScreen),
);
