import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';

import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCHeader, MCTextFormInput} from 'components/common';
import {dySize} from 'utils/responsive';
import {stressRecoveries} from 'utils/constants';
import NavigationService from 'navigation/NavigationService';
import {TeaSvg} from 'assets/svgs';

class StressRecoveryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
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
    this.setState({submitted: true});
    if (!this.validateMethod()) return;
    this.props.addOrUpdateReflection();
  };

  validateMethod = () => {
    const {selectedReflection} = this.props;
    const method = _.get(selectedReflection, ['data', 'method'], []);
    return method.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection, updateSelectedReflection} = this.props;

    if (
      selectedReflection == undefined ||
      selectedReflection.type !== 'StressRecovery'
    )
      return null;
    const method = _.get(selectedReflection, ['data', 'method'], '');
    const isErrorMethods = !this.validateMethod();

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

            <MCTextFormInput
              label={t('write_methods')}
              value={method}
              multiline
              bordered
              onChange={text => updateSelectedReflection({method: text})}
              submitted={submitted}
              errorText={t('error_input_required')}
              isInvalid={isErrorMethods}
              style={{width: dySize(295)}}
            />
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
