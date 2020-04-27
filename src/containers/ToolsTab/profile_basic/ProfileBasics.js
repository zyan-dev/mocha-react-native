import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selector} from 'Redux/selectors';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCHeader, MCIcon} from 'components/common';
import {ProfileBasicCards} from 'utils/constants';
import ProfileBasicCard from './components/ProfileBasicCard';

class ProfileBasicScreen extends React.Component {
  render() {
    const {
      t,
      myPersonalStory,
      feedbackPreference,
      behaviorPreference,
      riskTolerance,
      attachment,
      approach,
      coreValues,
      stress,
      chronotype,
      habit,
      nutrition,
      hydration,
      strength,
      future,
    } = this.props;
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
          />

          <H3 underline mt={40}>
            {t('tools_tab_your_future')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_1')}</H3>
            <MCIcon type="FontAwesome5Pro" name="bullseye-arrow" />
          </MCView>
          <ProfileBasicCard
            data={ProfileBasicCards.future}
            locked={!coreValues}
            completed={future}
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
            locked={!future}
            completed={habit}
          />
          {/* <ProfileBasicCard
            data={BasicProfileCards.risk}
            locked={!behaviorPreference}
            completed={riskTolerance}
          />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard
              data={BasicProfileCards.attach}
              locked={!riskTolerance}
              completed={attachment}
            />
            <ProfileBasicCard
              data={BasicProfileCards.approach}
              completed={approach}
              locked={!attachment}
            />
          </MCView>
          <ProfileBasicCard
            data={BasicProfileCards.values_and_judgements}
            completed={coreValues}
            locked={!approach}
          />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard
              data={BasicProfileCards.body}
              locked={!coreValues}
              completed={stress}
            />
            <ProfileBasicCard
              data={BasicProfileCards.chronotype}
              locked={!stress}
              completed={chronotype}
            />
          </MCView>
          <ProfileBasicCard
            completed={habit}
            data={BasicProfileCards.goal}
            locked={!chronotype}
          /> */}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
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
  future: selector.reflections.findMySpecialReflections(state, 'Future'),
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileBasicScreen),
);
