import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {StrengthOptions} from '../../../utils/constants';
import {showAlert} from 'services/operators';

class StrengthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }
  isNew = false;

  componentWillMount() {
    const {
      strength,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (strength) {
      selectReflection(strength);
    } else {
      this.isNew = true;
      if (reflectionDraft['Strength']) {
        selectReflection(reflectionDraft['Strength']);
      } else {
        setInitialReflection('strength');
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
    if (!this.validateOptions()) return;
    this.props.addOrUpdateReflection();
  };

  validateOptions = () => {
    return this.props.selectedReflection.data.options.length > 0;
  };

  onToggleOption = option => {
    const {t} = this.props;
    const {options} = this.props.selectedReflection.data;
    const index = options.indexOf(option);
    if (index < 0 && options.length < 4) {
      options.push(option);
    } else if (index > -1) {
      options.splice(index, 1);
    } else {
      showAlert(t('error_selected_max_strengths'));
    }
    this.props.updateSelectedReflection({options});
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], undefined);
    if (!options) return null;
    const isErrorOption = !this.validateOptions();
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_strength')}
          headerIcon={<MCIcon type="FontAwesome5Pro" name="hammer" />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('tools_tab_strength_question')}</H4>
          {submitted && isErrorOption && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView row wrap justify="center">
            {StrengthOptions.map(strength => {
              const selected = options.indexOf(strength.key) > -1;
              const color = selected ? theme.colors.outline : theme.colors.text;
              return (
                <MCButton
                  bordered
                  width={strength.width}
                  onPress={() => this.onToggleOption(strength.key)}
                  align="center"
                  style={{borderColor: color}}
                  pt={1}
                  mt={10}
                  ml={5}
                  mr={5}>
                  <MCView height={50} justify="center" align="center">
                    <H4 color={color} weight="bold" align="center">
                      {t(`tools_tab_strength_${strength.key}`)}
                    </H4>
                  </MCView>
                  <MCView height={100} justify="center" align="center">
                    <H4 color={color} justify="center" align="center">
                      {t(`tools_tab_strength_${strength.key}_description`)}
                    </H4>
                  </MCView>
                  <MCIcon
                    type={strength.iconType}
                    name={strength.icon}
                    size={30}
                    color={color}
                  />
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
  selectedReflection: state.reflectionReducer.selectedReflection,
  strength: selector.reflections.findMySpecialReflections(state, 'Strength'),
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
  )(StrengthScreen),
);
