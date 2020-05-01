import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCIcon} from 'components/common';
import {
  PositiveFeedbackPreferences,
  NegativeFeedbackPreferences,
} from 'utils/constants';

class FeedbackPreferenceCard extends React.Component {
  static propTypes = {
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
    feedbackPreference: PropTypes.object,
  };

  static defaultProps = {
    onPressEdit: () => undefined,
    feedbackPreference: {},
    editable: true,
  };

  _renderItem = ({item}) => {
    const feedback = item;
    return (
      <MCCard width={140} mr={15} align="center" mb={10}>
        <MCButton
          key={feedback._id}
          align="center"
          onPress={() => this.onPressItem(feedback)}>
          <MCImage
            round
            width={100}
            height={100}
            image={{uri: feedback.receiver.avatar}}
            type="avatar"
          />
          <H4 align="center" numberOfLines={3} width={120}>
            {feedback.question}
          </H4>
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, feedbackPreference, editable, onPressEdit} = this.props;
    return (
      <MCView>
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_feedback_preference')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <H4 mb={10} underline>
          {t('profile_negative_feedback')}
        </H4>
        <MCView row wrap justify="space-between" style={{width: '100%'}}>
          {_.get(feedbackPreference, ['data', 'negative'], []).map(feedback => {
            if (NegativeFeedbackPreferences.indexOf(feedback) < 0) return null;
            return (
              <MCView
                bordered
                br={10}
                width={140}
                height={80}
                ph={20}
                mb={10}
                align="center"
                justify="center">
                <H4 align="center">{t(`feedback_preference_${feedback}`)}</H4>
              </MCView>
            );
          })}
        </MCView>
        <H4 mb={10} underline>
          {t('profile_positive_feedback')}
        </H4>
        <MCView row wrap justify="space-between" style={{width: '100%'}}>
          {_.get(feedbackPreference, ['data', 'positive'], []).map(feedback => {
            if (PositiveFeedbackPreferences.indexOf(feedback) < 0) return null;
            return (
              <MCView
                bordered
                br={10}
                width={140}
                height={80}
                ph={20}
                mb={10}
                align="center"
                justify="center">
                <H4 align="center">{t(`feedback_preference_${feedback}`)}</H4>
              </MCView>
            );
          })}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(FeedbackPreferenceCard);
