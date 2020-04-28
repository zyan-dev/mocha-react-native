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
import {SheepSvg} from 'assets/svgs';
import {MCTimeSlider} from 'components/common';
import {NightSliderValues, DaySliderValues} from 'utils/constants';

class ChronotypeScreen extends React.PureComponent {
  componentWillMount() {
    const {myChronotype} = this.props;
    if (myChronotype) {
      this.props.selectReflection(myChronotype);
    } else {
      this.props.setInitialReflection('chronotype');
    }
  }

  onSaveMyChronotype = () => {
    this.props.addOrUpdateReflection();
  };

  onSelectType = type => {
    this.props.updateSelectedReflection({type});
  };

  onChangeNightTimeRange = range => {
    this.props.updateSelectedReflection({
      night_sleep_offset_start: range.start,
      night_sleep_offset_end: range.end,
    });
  };

  onChangeDayTimeRange = range => {
    this.props.updateSelectedReflection({
      day_sleep_offset_start: range.start,
      day_sleep_offset_end: range.end,
    });
  };

  render() {
    const {
      t,
      theme,
      selectedReflection: {
        data: {
          type,
          night_sleep_offset_start,
          night_sleep_offset_end,
          day_sleep_offset_start,
          day_sleep_offset_end,
        },
      },
    } = this.props;
    return (
      <MCRootView>
        <MCHeader
          title={t('profile_card_chronotype')}
          headerIcon={<SheepSvg theme={theme} size={30} />}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onSaveMyChronotype()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H3 underline>{t('profile_card_chronotype')}</H3>
          <MCView row align="center" justify="center">
            <MCButton onPress={() => this.onSelectType('morning')}>
              <NativeCard bordered={type === 'morning'}>
                <MCView width={85} align="center">
                  <MCImage
                    image={MorningLarkIcon}
                    resizeMode="contain"
                    width={70}
                    height={70}
                  />
                  <H5>{t('chronotype_type_morning')}</H5>
                </MCView>
              </NativeCard>
            </MCButton>
            <MCButton onPress={() => this.onSelectType('flexible')}>
              <NativeCard bordered={type === 'flexible'}>
                <MCView width={85} align="center">
                  <MCImage
                    image={FlexibleIcon}
                    resizeMode="contain"
                    width={70}
                    height={70}
                  />
                  <H5>{t('chronotype_type_flexible')}</H5>
                </MCView>
              </NativeCard>
            </MCButton>
            <MCButton onPress={() => this.onSelectType('night')}>
              <NativeCard bordered={type === 'night'}>
                <MCView width={85} align="center">
                  <MCImage
                    image={NightOwlIcon}
                    resizeMode="contain"
                    width={70}
                    height={70}
                  />
                  <H5>{t('chronotype_type_night')}</H5>
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
                start: night_sleep_offset_start,
                end: night_sleep_offset_end,
              }}
              onChange={range => this.onChangeNightTimeRange(range)}
              values={NightSliderValues}
            />
            <MCText weight="bold" style={{fontSize: dySize(80)}}>
              {night_sleep_offset_end - night_sleep_offset_start}
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
                start: day_sleep_offset_start,
                end: day_sleep_offset_end,
              }}
              onChange={range => this.onChangeDayTimeRange(range)}
              values={DaySliderValues}
            />
            <MCText weight="bold" style={{fontSize: dySize(80)}}>
              {day_sleep_offset_end - day_sleep_offset_start}
            </MCText>
            <H2>{t('unit_hours')}</H2>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  myChronotype: selector.reflections.findMySpecialReflections(
    state,
    'Chronotype',
  ),
  selectedReflection: state.reflectionReducer.selectedReflection,
});

const mapDispatchToProps = {
  saveMyChronotype: reflectionActions.saveMyChronotype,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  selectReflection: reflectionActions.selectReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChronotypeScreen),
);
