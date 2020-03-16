import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {selector} from 'Redux/selectors';

import {MCHeader, MCImage} from 'components/common';
import {
  MCView,
  MCRootView,
  MCContent,
  NativeCard,
} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {MCText, H2, H3, H5} from 'components/styled/Text';
import {reflectionActions} from 'Redux/actions';
import {
  MorningLarkIcon,
  FlexibleIcon,
  NightOwlIcon,
  DaytimeIcon,
  NightimeIcon,
} from 'assets/images';
import {MCTimeSlider} from 'components/common';

const NightSliderValues = [
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
  '00:00 AM',
  '01:00 AM',
  '02:00 AM',
  '03:00 AM',
  '04:00 AM',
  '05:00 AM',
  '06:00 AM',
  '07:00 AM',
];
const DaySliderValues = [
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
];

class ChronotypeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      chronotypeData: {
        type: 'morning', // morning, flexible, night
        night_sleep_offset_start: 3, // 0 ~ 12
        night_sleep_offset_end: 10, // 0 ~ 12
        day_sleep_offset_start: 5, // 0 ~ 12
        day_sleep_offset_end: 7, // 0 ~ 12
      },
    };
  }

  componentWillMount() {
    const {myChronotype} = this.props;
    if (myChronotype.length) {
      this.setState({chronotypeData: myChronotype[0].data, isNew: false});
    }
  }

  onSaveMyChronotype = () => {
    const {isNew, chronotypeData} = this.state;
    const {saveMyChronotype, myChronotype} = this.props;
    saveMyChronotype({
      isNew,
      param: {
        _id: isNew ? '' : myChronotype[0]._id,
        data: chronotypeData,
      },
    });
  };

  onSelectType = type => {
    const {chronotypeData} = this.state;
    this.setState({chronotypeData: {...chronotypeData, type}});
  };

  onChangeNightTimeRange = range => {
    const {chronotypeData} = this.state;
    this.setState({
      chronotypeData: {
        ...chronotypeData,
        night_sleep_offset_start: range.start,
        night_sleep_offset_end: range.end,
      },
    });
  };

  onChangeDayTimeRange = range => {
    const {chronotypeData} = this.state;
    this.setState({
      chronotypeData: {
        ...chronotypeData,
        day_sleep_offset_start: range.start,
        day_sleep_offset_end: range.end,
      },
    });
  };

  render() {
    const {t} = this.props;
    const {chronotypeData} = this.state;
    return (
      <MCRootView>
        <MCHeader
          title={t('profile_card_chronotype')}
          onPressBack={() => this.onSaveMyChronotype()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H3 underline>{t('profile_card_chronotype')}</H3>
          <MCView row align="center" justify="center">
            <MCButton onPress={() => this.onSelectType('morning')}>
              <NativeCard bordered={chronotypeData.type === 'morning'}>
                <MCView width={85} align="center">
                  <MCImage
                    image={MorningLarkIcon}
                    resizeMode="contain"
                    width={70}
                    height={70}
                  />
                  <H5>{t('chronotype_morning_lark')}</H5>
                </MCView>
              </NativeCard>
            </MCButton>
            <MCButton onPress={() => this.onSelectType('flexible')}>
              <NativeCard bordered={chronotypeData.type === 'flexible'}>
                <MCView width={85} align="center">
                  <MCImage
                    image={FlexibleIcon}
                    resizeMode="contain"
                    width={70}
                    height={70}
                  />
                  <H5>{t('chronotype_flexible')}</H5>
                </MCView>
              </NativeCard>
            </MCButton>
            <MCButton onPress={() => this.onSelectType('night')}>
              <NativeCard bordered={chronotypeData.type === 'night'}>
                <MCView width={85} align="center">
                  <MCImage
                    image={NightOwlIcon}
                    resizeMode="contain"
                    width={70}
                    height={70}
                  />
                  <H5>{t('chronotype_night_owl')}</H5>
                </MCView>
              </NativeCard>
            </MCButton>
          </MCView>
          <MCView mt={50} row align="center">
            <H3 mr={10} underline>
              {t('chronotype_night_sleep_title')}
            </H3>
            <MCImage image={NightimeIcon} width={20} height={20} />
          </MCView>
          <MCView align="center">
            <MCTimeSlider
              width={320}
              range={{
                start: chronotypeData.night_sleep_offset_start,
                end: chronotypeData.night_sleep_offset_end,
              }}
              onChange={range => this.onChangeNightTimeRange(range)}
              values={NightSliderValues}
            />
            <MCText weight="bold" style={{fontSize: dySize(80)}}>
              {chronotypeData.night_sleep_offset_end -
                chronotypeData.night_sleep_offset_start}
            </MCText>
            <H2>{t('unit_hours')}</H2>
          </MCView>
          <MCView mt={50} row align="center">
            <H3 mr={10} underline>
              {t('chronotype_day_sleep_title')}
            </H3>
            <MCImage image={DaytimeIcon} width={20} height={20} />
          </MCView>
          <MCView align="center">
            <MCTimeSlider
              width={320}
              range={{
                start: chronotypeData.day_sleep_offset_start,
                end: chronotypeData.day_sleep_offset_end,
              }}
              onChange={range => this.onChangeDayTimeRange(range)}
              values={DaySliderValues}
            />
            <MCText weight="bold" style={{fontSize: dySize(80)}}>
              {chronotypeData.day_sleep_offset_end -
                chronotypeData.day_sleep_offset_start}
            </MCText>
            <H2>{t('unit_hours')}</H2>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  myChronotype: selector.reflections.getMyChronotype(state),
});

const mapDispatchToProps = {
  saveMyChronotype: reflectionActions.saveMyChronotype,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ChronotypeScreen),
);
