import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selector} from 'Redux/selectors';
import {MCRootView, MCContent} from 'components/styled/View';
import {H3} from 'components/styled/Text';
import {MCHeader} from 'components/common';

class BehaviorPreferenceScreen extends React.Component {
  render() {
    const {t, myPersonalStory, feedbackPreference} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('tools_tab_behavior_preferences')} />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H3>{'coming soon'}</H3>
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
  connect(mapStateToProps, mapDispatchToProps)(BehaviorPreferenceScreen),
);
