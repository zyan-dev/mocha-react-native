import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCView, NativeCard} from 'components/styled/View';
import {H2, H3, H4, H5, MCText, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCTimeSlider, MCSpeedoMeter} from 'components/common';
import CardItem from './CardItem';
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

class ChronotypeAndPersonality extends React.Component {
  static propTypes = {
    chronotype: PropTypes.Object,
    personality: PropTypes.arrayOf(Object),
    onPressChronotype: PropTypes.func,
    onPressPersonality: PropTypes.func,
  };

  static defaultProps = {
    chronotype: {},
    personality: [],
    onPressChronotype: () => undefined,
    onPressPersonality: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      chronotypeCollapsed: true,
      personalityCollapsed: true,
    };
  }

  onToggleChronotypeCollapse = collapsed => {
    this.setState({chronotypeCollapsed: collapsed});
    if (!collapsed) {
      this.setState({personalityCollapsed: true});
    }
  };

  onTogglePersonalityCollapse = collapsed => {
    this.setState({personalityCollapsed: collapsed});
    if (!collapsed) {
      this.setState({chronotypeCollapsed: true});
    }
  };

  render() {
    const {
      t,
      chronotype,
      personality,
      onPressChronotype,
      onPressPersonality,
    } = this.props;
    const {chronotypeCollapsed, personalityCollapsed} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-hourglass"
            text={t('profile_card_chronotype')}
            onPress={() =>
              this.onToggleChronotypeCollapse(!chronotypeCollapsed)
            }
          />
          <CardItem
            icon="ios-finger-print"
            text={t('profile_card_personality')}
            onPress={() =>
              this.onTogglePersonalityCollapse(!personalityCollapsed)
            }
          />
        </MCView>
        <Collapsible collapsed={chronotypeCollapsed}>
          <MCButton
            width={320}
            row
            justify="space-between"
            onPress={() => onPressChronotype()}>
            <H3>My Chronotype</H3>
            <MCIcon name="ios-arrow-forward" />
          </MCButton>
          {chronotype.data ? (
            <>
              <MCView row width={320} justify="space-between">
                <NativeCard width={150}>
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
                <NativeCard width={150}>
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
              <NativeCard width={320}>
                <MCView overflow="visible" align="center">
                  <MCView width={300}>
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
              <NativeCard width={320}>
                <MCView overflow="visible" align="center">
                  <MCView width={300}>
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
          ) : (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressChronotype()}>
              <H3>You have not set up your chronotype</H3>
            </MCButton>
          )}
        </Collapsible>
        <Collapsible collapsed={personalityCollapsed}>
          <MCButton
            width={320}
            row
            justify="space-between"
            onPress={() => onPressPersonality()}>
            <H3>My Personalities</H3>
            <MCIcon name="ios-arrow-forward" />
          </MCButton>
          {personality.data ? (
            <MCView width={320}>
              <MCView row width={320} justify="space-between">
                <MCView ph={20} align="center" visible="visible">
                  <MCSpeedoMeter
                    width={120}
                    value={personality.data.honest_humility}
                  />
                  <H5 align="center" width={120}>
                    {t('personality_honest_humility')}
                  </H5>
                </MCView>
                <MCView ph={20} align="center" visible="visible">
                  <MCSpeedoMeter
                    width={120}
                    value={personality.data.emotionality}
                  />
                  <H5 align="center" width={120}>
                    {t('personality_emotionality')}
                  </H5>
                </MCView>
              </MCView>
              <MCView row width={320} justify="space-between">
                <MCView ph={20} align="center" visible="visible">
                  <MCSpeedoMeter
                    width={120}
                    value={personality.data.extraversion}
                  />
                  <H5 align="center" width={120}>
                    {t('personality_extraversion')}
                  </H5>
                </MCView>
                <MCView ph={20} align="center" visible="visible">
                  <MCSpeedoMeter
                    width={120}
                    value={personality.data.agreeableness}
                  />
                  <H5 align="center" width={120}>
                    {t('personality_agreeableness')}
                  </H5>
                </MCView>
              </MCView>
              <MCView row width={320} justify="space-between">
                <MCView ph={20} align="center" visible="visible">
                  <MCSpeedoMeter
                    width={120}
                    value={personality.data.conscientiousness}
                  />
                  <H5 align="center" width={120}>
                    {t('personality_conscientiousness')}
                  </H5>
                </MCView>
                <MCView ph={20} align="center" visible="visible">
                  <MCSpeedoMeter
                    width={120}
                    value={personality.data.openness_to_experience}
                  />
                  <H5 align="center" width={120}>
                    {t('personality_openness_to_experience')}
                  </H5>
                </MCView>
              </MCView>
            </MCView>
          ) : (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressPersonality()}>
              <H3>You have not added your personalities yet.</H3>
            </MCButton>
          )}
        </Collapsible>
      </MCView>
    );
  }
}

export default withTranslation()(ChronotypeAndPersonality);
