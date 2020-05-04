import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import {BullhornSvg} from 'assets/svgs';
import {CoachingFeedbackOptions} from 'utils/constants';

class CoachingFeedbackCard extends React.Component {
  static propTypes = {
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
    coaching: PropTypes.object,
  };

  static defaultProps = {
    onPressEdit: () => undefined,
    coaching: {},
    editable: true,
  };

  render() {
    const {t, theme, coaching, editable, onPressEdit} = this.props;
    const options = _.get(coaching, ['data', 'options'], []);
    return (
      <MCView>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('tools_tab_coaching_feedback')}
            </H3>
            <BullhornSvg theme={theme} size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {options.length === 0 && (
          <MCCard align="center" width={300}>
            <MCEmptyText>
              {t('profile_card_empty_coaching_feedback')}
            </MCEmptyText>
          </MCCard>
        )}
        <MCView row wrap justify="space-between" width={300}>
          {options.length > 0 &&
            options.map(option => {
              const find = CoachingFeedbackOptions.find(i => i.key === option);
              if (!find) return null;
              return (
                <MCCard align="center" width={140} height={150} mt={15}>
                  <MCIcon type="FontAwesome5Pro" name={find.icon} />
                  <H4 weight="bold">
                    {t(`tools_tab_coaching_feedback_${option}`)}
                  </H4>
                  <H4 align="center">
                    {t(`tools_tab_coaching_feedback_${option}_description`)}
                  </H4>
                </MCCard>
              );
            })}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(CoachingFeedbackCard);
