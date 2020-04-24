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

class HydrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }
  isNew = false;
  componentWillMount() {
    const {
      hydration,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (hydration) {
      selectReflection(hydration);
    } else {
      this.isNew = true;
      if (reflectionDraft['Hydration']) {
        selectReflection(reflectionDraft['Hydration']);
      } else {
        setInitialReflection('hydration');
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
    // this.setState({submitted: true});
    // if (!this.validateBest()) return;
    // if (!this.validateWorst()) return;
    // this.props.addOrUpdateReflection();
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
    const cups = _.get(selectedReflection, ['data', 'cups'], undefined);
    const practices = _.get(
      selectedReflection,
      ['data', 'practices'],
      undefined,
    );
    if (!cups || !practices) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_hydration')}
          headerIcon={<MCIcon type="FontAwesome5Pro" name="dewpoint" />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('coming soon')}</H4>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  hydration: selector.reflections.findMySpecialReflections(state, 'Hydration'),
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
  )(HydrationScreen),
);
