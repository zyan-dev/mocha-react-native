import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import {AwardSvg} from 'assets/svgs';
import {PositiveFeedbackPreferences} from 'utils/constants';

class PraiseFeedbackCard extends React.Component {
  static propTypes = {
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
    praise: PropTypes.object,
  };

  static defaultProps = {
    onPressEdit: () => undefined,
    praise: {},
    editable: true,
  };

  render() {
    const {t, praise, editable, onPressEdit} = this.props;
    const options = _.get(praise, ['data', 'options'], []);
    return (
      <MCView mt={30}>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_praise_feedback')}
            </H3>
            <AwardSvg size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {options.length === 0 && (
          <MCCard align="center" width={300}>
            <MCEmptyText>{t('profile_card_empty_praise_feedback')}</MCEmptyText>
          </MCCard>
        )}
        {options.length > 0 && (
          <H4 mr={10}>{t('profile_card_praise_feedback_description')}</H4>
        )}
        <MCView row wrap justify="space-between" width={300}>
          {options.length > 0 &&
            options.map(option => {
              const index = PositiveFeedbackPreferences.indexOf(option);
              if (index < 0) return null;
              return (
                <MCView
                  bordered
                  br={10}
                  width={140}
                  height={80}
                  align="center"
                  justify="center"
                  mt={15}
                  ph={10}>
                  <H4 align="center">{t(`feedback_preference_${option}`)}</H4>
                </MCView>
              );
            })}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(PraiseFeedbackCard);
