import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCView, NativeCard} from 'components/styled/View';
import {
  H2,
  H3,
  H4,
  H5,
  MCText,
  MCIcon,
  MCEmptyText,
} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCTimeSlider} from 'components/common';
import {
  MorningLarkIcon,
  FlexibleIcon,
  NightimeIcon,
  DaytimeIcon,
} from 'assets/images';
import {dySize} from 'utils/responsive';
import {NightSliderValues, DaySliderValues} from 'utils/constants';

const chronotypeIcons = {
  morning: MorningLarkIcon,
  flexible: FlexibleIcon,
  night: NightimeIcon,
};

class ChronotypeCard extends React.Component {
  static propTypes = {
    chronotype: PropTypes.Object,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    chronotype: {},
    onPressEdit: () => undefined,
    editable: true,
  };

  render() {
    const {t, chronotype, onPressEdit, editable} = this.props;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_chronotype')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {!chronotype || !chronotype.data ? (
          <MCButton
            width={300}
            align="center"
            bordered
            onPress={() => onPressEdit()}>
            {editable ? (
              <>
                <MCEmptyText>{t('profile_card_empty_chronotype')}</MCEmptyText>
                <MCEmptyText>
                  {t('profile_card_empty_chronotype_1')}
                </MCEmptyText>
              </>
            ) : (
              <MCEmptyText>
                {t('profile_card_empty_user_chronotype')}
              </MCEmptyText>
            )}
          </MCButton>
        ) : (
          <>
            <MCView row width={300} justify="space-between">
              <NativeCard width={140}>
                <MCView height={80} align="center" justify="center">
                  <MCImage
                    image={chronotypeIcons[chronotype.data.type]}
                    resizeMode="contain"
                    width={50}
                    height={50}
                  />
                </MCView>
                <H4 align="center">
                  {t(`chronotype_type_${chronotype.data.type}`)}
                </H4>
              </NativeCard>
              <NativeCard width={140}>
                <MCView height={80} align="center" justify="center">
                  <MCText
                    weight="bold"
                    style={{
                      fontSize: dySize(60),
                      fontFamily: null,
                    }}>
                    {chronotype.data.night_sleep_offset_end -
                      chronotype.data.night_sleep_offset_start +
                      chronotype.data.day_sleep_offset_end -
                      chronotype.data.day_sleep_offset_start}
                  </MCText>
                </MCView>
                <H4 align="center">{t('hours_sleep')}</H4>
              </NativeCard>
            </MCView>
            <NativeCard width={300}>
              <MCView overflow="visible" align="center">
                <MCView width={280}>
                  <MCImage image={NightimeIcon} width={20} height={20} />
                </MCView>
                <MCTimeSlider
                  width={260}
                  enabled={false}
                  range={{
                    start: chronotype.data.night_sleep_offset_start,
                    end: chronotype.data.night_sleep_offset_end,
                  }}
                  values={NightSliderValues}
                />
              </MCView>
            </NativeCard>
            <NativeCard width={300}>
              <MCView overflow="visible" align="center">
                <MCView width={280}>
                  <MCImage image={DaytimeIcon} width={20} height={20} />
                </MCView>
                <MCTimeSlider
                  width={260}
                  enabled={false}
                  range={{
                    start: chronotype.data.day_sleep_offset_start,
                    end: chronotype.data.day_sleep_offset_end,
                  }}
                  values={DaySliderValues}
                />
              </MCView>
            </NativeCard>
          </>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(ChronotypeCard);
