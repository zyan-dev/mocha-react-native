import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCHeader, MCPicker, MCTextFormInput} from 'components/common';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H4, ErrorText} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {SampleReflectionSections} from 'utils/constants';

class EditNeedScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onPressRight = () => {
    this.setState({submitted: true});
    if (!this.validateNeed()) return;
    if (!this.validateValue()) return;
    if (!this.validateReason()) return;
    this.props.addOrUpdateReflection();
  };

  validateNeed = () => {
    const {selectedReflection} = this.props;
    const need = _.get(selectedReflection, ['data', 'need'], '');
    return need.length > 0;
  };

  validateValue = () => {
    const {selectedReflection} = this.props;
    const value = _.get(selectedReflection, ['data', 'value'], '');
    return value.length > 0;
  };

  validateReason = () => {
    const {selectedReflection} = this.props;
    const reason = _.get(selectedReflection, ['data', 'reason'], '');
    return reason.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, selectedReflection, updateSelectedReflection} = this.props;
    if (!selectedReflection) return null;
    const need = _.get(selectedReflection, ['data', 'need'], '');
    const value = _.get(selectedReflection, ['data', 'value'], '');
    const reason = _.get(selectedReflection, ['data', 'reason'], '');
    const isErrorNeed = !this.validateNeed();
    const isErrorValue = !this.validateValue();
    const isErrorReason = !this.validateReason();
    return (
      <MCRootView>
        <MCHeader
          title={t('edit_need_headerTitle')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H4 width={350} align="left" mb={5}>
            {t('add_need_heading', {value: '...'})}
          </H4>
          <MCPicker
            items={SampleReflectionSections.needs.map(value => ({
              label: t(`mocha_need_${value.replace(/ /g, '_')}`),
              value,
            }))}
            onChange={itemValue => {
              if (itemValue) updateSelectedReflection({need: itemValue});
              else updateSelectedReflection({need: ''});
            }}
            value={need}
            height={30}
          />
          {isErrorNeed && submitted && (
            <ErrorText>{t('error_input_required')}</ErrorText>
          )}
          {need.length > 0 && (
            <>
              <H4 width={350} align="left" mt={20} mb={5}>
                {t('add_need_value_displayText')}
              </H4>
              <MCPicker
                items={['unmet', 'partially-met', 'met'].map(value => ({
                  label: t(`mocha_need_value_${value}`),
                  value,
                }))}
                value={value}
                onChange={itemValue => {
                  if (itemValue) updateSelectedReflection({value: itemValue});
                  else updateSelectedReflection({value: ''});
                }}
                height={30}
              />
              {isErrorValue && submitted && (
                <ErrorText>{t('error_input_required')}</ErrorText>
              )}
            </>
          )}
          <H4 width={350} mt={20} mb={5}>
            {t('add_need_reason')}
          </H4>
          <MCView>
            <MCTextFormInput
              placeholder={t('add_need_reason_placeholder')}
              placeholderTextColor="gray"
              multiline
              textAlignVertical="top"
              maxHeight={300}
              value={reason}
              onChange={text => updateSelectedReflection({reason: text})}
              submitted={submitted}
              errorText={t('error_input_required')}
              isInvalid={isErrorReason}
              style={{width: '100%'}}
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
  reflectionSections: state.reflectionReducer.reflectionSections,
});

const mapDispatchToProps = {
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  addCustomReflectionTitle: reflectionActions.addCustomReflectionTitle,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditNeedScreen),
);
