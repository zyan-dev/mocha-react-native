import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selector} from 'Redux/selectors';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {MCHeader, MCImage} from 'components/common';
import {BasicProfileCards} from 'utils/constants';
import ProfileBasicCard from './components/ProfileBasicCard';

class ProfileBasicScreen extends React.Component {
  render() {
    const {t, myPersonalStory, feedbackPreference} = this.props;
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
            />
          </MCView>
          <ProfileBasicCard data={BasicProfileCards.risk} locked />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard data={BasicProfileCards.attach} locked />
            <ProfileBasicCard data={BasicProfileCards.approach} locked />
          </MCView>
          <ProfileBasicCard
            data={BasicProfileCards.values_and_judgements}
            locked
          />
          <ProfileBasicCard data={BasicProfileCards.body} locked />
          <ProfileBasicCard data={BasicProfileCards.goal} locked />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  myPersonalStory: selector.reflections.findMySpecialReflections(
    state,
    'PersonalStory',
  ),
  feedbackPreference: selector.reflections.findMySpecialReflections(
    state,
    'FeedbackPreference',
  ),
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ProfileBasicScreen),
);
