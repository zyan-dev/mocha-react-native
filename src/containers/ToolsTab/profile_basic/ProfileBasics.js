import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selector} from 'Redux/selectors';
import {otherActions} from 'Redux/actions';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H2, H3, H4, MCText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCModal} from 'components/common';
import {ProfileBasicCards} from 'utils/constants';
import ProfileBasicCard from './components/ProfileBasicCard';
import {IceCreamSvg} from 'assets/svgs';

class ProfileBasicScreen extends React.Component {
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
      completedBasicProfile,
      checkedCompletedBasicProfile,
    } = this.props;
    console.log({completedBasicProfile});
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('tools_tab_profile_basic')}
          headerIcon={
            <MCIcon type="FontAwesome5Pro" name="chess-pawn" size={30} />
          }
        />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H4 width={340} align="center" weight="italic">
            {t('profile_basic_title_top')}
          </H4>
          <H4 width={340} align="center">
            {t('profile_basic_title_bottom')}
          </H4>

          <H3 underline mt={40}>
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
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon type="FontAwesome5Pro" name="bone" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.stress}
            locked={!hydration}
            completed={stress}
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
            locked={!stress}
            completed={strength}
          />

          <H3 underline mt={40}>
            {t('tools_tab_discover_your_values')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon type="FontAwesome5Pro" name="key" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.values}
            locked={!stress}
            completed={coreValues}
            theme={theme}
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
            locked={!coreValues}
            completed={dream}
          />

          <H3 underline mt={40}>
            {t('tools_tab_personal_development')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon name="ios-fitness" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.habit}
            locked={!dream}
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
                onPress={() => checkedCompletedBasicProfile()}>
                <H3>{t('I Got It')}</H3>
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
  stress: selector.reflections.findMySpecialReflections(state, 'Stress'),
  chronotype: selector.reflections.findMySpecialReflections(
    state,
    'Chronotype',
  ),
  habit: selector.reflections.findMySpecialReflections(state, 'Habit'),
  nutrition: selector.reflections.findMySpecialReflections(state, 'Nutrition'),
  hydration: selector.reflections.findMySpecialReflections(state, 'Hydration'),
  strength: selector.reflections.findMySpecialReflections(state, 'Strength'),
  dream: selector.reflections.findMySpecialReflections(state, 'Dream'),
  completedBasicProfile: state.otherReducer.completedBasicProfile,
});

const mapDispatchToProps = {
  checkedCompletedBasicProfile: otherActions.checkedCompletedBasicProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileBasicScreen),
);
