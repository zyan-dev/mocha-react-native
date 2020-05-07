import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';

import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {MCHeader, MCTagInput} from 'components/common';
import {dySize} from 'utils/responsive';
import {stressRecoveries} from 'utils/constants';
import NavigationService from 'navigation/NavigationService';
import {TeaSvg} from 'assets/svgs';

class StressRecoveryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      method: '',
    };
  }

  isNew = false;
  componentWillMount() {
    const {
      stress_recovery,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (stress_recovery) {
      selectReflection(stress_recovery);
    } else {
      this.isNew = true;
      if (reflectionDraft['StressRecovery']) {
        selectReflection(reflectionDraft['StressRecovery']);
      } else {
        setInitialReflection('stress_recovery');
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
    const {method} = this.state;
    const {
      selectedReflection,
      updateSelectedReflection,
      addOrUpdateReflection,
    } = this.props;
    const methods = _.get(selectedReflection, ['data', 'methods'], []);
    this.setState({submitted: true});
    if (!this.validateMethods()) return;
    if (method.length > 0 && methods.indexOf(method) < 0) {
      methods.push(method);
    }
    updateSelectedReflection({methods});
    setTimeout(() => {
      addOrUpdateReflection();
    });
  };

  onUpdateMethod = state => {
    this.setState({method: state.tag});
    this.props.updateSelectedReflection({methods: state.tagsArray});
  };

  validateMethods = () => {
    const {selectedReflection} = this.props;
    const methods = _.get(selectedReflection, ['data', 'methods'], []);
    return methods.length > 0 || this.state.method.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection, updateSelectedReflection} = this.props;

    if (
      selectedReflection == undefined ||
      selectedReflection.type !== 'StressRecovery'
    )
      return null;
    const methods = _.get(selectedReflection, ['data', 'methods'], []);
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_stress_recovery')}
          headerIcon={<TeaSvg theme={theme} size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => {
            this.onPressSubmit();
          }}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('tools_tab_stress_recovery_description')}</H4>
          <MCView ph={20}>
            <H4 underline mt={10}>
              {t('here_are_some_example')}
            </H4>
            <MCView width={295} mb={50} mt={5} align="center">
              <MCView width={255} bordered br={10} ph={10}>
                {stressRecoveries.map((stress, index) => (
                  <H4 key={index}>{t(`tools_tab_stress_methods_${stress}`)}</H4>
                ))}
              </MCView>
            </MCView>
            <H4>{t('write_methods')}</H4>
            {submitted && !this.validateMethods() && (
              <ErrorText>{t('error_input_habits')}</ErrorText>
            )}
            <MCTagInput tags={methods} updateState={this.onUpdateMethod} />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  stress_recovery: selector.reflections.findMySpecialReflections(
    state,
    'StressRecovery',
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
  )(StressRecoveryScreen),
);
