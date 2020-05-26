import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCView, NativeCard} from 'components/styled/View';
import {H3, H4, MCText, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCTimeSlider, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import {NightSliderValues, DaySliderValues} from 'utils/constants';
import {
  SheepSvg,
  LarkSvg,
  DayAndNightSvg,
  OwlSvg,
  NightSvg,
  DaySvg,
} from 'assets/svgs';

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
    const {t, theme, chronotype, onPressEdit, editable} = this.props;
    const data = _.get(chronotype, ['data'], {});
    const {
      type,
      night_sleep_offset_end,
      night_sleep_offset_start,
      day_sleep_offset_end,
      day_sleep_offset_start,
    } = data;
    return (
      <MCView align="center" mt={30}>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_chronotype')}
            </H3>
            <SheepSvg theme={theme} size={30} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {!type ? (
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
              <NativeCard width={140} mt={10} mb={10} ml={5} mr={5}>
                <MCView height={80} align="center" justify="center">
                  {type === 'morning' && (
                    <LarkSvg size={100} color={theme.colors.text} />
                  )}
                  {type === 'flexible' && (
                    <DayAndNightSvg size={80} color={theme.colors.text} />
                  )}
                  {type === 'night' && (
                    <OwlSvg size={60} color={theme.colors.text} />
                  )}
                </MCView>
                <H4 align="center">{t(`chronotype_type_${type}`)}</H4>
              </NativeCard>
              <NativeCard width={140} mt={10} mb={10} ml={5} mr={5}>
                <MCView height={80} align="center" justify="center">
                  <MCText
                    weight="bold"
                    style={{
                      fontSize: dySize(60),
                      fontFamily: null,
                    }}>
                    {type === 'morning'
                      ? night_sleep_offset_end - night_sleep_offset_start
                      : night_sleep_offset_end -
                        night_sleep_offset_start +
                        day_sleep_offset_end -
                        day_sleep_offset_start}
                  </MCText>
                </MCView>
                <H4 align="center">{t('hours_sleep')}</H4>
              </NativeCard>
            </MCView>
            <NativeCard width={300} mt={10} ml={10} mr={10} mb={10}>
              <MCView overflow="visible" align="center">
                <MCView width={280}>
                  <NightSvg size={30} color={theme.colors.text} />
                </MCView>
                <MCTimeSlider
                  width={260}
                  enabledLeft={false}
                  enabledRight={false}
                  value={[night_sleep_offset_start, night_sleep_offset_end]}
                  values={NightSliderValues}
                />
              </MCView>
            </NativeCard>
            {(type === 'flexible' || type === 'night') && (
              <NativeCard width={300} mt={10} ml={8} mr={8} mb={10}>
                <MCView overflow="visible" align="center">
                  <MCView width={280}>
                    <DaySvg size={30} color={theme.colors.text} />
                  </MCView>
                  <MCTimeSlider
                    width={260}
                    enabledLeft={false}
                    enabledRight={false}
                    value={[day_sleep_offset_start, day_sleep_offset_end]}
                    values={DaySliderValues}
                  />
                </MCView>
              </NativeCard>
            )}
          </>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(ChronotypeCard);
