import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {H3, H4, H5, MCIcon} from 'components/styled/Text';
import {MCHeader} from 'components/common';
import {BehaviorPreferences} from 'utils/constants';
import {dySize} from 'utils/responsive';

class BehaviorPreferenceScreen extends React.Component {
  componentWillMount() {
    const {
      myBehaviorPreference,
      selectReflection,
      setInitialReflection,
    } = this.props;
    if (myBehaviorPreference) {
      selectReflection(myBehaviorPreference);
    } else {
      setInitialReflection('behavior_preference');
    }
  }

  onChangeSliderValue = (key) => (values) => {
    this.props.updateSelectedReflection({[key]: values[0]});
  };

  render() {
    const {t, theme, selectedReflection} = this.props;
    if (!selectedReflection || !selectedReflection.data) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 2 - 2`}
          rightText={t('done')}
          onPressRight={() => this.props.addOrUpdateReflection()}
        />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{t('tools_tab_behavior_preferences')}</H3>
            <MCIcon type="FontAwesome5" name="thumbs-up" size={30} />
          </MCView>
          <H4 width={320} mb={20} color={theme.colors.border}>
            {t('tools_tab_behavior_explain')}
          </H4>
          {BehaviorPreferences.map((preference) => (
            <MCCard width={320} bordered mb={10} p={10}>
              <H4>{t(`tools_tab_behavior_${preference}`)}</H4>
              <MultiSlider
                customMarker={(e) => {
                  return (
                    <MCView
                      width={20}
                      height={20}
                      br={10}
                      background={theme.colors.text}
                    />
                  );
                }}
                min={0}
                max={100}
                step={1}
                sliderLength={dySize(280)}
                values={[selectedReflection.data[preference]]}
                onValuesChange={this.onChangeSliderValue(preference)}
                snapped
                containerStyle={{marginLeft: dySize(10)}}
              />
              <MCView width={300} row justify="space-between" mt={-10}>
                <H5 weight="italic">Not at all</H5>
                <H5 weight="italic">completely</H5>
              </MCView>
            </MCCard>
          ))}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  myBehaviorPreference: selector.reflections.findMySpecialReflections(
    state,
    'BehaviorPreference',
  ),
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(BehaviorPreferenceScreen),
);
