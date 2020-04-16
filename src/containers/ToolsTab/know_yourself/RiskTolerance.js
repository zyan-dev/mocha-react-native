import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader} from 'components/common';
import {RiskTolerances} from 'utils/constants';
import {dySize} from 'utils/responsive';

class RiskToleranceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }
  componentWillMount() {
    const {riskTolerance, selectReflection, setInitialReflection} = this.props;
    if (riskTolerance) {
      selectReflection(riskTolerance);
    } else {
      setInitialReflection('risk_tolerance');
    }
  }

  onPressItem = key => {
    const {
      selectedReflection: {
        data: {options},
      },
      updateSelectedReflection,
    } = this.props;
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
    return this.props.selectedReflection.data.options.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], undefined);
    if (!options) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 2 - 2`}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{t('tools_tab_risk_tolerance')}</H3>
            <MCIcon type="FontAwesome5" name="skiing" size={30} />
          </MCView>
          <H4>{t('tools_tab_risk_explain')}</H4>
          <H4 weight="italic">{t(`select_all_that_apply`)}</H4>
          {!this.validateOptions() && submitted && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView row wrap justify="space-between" mt={20}>
            {RiskTolerances.map(key => (
              <MCButton
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
                    options.indexOf(key) < 0
                      ? theme.colors.border
                      : theme.colors.outline,
                }}
                onPress={() => this.onPressItem(key)}>
                <H3
                  weight={options.indexOf(key) < 0 ? 'regular' : 'bold'}
                  align="center"
                  color={
                    options.indexOf(key) < 0
                      ? theme.colors.text
                      : theme.colors.outline
                  }>
                  {t(`risk_tolerance_${key}`)}
                </H3>
              </MCButton>
            ))}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  riskTolerance: selector.reflections.findMySpecialReflections(
    state,
    'RiskTolerance',
  ),
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RiskToleranceScreen),
);
