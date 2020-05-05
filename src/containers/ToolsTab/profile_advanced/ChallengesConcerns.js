import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {H5, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {getStringWithOutline, showAlert} from 'services/operators';
import {ExclamationSvg} from 'assets/svgs';
import {BehaviorPreferenceNegatives} from 'utils/constants';

class ChallengesConcernScreen extends React.Component {
  isNew = false;
  title = {
    title: i18next.t('tools_tab_behavior_preferences_negative_question', {
      bold1: i18next.t('outline_traits'),
      bold2: i18next.t('outline_strain_or_dysfunction'),
    }),
    boldWordKeys: ['traits', 'strain_or_dysfunction'],
  };

  componentWillMount() {
    const {
      challenges,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (challenges) {
      selectReflection(challenges);
    } else {
      this.isNew = true;
      if (reflectionDraft['Challenges']) {
        selectReflection(reflectionDraft['Challenges']);
      } else {
        setInitialReflection('challenges');
      }
    }
  }

  onPressBack = () => {
    const {selectedReflection, saveReflectionDraft} = this.props;
    if (this.isNew) {
      saveReflectionDraft({
        [selectedReflection.type]: selectedReflection,
      });
    }
    NavigationService.goBack();
  };

  onChangeSliderValue = key => values => {
    this.props.updateSelectedReflection({[key]: values[0]});
  };

  onBookmark = preference => {
    const {t, selectedReflection, updateSelectedReflection} = this.props;
    const bookmarked = _.get(selectedReflection, ['data', 'bookmarked'], []);
    const index = bookmarked.indexOf(preference);
    if (index < 0 && bookmarked.length < 6) {
      bookmarked.push(preference);
    } else if (index > -1) {
      bookmarked.splice(index, 1);
    } else {
      showAlert(t('error_selected_max_core_traits'));
      return;
    }
    updateSelectedReflection({bookmarked});
  };

  render() {
    const {t, theme, selectedReflection, addOrUpdateReflection} = this.props;
    if (!selectedReflection) return null;
    const bookmarked = _.get(selectedReflection, ['data', 'bookmarked'], []);
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_challenges_concerns')}
          headerIcon={<ExclamationSvg theme={theme} size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => addOrUpdateReflection()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          {getStringWithOutline(this.title, {
            align: 'left',
            underline: true,
          })}
          {BehaviorPreferenceNegatives.map(preference => {
            const liked = bookmarked.indexOf(preference) > -1;
            return (
              <MCCard key={preference} width={335} bordered mt={20} p={10}>
                <MCView
                  row
                  align="center"
                  justify="space-between"
                  style={{width: '100%'}}>
                  <H4 style={{width: '80%'}}>
                    {t(`tools_tab_behavior_negative_${preference}`)}
                  </H4>
                  <MCButton onPress={() => this.onBookmark(preference)}>
                    <MCIcon
                      type="FontAwesome5Pro"
                      name="exclamation-triangle"
                      color={!liked ? theme.colors.text : '#E65B1C'}
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
                  sliderLength={dySize(295)}
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
                    {t('tools_tab_behavior_negative_left_text')}
                  </H5>
                  <H5 weight="italic">
                    {t('tools_tab_behavior_negative_right_text')}
                  </H5>
                </MCView>
              </MCCard>
            );
          })}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  challenges: selector.reflections.findMySpecialReflections(
    state,
    'Challenges',
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
  )(ChallengesConcernScreen),
);
