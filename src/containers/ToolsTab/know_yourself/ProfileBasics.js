import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selector} from 'Redux/selectors';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {BasicProfileCards} from 'utils/constants';
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
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('tools_tab_profile_basic')} />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <ProfileBasicCard
            data={BasicProfileCards.personal}
            completed={myPersonalStory}
          />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard
              data={BasicProfileCards.feedback}
              completed={feedbackPreference}
              locked={!myPersonalStory}
            />
            <ProfileBasicCard
              data={BasicProfileCards.behavior}
              locked={!feedbackPreference}
              completed={behaviorPreference}
            />
          </MCView>
          <ProfileBasicCard
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
          />
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
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileBasicScreen),
);
