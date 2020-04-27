import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCTagInput} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {ApproachToConflictOptions} from 'utils/constants';

class NutritionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }
  isNew = false;
  componentWillMount() {
    const {
      nutrition,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (nutrition) {
      selectReflection(nutrition);
    } else {
      this.isNew = true;
      if (reflectionDraft['Nutrition']) {
        selectReflection(reflectionDraft['Nutrition']);
      } else {
        setInitialReflection('nutrition');
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

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateBest()) return;
    if (!this.validateWorst()) return;
    this.props.addOrUpdateReflection();
  };

  validateBest = () => {
    return this.props.selectedReflection.data.best.length > 0;
  };

  validateWorst = () => {
    return this.props.selectedReflection.data.worst.length > 0;
  };

  onUpdateBestFoods = state => {
    this.props.updateSelectedReflection({best: state.tagsArray});
  };

  onUpdateWorstFoods = state => {
    this.props.updateSelectedReflection({worst: state.tagsArray});
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const best = _.get(selectedReflection, ['data', 'best'], undefined);
    const worst = _.get(selectedReflection, ['data', 'worst'], undefined);
    if (!best || !worst) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_nutrition')}
          headerIcon={<MCIcon type="FontAwesome5Pro" name="carrot" />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('tools_tab_question_best_nutrition')}</H4>
          {submitted && !this.validateBest() && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCTagInput tags={best} updateState={this.onUpdateBestFoods} />
          <H4 mt={30}>{t('tools_tab_question_worst_nutrition')}</H4>
          {submitted && !this.validateWorst() && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCTagInput tags={worst} updateState={this.onUpdateWorstFoods} />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  nutrition: selector.reflections.findMySpecialReflections(state, 'Nutrition'),
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
  )(NutritionScreen),
);
