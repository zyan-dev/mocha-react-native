import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCHeader, MCIcon} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {
  NegativeFeedbackPreferences,
  PositiveFeedbackPreferences,
} from 'utils/constants';
import NavigationService from 'navigation/NavigationService';
import {getStringWithOutline} from 'services/operators';

class FeedbackPreferenceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }

  isNew = false;
  negativeTitle = {
    title: i18next.t('tools_tab_feedback_preferences_negative_question', {
      bold: i18next.t('outline_constructive_criticism'),
    }),
    boldWordKeys: ['constructive_criticism'],
  };

  positiveTitle = {
    title: i18next.t('tools_tab_feedback_preferences_positive_question', {
      bold: i18next.t('outline_praise'),
    }),
    boldWordKeys: ['praise'],
  };
  componentWillMount() {
    const {
      myFeedbackPreference,
      selectReflection,
      reflectionDraft,
      setInitialReflection,
      updateSelectedReflection,
    } = this.props;
    if (myFeedbackPreference) {
      selectReflection(myFeedbackPreference);
    } else {
      this.isNew = true;
      if (reflectionDraft['FeedbackPreference']) {
        selectReflection(reflectionDraft['FeedbackPreference']);
      } else {
        setInitialReflection('feedback_preference');
      }
    }
  }

  onPressItem = (category, key) => {
    const {selectedReflection, updateSelectedReflection} = this.props;
    const {positive, negative} = selectedReflection.data;
    let index = 0;
    if (category === 'positive') {
      index = positive.indexOf(key);
      if (index < 0) {
        positive.push(key);
        index = negative.indexOf(key);
        if (index > -1) negative.splice(index, 1);
      } else {
        positive.splice(index, 1);
      }
    } else {
      const index = negative.indexOf(key);
      if (index < 0) negative.push(key);
      else negative.splice(index, 1);
    }
    updateSelectedReflection({positive});
    updateSelectedReflection({negative});
  };

  onPressRight = () => {
    const {step} = this.state;
    const {addOrUpdateReflection} = this.props;
    if (step === 1) {
      this.setState({step: 2});
      this.scrollView && this.scrollView._root.scrollToPosition(0, 0);
    } else {
      addOrUpdateReflection();
    }
  };

  onPressBack = () => {
    const {selectedReflection, saveReflectionDraft} = this.props;
    const {step} = this.state;
    if (step === 1) {
      if (this.isNew) {
        saveReflectionDraft({
          [selectedReflection.type]: selectedReflection,
        });
      }
      NavigationService.goBack();
    } else {
      this.setState({step: 1});
      this.scrollView && this.scrollView._root.scrollToPosition(0, 0);
    }
  };

  render() {
    const {t, theme, selectedReflection} = this.props;
    const {step} = this.state;
    if (!selectedReflection || !selectedReflection.data) return null;
    const {positive, negative} = selectedReflection.data;
    if (!positive || !negative) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 2 - 1`}
          rightIcon={step === 1 ? 'arrow-right' : 'cloud-upload-alt'}
          onPressBack={() => this.onPressBack()}
          onPressRight={() => this.onPressRight()}
        />
        <MCContent
          ref={c => (this.scrollView = c)}
          contentContainerStyle={{paddingHorizontal: dySize(20)}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{t('tools_tab_feedback_preferences')}</H3>
            <MCIcon name="ios-git-compare" size={30} />
          </MCView>
          {step === 1 && (
            <>
              {getStringWithOutline(this.negativeTitle, 'left')}
              <H4 mb={20}>{t(`select_all_that_apply`)}</H4>
              <MCView row wrap justify="space-between">
                {NegativeFeedbackPreferences.map((key, index) => {
                  const paddingIndexes = [6, 7, 10, 11, 14];
                  return (
                    <MCButton
                      key={key}
                      bordered
                      width={key === 'template' ? 335 : 160}
                      height={100}
                      br={6}
                      mb={10}
                      pl={20}
                      pr={20}
                      align="center"
                      justify="center"
                      style={{
                        borderColor:
                          negative.indexOf(key) < 0
                            ? theme.colors.border
                            : theme.colors.outline,
                      }}
                      mt={paddingIndexes.indexOf(index) < 0 ? 0 : 30}
                      onPress={() => this.onPressItem('negative', key)}>
                      <H3
                        weight={negative.indexOf(key) < 0 ? 'regular' : 'bold'}
                        align="center"
                        color={
                          negative.indexOf(key) < 0
                            ? theme.colors.text
                            : theme.colors.outline
                        }>
                        {t(`feedback_preference_${key}`)}
                      </H3>
                      {key === 'template' && (
                        <H3
                          weight={
                            negative.indexOf(key) < 0 ? 'regular' : 'bold'
                          }
                          align="center"
                          color={
                            negative.indexOf(key) < 0
                              ? theme.colors.text
                              : theme.colors.outline
                          }>
                          {`"${t(`feedback_preference_${key}_question`)}"`}
                        </H3>
                      )}
                    </MCButton>
                  );
                })}
              </MCView>
            </>
          )}
          {step === 2 && (
            <>
              {getStringWithOutline(this.positiveTitle, 'left')}
              <H4 weight="italic" mb={20}>
                {t(`select_all_that_apply`)}
              </H4>
              <MCView row wrap justify="space-between">
                {PositiveFeedbackPreferences.map((key, index) => {
                  const paddingIndexes = [4, 5, 8, 9, 12, 13];
                  return (
                    <MCButton
                      key={key}
                      bordered
                      width={key === 'template' ? 335 : 160}
                      height={100}
                      br={6}
                      mb={10}
                      pl={20}
                      pr={20}
                      align="center"
                      justify="center"
                      style={{
                        borderColor:
                          positive.indexOf(key) < 0
                            ? theme.colors.border
                            : theme.colors.outline,
                      }}
                      mt={paddingIndexes.indexOf(index) < 0 ? 0 : 30}
                      onPress={() => this.onPressItem('positive', key)}>
                      <H3
                        weight={positive.indexOf(key) < 0 ? 'regular' : 'bold'}
                        align="center"
                        color={
                          positive.indexOf(key) < 0
                            ? theme.colors.text
                            : theme.colors.outline
                        }>
                        {t(`feedback_preference_${key}`)}
                      </H3>
                      {key === 'template' && (
                        <H3
                          weight={
                            positive.indexOf(key) < 0 ? 'regular' : 'bold'
                          }
                          align="center"
                          color={
                            positive.indexOf(key) < 0
                              ? theme.colors.text
                              : theme.colors.outline
                          }>
                          {`"${t(`feedback_preference_${key}_question`)}"`}
                        </H3>
                      )}
                    </MCButton>
                  );
                })}
              </MCView>
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
  myFeedbackPreference: selector.reflections.findMySpecialReflections(
    state,
    'FeedbackPreference',
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
  )(FeedbackPreferenceScreen),
);
