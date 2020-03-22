import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {feedbackActions, routerActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
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
import NavigationService from 'navigation/NavigationService';
import {showAlert} from '../../../services/operators';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.profile.userToken.length > 0) {
      this.props.getMyFeedbacks();
    }
  }

  onPressAllValues = () => {
    NavigationService.navigate('TabAddValue');
    setTimeout(() => {
      NavigationService.navigate('Values');
    });
  };

  onPressAllPurposes = () => {};

  onPressAllGoals = () => {
    if (!this.props.profile.userToken) {
      showAlert('You need to sign up');
    } else {
      NavigationService.navigate('Goals');
    }
  };

  onPressAllUserManuals = () => {
    NavigationService.navigate('TabAddValue');
    setTimeout(() => {
      NavigationService.navigate('UserManuals');
    });
  };

  onPressNewFeedback = () => {
    if (!this.props.profile.userToken) {
      showAlert('You need to sign up');
    } else {
      NavigationService.navigate('TabAddValue');
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

  getProfileCompletePercentage = () => {
    const {
      profile: {
        user_id,
        name,
        avatar,
        neighborhood,
        namepronoun,
        bio,
        preferredtobecalled,
        preferredpronoun,
        email,
      },
    } = this.props;
    let percentage = 0;
    if (user_id.length) percentage += 20;
    if (name.length) percentage += 10;
    if (avatar.length) percentage += 10;
    if (neighborhood.length) percentage += 10;
    if (namepronoun.length) percentage += 10;
    if (bio.length) percentage += 10;
    if (preferredtobecalled.length) percentage += 10;
    if (preferredpronoun.length) percentage += 10;
    if (email.length) percentage += 10;
    return percentage;
  };

  render() {
    const {
      t,
      profile,
      manuals,
      goals,
      values,
      showDrawer,
      feedbacks,
      motivations,
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
            <MCView align="center" mt={20}>
              <AnimatedCircularProgress
                size={150}
                width={15}
                rotation={0}
                lineCap="round"
                fill={this.getProfileCompletePercentage()}
                duration={2000}
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875">
                {fill => (
                  <MCView align="center">
                    <H3 weight="bold">{Math.floor(fill)}%</H3>
                    <H4>Completed</H4>
                  </MCView>
                )}
              </AnimatedCircularProgress>
            </MCView>
            <ContactCard profile={profile} />
            <ValueAndPurpose
              values={values}
              onPressAllValues={() => this.onPressAllValues()}
              onPressAllPurposes={() => this.onPressAllPurposes()}
            />
            <MotivationCard
              motivations={motivations}
              onPressAllMotivations={() =>
                NavigationService.navigate('Motivations')
              }
            />
            <BeliefAndGoal
              manuals={manuals}
              goals={goals}
              onPressAllBeliefs={() => this.onPressAllUserManuals()}
              onPressAllGoals={() => this.onPressAllGoals()}
            />
            <ChronotypeAndPersonality
              onPressAllChronotypes={() =>
                NavigationService.navigate('Chronotype')
              }
              onPressAllPersonalities={() => this.onPressAllPersonalities()}
            />
            <SkillAndFeedback
              feedbacks={feedbacks}
              onPressAllSkills={() => this.onPressAllSkills()}
              onPressAllFeedbacks={() =>
                NavigationService.navigate('Feedbacks')
              }
              onPressNewFeedback={() => this.onPressNewFeedback()}
            />
            <QuirkAndTrigger
              onPressAllQuirks={() => this.onPressAllQuirks()}
              onPressAllTriggers={() => this.onPressAllTriggers()}
            />
            <AttachmentAndApproach
              onPressAllAttachments={() => this.onPressAllAttachments()}
              onPressAllApproaches={() => this.onPressAllApproaches()}
            />
            <LanguageAndRisk
              onPressAllLanguages={() => this.onPressAllLanguages()}
              onPressAllRisks={() => this.onPressAllRisks()}
            />
            <StressAndComfort
              onPressAllAnswers={() => this.onPressAllAnswers()}
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
  motivations: selector.reflections.getMyMotivations(state),
  feedbacks: selector.feedbacks.getMyFeedbacks(state).received,
});

const mapDispatchToProps = {
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ProfileScreen),
);
