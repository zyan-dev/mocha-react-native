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
import {CarrotSvg} from 'assets/svgs';

class NutritionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      bestFood: '',
      worstFood: '',
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
    const {bestFood, worstFood} = this.state;
    const {addOrUpdateReflection, updateSelectedReflection} = this.props;
    const {best, worst} = this.props.selectedReflection.data;
    if (bestFood.length > 0 && best.indexOf(bestFood) < 0) {
      best.push(bestFood);
    }
    if (worstFood.length > 0 && worst.indexOf(worstFood) < 0) {
      worst.push(worstFood);
    }
    updateSelectedReflection({worst, best});
    setTimeout(() => {
      addOrUpdateReflection();
    });
  };

  validateBest = () => {
    const {selectedReflection} = this.props;
    const best = _.get(selectedReflection, ['data', 'best'], []);
    return best.length > 0 || this.state.bestFood.length > 0;
  };

  validateWorst = () => {
    const {selectedReflection} = this.props;
    const worst = _.get(selectedReflection, ['data', 'worst'], []);
    return worst.length > 0 || this.state.worstFood.length > 0;
  };

  onUpdateBestFoods = state => {
    this.setState({bestFood: state.tag});
    this.props.updateSelectedReflection({best: state.tagsArray});
  };

  onUpdateWorstFoods = state => {
    this.setState({worstFood: state.tag});
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
          headerIcon={<CarrotSvg size={30} />}
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
  selectedReflection: selector.reflections.getSelectedReflection(state),
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
