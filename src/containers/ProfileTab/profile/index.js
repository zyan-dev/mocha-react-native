import React from 'react';
import {connect} from 'react-redux';
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
import PurposesCard from './components/Purposes';
import MotivationCard from './components/Motivations';
import LanguagesCard from './components/Languages';
import SkillsCard from './components/Skills';
import UserManualsCard from './components/UserManuals';
import ObjectivesCard from './components/Objectives';
import ChronotypeCard from './components/Chronotype';
import PersonalityCard from './components/Personality';
import StressAndComfortCard from './components/StressAndComfort';
import RiskToleranceCard from './components/RiskTolerance';
import FeedbacksCard from './components/Feedbacks';
import QuirksCard from './components/Quirks';
import TriggersCard from './components/Triggers';
import AttachmentCard from './components/Attachment';
import ApproachCard from './components/Approach';
import FeedbackPreferenceCard from './components/FeedbackPreference';
import BehaviorPreferenceCard from './components/BehaviorPreference';
import NavigationService from 'navigation/NavigationService';
import {showAlert} from 'services/operators';
import {profileIcons} from 'utils/constants';
import {dySize} from 'utils/responsive';
import {getStringWithOutline} from '../../../services/operators';
import i18next from 'i18next';

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

  onPressAllObjectives = tabIndex => {
    if (!this.props.profile.userToken) {
      showAlert('You need to sign up');
    } else {
      NavigationService.navigate('Objectives', {tabIndex});
    }
  };

  onPressNewObjective = () => {
    this.props.setInitialReflection('objective');
    NavigationService.navigate('EditObjective');
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
    console.log({icon});
    this.props.changeProfileTab(icon.key);
  };

  onCloseWelcomeModal = () => {
    this.props.visitProfileTab();
    this.setState({showWelcomeModal: false});
  };

  render() {
    const {
      t,
      theme,
      profile,
      profileTab,
      values,
      showDrawer,
      feedbacks,
      motivations,
      manuals,
      chronotype,
      personality,
      dailyObjectives,
      weeklyObjectives,
      feedbackPreference,
      behaviorPreference,
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
              {profileTab === 'value' && (
                <ValuesCard
                  values={values}
                  onPressDetails={() => this.onPressAllValues()}
                  onPressNew={() => this.onPressNewValue()}
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
              {profileTab === 'skill' && (
                <SkillsCard onPressDetails={() => {}} />
              )}
              {profileTab === 'belief' && (
                <UserManualsCard
                  manuals={manuals}
                  onPressDetails={() => this.onPressAllUserManuals()}
                  onPressNew={() => this.onPressNewUserManual()}
                />
              )}
              {profileTab === 'objective' && (
                <ObjectivesCard
                  dailyObjectives={dailyObjectives}
                  weeklyObjectives={weeklyObjectives}
                  onPressAllDaily={() => this.onPressAllObjectives(0)}
                  onPressAllWeekly={() => this.onPressAllObjectives(1)}
                  onPressNew={() => this.onPressNewObjective()}
                />
              )}
              {profileTab === 'chronotype' && (
                <ChronotypeCard
                  chronotype={chronotype}
                  onPressEdit={() => NavigationService.navigate('Chronotype')}
                />
              )}
              {profileTab === 'personality' && (
                <PersonalityCard
                  personality={personality}
                  onPressEdit={() => NavigationService.navigate('Personality')}
                />
              )}
              {profileTab === 'stress' && (
                <StressAndComfortCard onPressEdit={() => {}} />
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
              {selected === 'feedback_preference' && (
                <FeedbackPreferenceCard
                  feedbackPreference={feedbackPreference}
                  onPressEdit={() =>
                    NavigationService.navigate('FeedbackPreference')
                  }
                />
              )}
              {selected === 'behavior_preference' && (
                <BehaviorPreferenceCard
                  behaviorPreference={behaviorPreference}
                  onPressEdit={() =>
                    NavigationService.navigate('BehaviorPreference')
                  }
                />
              )}
            </MCContent>
          </MCView>
          <MCView
            width={50}
            style={{borderLeftWidth: 1, borderColor: theme.colors.border}}>
            <MCContent>
              {profileIcons.map(icon => {
                if (icon.signinRequired && !profile.userToken.length)
                  return null;
                return (
                  <MCButton
                    key={icon.key}
                    width={50}
                    align="center"
                    onPress={() => this.onPressProfileIcon(icon)}>
                    <MCIcon
                      type={icon.iconType}
                      name={icon.icon}
                      size={profileTab === icon.key ? 30 : 20}
                      color={
                        profileTab === icon.key
                          ? theme.colors.outline
                          : theme.colors.text
                      }
                    />
                  </MCButton>
                );
              })}
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
  manuals: selector.reflections.getMySpecialReflections(state, 'Manual'),
  values: selector.reflections.getMySpecialReflections(state, 'Value'),
  dailyObjectives: selector.reflections
    .getMySpecialReflections(state, 'Objective')
    .filter(({data}) => data.isDaily),
  weeklyObjectives: selector.reflections
    .getMySpecialReflections(state, 'Objective')
    .filter(({data}) => !data.isDaily),
  manuals: selector.reflections.getMySpecialReflections(state, 'Manual'),
  motivations: selector.reflections.getMySpecialReflections(
    state,
    'Motivation',
  ),
  feedbacks: selector.feedbacks.getMyFeedbacks(state).received,
  chronotype: selector.reflections.findMySpecialReflections(
    state,
    'Chronotype',
  ),
  personality: selector.reflections.findMySpecialReflections(
    state,
    'Personality',
  ),
  feedbackPreference: selector.reflections.findMySpecialReflections(
    state,
    'FeedbackPreference',
  ),
  behaviorPreference: selector.reflections.findMySpecialReflections(
    state,
    'BehaviorPreference',
  ),
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
