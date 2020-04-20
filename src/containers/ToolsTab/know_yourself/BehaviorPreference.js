import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';

import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {H3, H4, H5, MCIcon, Bold} from 'components/styled/Text';
import {MCHeader} from 'components/common';
import {
  BehaviorPreferences,
  BehaviorPreferenceNegatives,
} from 'utils/constants';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class BehaviorPreferenceScreen extends React.Component {
  isNew = false;

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
    };
  }

  componentWillMount() {
    const {
      myBehaviorPreference,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (myBehaviorPreference) {
      selectReflection(myBehaviorPreference);
    } else {
      this.isNew = true;
      if (reflectionDraft['BehaviorPreference']) {
        selectReflection(reflectionDraft['BehaviorPreference']);
      } else {
        setInitialReflection('behavior_preference');
      }
    }
  }

  onChangeSliderValue = key => values => {
    this.props.updateSelectedReflection({[key]: values[0]});
  };

  onPressBack = () => {
    const {selectedReflection, saveReflectionDraft} = this.props;
    const {step} = this.state;
    if (step === 2) {
      this.setState({step: 1});
    } else {
      if (this.isNew) {
        saveReflectionDraft({
          [selectedReflection.type]: selectedReflection,
        });
      }
      NavigationService.goBack();
    }
  };

  onPressRight = () => {
    if (this.state.step == 1) {
      this.setState({step: 2});
    } else {
      this.props.addOrUpdateReflection();
    }
  };

  render() {
    const {t, theme, selectedReflection} = this.props;
    const {step} = this.state;
    if (!selectedReflection || !selectedReflection.data) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 2 - 2`}
          onPressBack={() => this.onPressBack()}
          rightIcon={step === 1 ? 'arrow-right' : 'cloud-upload-alt'}
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{t('tools_tab_behavior_preferences')}</H3>
            <MCIcon type="FontAwesome5" name="thumbs-up" size={30} />
          </MCView>
          {step == 1 && (
            <>
              <H4 width={320} mb={20} color={theme.colors.border}>
                {t('tools_tab_behavior_explain')}
                <H4 weight="bold" underline>
                  {t('valuable')}
                </H4>
                {t('tools_tab_behavior_explain_following')}
                <H4 weight="bold" underline>
                  {t('traits')}
                </H4>
                ?
              </H4>

              {BehaviorPreferences.map(preference => (
                <MCCard key={preference} width={320} bordered mb={10} p={10}>
                  <H4>{t(`tools_tab_behavior_${preference}`)}</H4>
                  <MultiSlider
                    customMarker={e => {
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
            </>
          )}

          {step == 2 && (
            <>
              <H4 width={320} mb={20} color={theme.colors.border}>
                {t('tools_tab_behavior_negative_explain')}
                <H4 weight="bold" underline>
                  {t('unacceptable')}
                </H4>
                {t('tools_tab_behavior_explain_following')}
                <H4 weight="bold" underline>
                  {t('traits')}
                </H4>
                ?
              </H4>
              {BehaviorPreferenceNegatives.map(preference => (
                <MCCard key={preference} width={320} bordered mb={10} p={10}>
                  <H4>{t(`tools_tab_behavior_${preference}`)}</H4>
                  <MultiSlider
                    customMarker={e => {
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
                    values={[
                      _.get(selectedReflection, ['data', preference], 50), // if undefined, set to 50 by default
                    ]}
                    onValuesChange={this.onChangeSliderValue(preference)}
                    snapped
                    containerStyle={{marginLeft: dySize(10)}}
                  />
                  <MCView width={300} row justify="space-between" mt={-10}>
                    <H5 weight="italic">I don't mind</H5>
                    <H5 weight="italic">intolerable</H5>
                  </MCView>
                </MCCard>
              ))}
            </>
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  myBehaviorPreference: selector.reflections.findMySpecialReflections(
    state,
    'BehaviorPreference',
  ),
  reflectionDraft: state.reflectionReducer.draft,
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  saveReflectionDraft: reflectionActions.saveReflectionDraft,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BehaviorPreferenceScreen),
);
