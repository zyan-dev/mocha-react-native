import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText, MCTextInput} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {PositiveFeedbackPreferences} from 'utils/constants';
import {getStringWithOutline} from 'services/operators';
import {AwardSvg} from 'assets/svgs';

class PraiseFeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  isNew = false;
  title = {
    title: i18next.t('tools_tab_feedback_preferences_positive_question', {
      bold: i18next.t('outline_praise'),
    }),
    boldWordKeys: ['praise'],
  };

  componentWillMount() {
    const {
      praise,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (praise) {
      selectReflection(praise);
    } else {
      this.isNew = true;
      if (reflectionDraft['PraiseFeedback']) {
        selectReflection(reflectionDraft['PraiseFeedback']);
      } else {
        setInitialReflection('praise_feedback');
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

  onPressItem = key => {
    const {selectedReflection, updateSelectedReflection} = this.props;
    const {options} = selectedReflection.data;
    const index = options.indexOf(key);
    if (index < 0) options.push(key);
    else options.splice(index, 1);
    updateSelectedReflection({options});
  };

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateOptions()) return;
    this.props.addOrUpdateReflection();
  };

  validateOptions = () => {
    const {selectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    return options.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    if (!selectedReflection) return null;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_praise_feedback')}
          headerIcon={<AwardSvg size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          {getStringWithOutline(this.title, {align: 'left'})}
          <H4 mb={20}>{t(`select_all_that_apply`)}</H4>
          {submitted && !this.validateOptions() && (
            <ErrorText>{t('error_input_add_nothing')}</ErrorText>
          )}
          <MCView row wrap justify="space-between">
            {PositiveFeedbackPreferences.map((key, index) => {
              const paddingIndexes = [4, 5, 8, 9, 12, 13];
              const selected = options.indexOf(key) > -1;
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
                    borderColor: selected
                      ? theme.colors.outline
                      : theme.colors.border,
                  }}
                  mt={paddingIndexes.indexOf(index) < 0 ? 0 : 30}
                  onPress={() => this.onPressItem(key)}>
                  <H4
                    weight={selected ? 'bold' : 'regular'}
                    align="center"
                    color={selected ? theme.colors.outline : theme.colors.text}>
                    {t(`feedback_preference_${key}`)}
                  </H4>
                  {key === 'template' && (
                    <H4
                      weight={selected ? 'bold' : 'regular'}
                      align="center"
                      color={
                        selected ? theme.colors.outline : theme.colors.text
                      }>
                      {`"${t(`feedback_preference_${key}_question`)}"`}
                    </H4>
                  )}
                </MCButton>
              );
            })}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  praise: selector.reflections.findMySpecialReflections(
    state,
    'PraiseFeedback',
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
  )(PraiseFeedbackScreen),
);
