import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import {selector} from 'Redux/selectors';
import {otherActions} from 'Redux/actions';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H2, H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCModal} from 'components/common';
import {ProfileBasicCards} from 'utils/constants';
import ProfileBasicCard from './components/ProfileBasicCard';
import {IceCreamSvg, HeadPhoneSvg} from 'assets/svgs';
import {getStringWithOutline} from 'services/operators';

class ProfileBasicScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcomeModal: false,
    };
  }
  question1 = {
    title: i18next.t('tools_tab_profile_basic_question_1', {
      bold: i18next.t('outline_values'),
    }),
    boldWordKeys: ['values'],
  };
  question2 = {
    title: i18next.t('tools_tab_profile_basic_question_2', {
      bold: i18next.t('outline_strengths'),
    }),
    boldWordKeys: ['strengths'],
  };
  question3 = {
    title: i18next.t('tools_tab_profile_basic_question_3', {
      bold: i18next.t('outline_peak'),
    }),
    boldWordKeys: ['peak'],
  };

  onCloseWelcomeModal = () => {
    this.props.checkWelcomeBasicProfile();
    this.setState({showWelcomeModal: false});
  };

  render() {
    const {
      t,
      theme,
      chronotype,
      nutrition,
      hydration,
      stress,
      strength,
      coreValues,
      dream,
      habit,
      showWelcomeBasicProfile,
      completedBasicProfile,
      checkCompletedBasicProfile,
    } = this.props;
    const {showWelcomeModal} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('tools_tab_profile_basic')}
          headerIcon={
            <MCIcon
              type="FontAwesome5Pro-Solid"
              name="chess-pawn-alt"
              size={50}
            />
          }
          hasRight
          rightIconType="FontAwesome5Pro"
          rightIcon="question-circle"
          onPressRight={() => this.setState({showWelcomeModal: true})}
        />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H3 underline mt={40}>
            {t('tools_tab_discover_your_values')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon type="FontAwesome5Pro" name="key" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.values}
            completed={coreValues}
            theme={theme}
          />

          <H3 underline mt={40}>
            {t('tools_tab_know_your_stregths')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon type="FontAwesome5Pro" name="hammer" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.strength}
            locked={!coreValues}
            completed={strength}
          />

          <H3 underline mt={40}>
            {t('tools_tab_your_future')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon type="FontAwesome5Pro" name="bullseye-arrow" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.dream}
            locked={!strength}
            completed={dream}
          />

          <H3 underline mt={20}>
            {t('tools_tab_peak_performance')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon type="FontAwesome5Pro" name="mountain" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.chronotype}
            completed={chronotype}
            theme={theme}
            locked={!dream}
          />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard
              data={ProfileBasicCards.nutrition}
              completed={nutrition}
              locked={!chronotype}
            />
            <ProfileBasicCard
              data={ProfileBasicCards.hydration}
              locked={!nutrition}
              completed={hydration}
            />
          </MCView>

          <H3 underline mt={40}>
            {t('tools_tab_somatic_awareness')}
          </H3>
          <MCView row align="center">
            <H3 mr={10}>{t('tools_tab_level_1')}</H3>
            <HeadPhoneSvg theme={theme} size={25} />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.stress}
            locked={!hydration}
            completed={stress}
          />

          <H3 underline mt={40}>
            {t('tools_tab_personal_development')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon name="ios-fitness" size={30} />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.habit}
            locked={!stress}
            completed={habit}
          />
        </MCContent>
        <MCModal
          hasCloseButton={false}
          isVisible={
            !completedBasicProfile &&
            chronotype &&
            nutrition &&
            hydration &&
            stress &&
            strength &&
            coreValues &&
            dream &&
            habit
          }>
          <MCView width={280} mt={20}>
            <MCView bordered br={15} align="center" pv={20} ph={20}>
              <IceCreamSvg theme={theme} size={70} />
              <H2 weight="bold">Excellent 👍</H2>
              <MCView row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  You've completed your
                  <H3 weight="bold"> Basic Profile </H3>
                  <MCIcon type="FontAwesome5Pro" name="chess-pawn" />
                  <H3> set up.</H3>
                </H3>
              </MCView>
              <MCView mt={20} row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  Check out the
                  <H3 weight="bold"> Profile Tab </H3>
                  <MCIcon type="FontAwesome5Pro" name="user-alt" />
                  <H3> to see all your data.</H3>
                </H3>
              </MCView>
              <MCView mt={20} row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  Next you can meet some other Mocha Community Members on the
                  <H3 weight="bold"> Social Tab </H3>
                  <MCIcon type="FontAwesome5Pro" name="users" />
                  <H3> or check out </H3>
                  <H3 weight="bold">Profile Advanced </H3>
                  <MCIcon type="FontAwesome5Pro" name="chess-knight" />
                </H3>
              </MCView>
              <MCButton
                bordered
                mt={20}
                width={80}
                align="center"
                onPress={() => checkCompletedBasicProfile()}>
                <H3>{t('I Got It')}</H3>
              </MCButton>
            </MCView>
          </MCView>
        </MCModal>
        <MCModal
          br={50}
          hasCloseButton={false}
          isVisible={
            (showWelcomeBasicProfile && !completedBasicProfile) ||
            showWelcomeModal
          }>
          <MCView width={280} mt={20} align="center">
            <MCView align="center" pv={40} ph={10} width={270}>
              <MCView row wrap align="center">
                <H4 underline>{t('welcome_profile_basic')}</H4>
                <MCIcon
                  type="FontAwesome5Pro-Solid"
                  name="chess-pawn-alt"
                  size={20}
                />
              </MCView>
              <H4 width={220} align="center" mt={20} mb={20}>
                {t('profile_basic_modal_title')}
              </H4>
              <MCView align="center">
                {getStringWithOutline(this.question1)}
                {getStringWithOutline(this.question2)}
                {getStringWithOutline(this.question3)}
              </MCView>
              <MCButton
                bordered
                mt={20}
                width={150}
                align="center"
                onPress={() => this.onCloseWelcomeModal()}>
                <H3>{t('welcome_reflectionpoints_buttons_continue')}</H3>
              </MCButton>
            </MCView>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  myPersonalStory: selector.reflections.findMySpecialReflections(
    state,
    'PersonalStory',
  ),
  feedbackPreference: selector.reflections.findMySpecialReflections(
    state,
    'FeedbackPreference',
  ),
  behaviorPreference: selector.reflections.findMySpecialReflections(
    state,
    'BehaviorPreference',
  ),
  riskTolerance: selector.reflections.findMySpecialReflections(
    state,
    'RiskTolerance',
  ),
  attachment: selector.reflections.findMySpecialReflections(
    state,
    'Attachment',
  ),
  approach: selector.reflections.findMySpecialReflections(state, 'Approach'),
  coreValues: selector.reflections.findMySpecialReflections(
    state,
    'CoreValues',
  ),
  stress: selector.reflections.findMySpecialReflections(
    state,
    'StressResponse',
  ),
  chronotype: selector.reflections.findMySpecialReflections(
    state,
    'Chronotype',
  ),
  habit: selector.reflections.findMySpecialReflections(state, 'Habit'),
  nutrition: selector.reflections.findMySpecialReflections(state, 'Nutrition'),
  hydration: selector.reflections.findMySpecialReflections(state, 'Hydration'),
  strength: selector.reflections.findMySpecialReflections(state, 'Strengths'),
  dream: selector.reflections.findMySpecialReflections(state, 'Dreams'),
  completedBasicProfile: state.otherReducer.completedBasicProfile,
  showWelcomeBasicProfile: state.otherReducer.showWelcomeBasicProfile,
});

const mapDispatchToProps = {
  checkCompletedBasicProfile: otherActions.checkCompletedBasicProfile,
  checkWelcomeBasicProfile: otherActions.checkWelcomeBasicProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileBasicScreen),
);
