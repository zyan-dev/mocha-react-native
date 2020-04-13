import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCView, NativeCard} from 'components/styled/View';
import {H2, H3, H4, H5, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCSpeedoMeter} from 'components/common';

class PersonalityCard extends React.Component {
  static propTypes = {
    personality: PropTypes.arrayOf(Object),
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    personality: [],
    onPressEdit: () => undefined,
    editable: true,
  };

  render() {
    const {t, personality, onPressEdit, editable} = this.props;
    if (!personality.data) return null;
    return (
      <MCView align="center" mt={20}>
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_personality')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <MCView width={300}>
          <MCView row width={300} justify="space-between">
            <NativeCard width={140} pv={20} align="center" visible="visible">
              <MCSpeedoMeter
                width={120}
                value={personality.data.honest_humility}
              />
              <MCView height={40} justify="center">
                <H5 align="center" width={120}>
                  {t('personality_honest_humility')}
                </H5>
              </MCView>
            </NativeCard>
            <NativeCard width={140} pv={20} align="center" visible="visible">
              <MCSpeedoMeter
                width={120}
                value={personality.data.emotionality}
              />
              <MCView height={40} justify="center">
                <H5 align="center" width={120}>
                  {t('personality_emotionality')}
                </H5>
              </MCView>
            </NativeCard>
          </MCView>
          <MCView row width={300} justify="space-between">
            <NativeCard width={140} pv={20} align="center" visible="visible">
              <MCSpeedoMeter
                width={120}
                value={personality.data.extraversion}
              />
              <MCView height={40} justify="center">
                <H5 align="center" width={120}>
                  {t('personality_extraversion')}
                </H5>
              </MCView>
            </NativeCard>
            <NativeCard width={140} pv={20} align="center" visible="visible">
              <MCSpeedoMeter
                width={120}
                value={personality.data.agreeableness}
              />
              <MCView height={40} justify="center">
                <H5 align="center" width={120}>
                  {t('personality_agreeableness')}
                </H5>
              </MCView>
            </NativeCard>
          </MCView>
          <MCView row width={300} justify="space-between">
            <NativeCard width={140} pv={20} align="center" visible="visible">
              <MCSpeedoMeter
                width={120}
                value={personality.data.conscientiousness}
              />
              <MCView height={40} justify="center">
                <H5 align="center" width={120}>
                  {t('personality_conscientiousness')}
                </H5>
              </MCView>
            </NativeCard>
            <NativeCard width={140} pv={20} align="center" visible="visible">
              <MCSpeedoMeter
                width={120}
                value={personality.data.openness_to_experience}
              />
              <MCView height={40} justify="center">
                <H5 align="center" width={120}>
                  {t('personality_openness_to_experience')}
                </H5>
              </MCView>
            </NativeCard>
          </MCView>
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(PersonalityCard);
