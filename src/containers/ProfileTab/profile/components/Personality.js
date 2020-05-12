import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCView, NativeCard} from 'components/styled/View';
import {H2, H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCSpeedoMeter, MCIcon} from 'components/common';

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
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_personality')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {!personality.data ? (
          <MCButton
            width={300}
            align="center"
            bordered
            onPress={() => onPressEdit()}>
            {editable ? (
              <>
                <MCEmptyText>{t('profile_card_empty_personality')}</MCEmptyText>
                <MCEmptyText>
                  {t('profile_card_empty_personality_1')}
                </MCEmptyText>
              </>
            ) : (
              <MCEmptyText>
                {t('profile_card_empty_user_personality')}
              </MCEmptyText>
            )}
          </MCButton>
        ) : (
          <MCView width={300}>
            <MCView row width={300} justify="space-between">
              <NativeCard width={140} pv={20} align="center" visible="visible">
                <MCSpeedoMeter
                  width={120}
                  value={Number(personality.data.honest_humility)}
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
                  value={Number(personality.data.emotionality)}
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
                  value={Number(personality.data.extraversion)}
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
                  value={Number(personality.data.agreeableness)}
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
                  value={Number(personality.data.conscientiousness)}
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
                  value={Number(personality.data.openness_to_experience)}
                />
                <MCView height={40} justify="center">
                  <H5 align="center" width={120}>
                    {t('personality_openness_to_experience')}
                  </H5>
                </MCView>
              </NativeCard>
            </MCView>
          </MCView>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(PersonalityCard);
