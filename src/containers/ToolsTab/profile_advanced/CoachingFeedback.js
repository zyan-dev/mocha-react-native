import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {BullhornSvg, PeopleArrowSvg} from 'assets/svgs';
import {getStringWithOutline} from 'services/operators';
import {CoachingFeedbackOptions} from 'utils/constants';

class CoachingFeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  isNew = false;
  title = {
    title: i18next.t('tools_tab_coaching_feedback_title', {
      bold: i18next.t('outline_coaching'),
    }),
    boldWordKeys: ['coaching'],
  };

  question = {
    title: i18next.t('tools_tab_coaching_feedback_question', {
      bold: i18next.t('outline_coaching_style'),
    }),
    boldWordKeys: ['coaching_style'],
  };

  componentWillMount() {
    const {
      coaching,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (coaching) {
      selectReflection(coaching);
    } else {
      this.isNew = true;
      if (reflectionDraft['CoachingFeedback']) {
        selectReflection(reflectionDraft['CoachingFeedback']);
      } else {
        setInitialReflection('coaching_feedback');
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

  onPressOption = option => {
    const {selectedReflection, updateSelectedReflection} = this.props;
    const {options} = selectedReflection.data;
    const index = options.indexOf(option.key);
    if (index < 0) options.push(option.key);
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
      <MCRootView justify="flex-start" align="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_coaching_feedback')}
          headerIcon={<BullhornSvg theme={theme} size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(15)}}>
          {getStringWithOutline(this.title, {align: 'left'})}
          <MCView mt={20}>
            {getStringWithOutline(this.question, {align: 'left'})}
          </MCView>
          <H4 mt={20}>{t('select_all_that_apply')}</H4>
          {submitted && !this.validateOptions() && (
            <ErrorText>{t('error_input_habits')}</ErrorText>
          )}
          <MCView row wrap width={350} justify="center">
            {CoachingFeedbackOptions.map(option => {
              const selected = options.indexOf(option.key) > -1;
              const borderColor = selected
                ? theme.colors.outline
                : theme.colors.text;
              return (
                <MCButton
                  bordered
                  width={option.width}
                  onPress={() => this.onPressOption(option)}
                  height={150}
                  pl={10}
                  ml={10}
                  mr={10}
                  mt={20}
                  style={{borderColor}}>
                  <MCView
                    row
                    align="center"
                    justify="space-between"
                    style={{width: '100%'}}>
                    <H4 weight="bold" color={borderColor}>
                      {t(`tools_tab_coaching_feedback_${option.key}`)}
                    </H4>
                    {option.key === 'accountability' && (
                      <PeopleArrowSvg size={25} color={borderColor} />
                    )}
                    {option.key !== 'accountability' && (
                      <MCIcon
                        color={borderColor}
                        type="FontAwesome5Pro"
                        name={option.icon}
                      />
                    )}
                  </MCView>
                  <H4 color={borderColor}>
                    {t(`tools_tab_coaching_feedback_${option.key}_description`)}
                  </H4>
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
  coaching: selector.reflections.findMySpecialReflections(
    state,
    'CoachingFeedback',
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
  )(CoachingFeedbackScreen),
);
