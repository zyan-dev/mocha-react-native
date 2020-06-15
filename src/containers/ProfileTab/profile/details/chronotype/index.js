import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {MCHeader, MCTimeSlider, MCIcon, MCCheckBox} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {MCText, H2, H3, H5} from 'components/styled/Text';
import {reflectionActions} from 'Redux/actions';
import {NightSliderValues, DaySliderValues} from 'utils/constants';
import {
  MCView,
  MCRootView,
  MCContent,
  NativeCard,
} from 'components/styled/View';
import {LarkSvg, DayAndNightSvg, OwlSvg, NightSvg, DaySvg} from 'assets/svgs';

class ChronotypeScreen extends React.PureComponent {
  state = {
    showDaySleep: false,
  };
  componentWillMount() {
    const {myChronotype} = this.props;
    if (myChronotype) {
      this.props.selectReflection(myChronotype);
    } else {
      this.props.setInitialReflection('chronotype');
    }
  }

  componentDidMount() {
    const {myChronotype} = this.props;
    if (!myChronotype) return;
    console.log({myChronotype});
    if (myChronotype.data.hasDayTime) {
      this.setState({showDaySleep: true});
    }
  }

  onSaveMyChronotype = () => {
    this.props.updateSelectedReflection({hasDayTime: this.state.showDaySleep});
    setTimeout(() => {
      this.props.addOrUpdateReflection();
    });
  };

  onSelectType = type => {
    this.props.updateSelectedReflection({type});
  };

  onChangeNightTimeRange = range => {
    this.props.updateSelectedReflection({
      night_sleep_offset_start: range[0],
      night_sleep_offset_end: range[1],
    });
  };

  onChangeDayTimeRange = range => {
    this.props.updateSelectedReflection({
      day_sleep_offset_start: range[0],
      day_sleep_offset_end: range[1],
    });
  };

  render() {
    const {showDaySleep} = this.state;
    const {t, theme, selectedReflection} = this.props;
    if (!selectedReflection) return null;
    const type = _.get(selectedReflection, ['data', 'type'], '');
    const night_sleep_offset_start = _.get(
      selectedReflection,
      ['data', 'night_sleep_offset_start'],
      3,
    );
    const night_sleep_offset_end = _.get(
      selectedReflection,
      ['data', 'night_sleep_offset_end'],
      10,
    );
    const day_sleep_offset_start = _.get(
      selectedReflection,
      ['data', 'day_sleep_offset_start'],
      5,
    );
    const day_sleep_offset_end = _.get(
      selectedReflection,
      ['data', 'day_sleep_offset_end'],
      7,
    );
    const morningTextColor =
      type === 'morning' ? theme.colors.background : theme.colors.text;
    const flexibleTextColor =
      type === 'flexible' ? theme.colors.background : theme.colors.text;
    const nightTextColor =
      type === 'night' ? theme.colors.background : theme.colors.text;
    return (
      <MCRootView>
        <MCHeader
          title={t('title_sleep')}
          headerIcon={<MCIcon type="FontAwesome5Pro" name="bed" size={30} />}
          hasRight
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onSaveMyChronotype()}
        />
        <MCContent
          contentContainerStyle={{
            padding: dySize(10),
            paddingBottom: dySize(100),
          }}>
          <H3 underline>{t('label_sleep_type')}</H3>
          <MCView row align="center" justify="center">
            <MCButton onPress={() => this.onSelectType('morning')}>
              <NativeCard
                mt={5}
                mr={5}
                background={
                  type === 'morning' ? theme.colors.outline : undefined
                }>
                <MCView width={80} align="center">
                  <MCView height={70} align="center" justify="center">
                    <LarkSvg size={70} color={morningTextColor} />
                  </MCView>
                  <H5 color={morningTextColor}>
                    {t('chronotype_type_morning')}
                  </H5>
                </MCView>
              </NativeCard>
            </MCButton>
            <MCButton onPress={() => this.onSelectType('flexible')}>
              <NativeCard
                mt={5}
                mr={5}
                background={
                  type === 'flexible' ? theme.colors.outline : undefined
                }>
                <MCView width={80} align="center">
                  <MCView height={70} align="center" justify="center">
                    <DayAndNightSvg size={70} color={flexibleTextColor} />
                  </MCView>
                  <H5 color={flexibleTextColor}>
                    {t('chronotype_type_flexible')}
                  </H5>
                </MCView>
              </NativeCard>
            </MCButton>
            <MCButton onPress={() => this.onSelectType('night')}>
              <NativeCard
                mt={5}
                mr={5}
                background={
                  type === 'night' ? theme.colors.outline : undefined
                }>
                <MCView width={80} align="center">
                  <MCView height={70} align="center" justify="center">
                    <OwlSvg size={60} color={nightTextColor} />
                  </MCView>
                  <H5 color={nightTextColor}>{t('chronotype_type_night')}</H5>
                </MCView>
              </NativeCard>
            </MCButton>
          </MCView>
          <MCView mt={50} row align="center">
            <H3 mr={10} underline>
              {t('chronotype_night_sleep_title')}
            </H3>
            <NightSvg size={25} color={theme.colors.text} />
          </MCView>
          <MCView align="center">
            <MCTimeSlider
              width={260}
              value={[night_sleep_offset_start, night_sleep_offset_end]}
              onChange={range => this.onChangeNightTimeRange(range)}
              values={NightSliderValues}
              hideScale
            />
            <MCText weight="bold" style={{fontSize: dySize(80)}}>
              {(night_sleep_offset_end - night_sleep_offset_start) / 4}
            </MCText>
            <H2>{t('unit_hours')}</H2>
          </MCView>
          <MCView mt={50} row align="center">
            <H3 mr={10} underline>
              {t('chronotype_day_sleep_title')}
            </H3>
            <DaySvg size={25} color={theme.colors.text} />
            <MCCheckBox
              width={40}
              label=""
              bigText={false}
              checked={showDaySleep}
              onChange={() => this.setState({showDaySleep: !showDaySleep})}
            />
          </MCView>
          {showDaySleep && (
            <MCView align="center">
              <MCTimeSlider
                width={260}
                value={[day_sleep_offset_start, day_sleep_offset_end]}
                onChange={range => this.onChangeDayTimeRange(range)}
                values={DaySliderValues}
                hideScale
              />
              <MCText weight="bold" style={{fontSize: dySize(80)}}>
                {(day_sleep_offset_end - day_sleep_offset_start) / 4}
              </MCText>
              <H2>{t('unit_hours')}</H2>
            </MCView>
          )}
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
  selectedReflection: selector.reflections.getSelectedReflection(state),
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
