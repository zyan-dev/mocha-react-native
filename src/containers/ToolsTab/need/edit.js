import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {reflectionActions} from 'Redux/actions';
import {showAlert} from 'services/operators';
import {MCHeader, MCPicker} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCTextInput, MCIcon} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {EmotionHow} from 'utils/constants';
import {EMOTIONS, SampleReflectionSections} from '../../../utils/constants';

class EditNeedScreen extends React.PureComponent {
  onPressRight = () => {
    this.props.addOrUpdateReflection();
  };

  render() {
    const {
      t,
      theme,
      selectedReflection,
      updateSelectedReflection,
      reflectionSections,
    } = this.props;
    const {
      data: {need, value, reason},
    } = selectedReflection;
    return (
      <MCRootView>
        <MCHeader
          title={t('edit_need_headerTitle')}
          hasRight={need.length * value.length * reason.length > 0}
          rightIcon={selectedReflection._id ? 'ios-cloud-upload' : 'ios-send'}
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
            </>
          )}
          <H4 width={350} mt={20} mb={5}>
            {t('add_need_reason')}
          </H4>
          <MCView>
            <MCTextInput
              style={{width: '100%'}}
              placeholder={t('add_need_reason_placeholder')}
              placeholderTextColor="gray"
              multiline
              textAlignVertical="top"
              maxHeight={300}
              value={reason}
              onChangeText={text => updateSelectedReflection({reason: text})}
            />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
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
