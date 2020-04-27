import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {getStringWithOutline} from '../../../services/operators';
import i18next from 'i18next';
import {
  BehaviorPreferences,
  BehaviorPreferenceNegatives,
} from 'utils/constants';

class BehaviorPreferenceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }
  isNew = false;

  NegativeBehaviorQuestion = {
    title: i18next.t('tools_tab_behavior_preferences_negative_question', {
      bold1: i18next.t('outline_traits'),
      bold2: i18next.t('outline_strain_or_dysfunction'),
    }),
    boldWordKeys: ['traits', 'strain_or_dysfunction'],
  };

  PositiveBehaviorQuestion = {
    title: i18next.t('tools_tab_behavior_preferences_positive_question', {
      bold1: i18next.t('outline_traits'),
      bold2: i18next.t('outline_admire'),
    }),
    boldWordKeys: ['traits', 'admire'],
  };

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

  onBookmark = preference => {
    const bookmarked = _.get(
      this.props.selectedReflection,
      ['data', 'bookmarked'],
      [],
    );
    const index = bookmarked.indexOf(preference);
    if (index < 0) {
      bookmarked.push(preference);
    } else {
      bookmarked.splice(index, 0);
    }
    this.props.updateSelectedReflection({bookmarked});
  };

  render() {
    const {t, theme, selectedReflection} = this.props;
    const {step} = this.state;
    if (!selectedReflection || !selectedReflection.data) return null;
    const bookmarked = _.get(selectedReflection, ['data', 'bookmarked'], []);
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
          <MCView row justify="center" align="center" mb={10}>
            <H3>{t('tools_tab_behavior_preferences')}</H3>
            <MCIcon type="FontAwesome5" name="thumbs-up" size={30} />
          </MCView>
          {step == 1 && (
            <MCView width={350} align="center">
              {getStringWithOutline(
                this.NegativeBehaviorQuestion,
                'left',
                true,
                true,
              )}
              {BehaviorPreferenceNegatives.map(preference => (
                <MCCard key={preference} width={350} bordered mt={20} p={10}>
                  <MCView
                    row
                    align="center"
                    justify="space-between"
                    style={{width: '100%'}}>
                    <H4 style={{width: '80%'}}>
                      {t(`tools_tab_behavior_${preference}`)}
                    </H4>
                    <MCButton onPress={() => this.onBookmark(preference)}>
                      <MCIcon
                        type="FontAwesome5Pro"
                        name="exclamation-triangle"
                        color={
                          bookmarked.indexOf(preference) < 0
                            ? theme.colors.text
                            : theme.colors.danger
                        }
                      />
                    </MCButton>
                  </MCView>
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
                    sliderLength={dySize(300)}
                    values={[
                      _.get(selectedReflection, ['data', preference], 50), // if undefined, set to 50 by default
                    ]}
                    onValuesChange={this.onChangeSliderValue(preference)}
                    snapped
                    containerStyle={{
                      marginLeft: dySize(10),
                    }}
                  />
                  <MCView
                    row
                    justify="space-between"
                    mt={-10}
                    style={{width: '100%'}}>
                    <H5 weight="italic">
                      {t('tools_tab_behavior_negative_left_text')}
                    </H5>
                    <H5 weight="italic">
                      {t('tools_tab_behavior_negative_right_text')}
                    </H5>
                  </MCView>
                </MCCard>
              ))}
            </MCView>
          )}
          {step == 2 && (
            <MCView width={350} align="center">
              {getStringWithOutline(
                this.PositiveBehaviorQuestion,
                'left',
                true,
                true,
              )}
              {BehaviorPreferences.map(preference => (
                <MCCard key={preference} width={350} bordered mt={20} p={10}>
                  <MCView
                    row
                    align="center"
                    justify="space-between"
                    style={{width: '100%'}}>
                    <H4 style={{width: '80%'}}>
                      {t(`tools_tab_behavior_${preference}`)}
                    </H4>
                    <MCButton onPress={() => this.onBookmark(preference)}>
                      <MCIcon
                        name={
                          bookmarked.indexOf(preference) < 0
                            ? 'ios-star-outline'
                            : 'ios-star'
                        }
                        color={
                          bookmarked.indexOf(preference) < 0
                            ? theme.colors.text
                            : theme.colors.outline
                        }
                      />
                    </MCButton>
                  </MCView>
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
                    sliderLength={dySize(300)}
                    values={[selectedReflection.data[preference]]}
                    onValuesChange={this.onChangeSliderValue(preference)}
                    snapped
                    containerStyle={{marginLeft: dySize(10)}}
                  />
                  <MCView
                    style={{width: '100%'}}
                    row
                    justify="space-between"
                    mt={-10}>
                    <H5 weight="italic">
                      {t('tools_tab_behavior_positive_left_text')}
                    </H5>
                    <H5 weight="italic">
                      {t('tools_tab_behavior_positive_right_text')}
                    </H5>
                  </MCView>
                </MCCard>
              ))}
            </MCView>
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
