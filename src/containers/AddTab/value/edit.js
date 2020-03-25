import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {reflectionActions} from 'Redux/actions';
import {showAlert} from 'services/operators';
import {MCHeader, MCImagePicker, MCPicker} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCTextInput, MCIcon} from 'components/styled/Text';
import {dySize} from 'utils/responsive';

class EditValueScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addingCustomTitle: false,
      customTitle: '',
      searchText: '',
    };
  }

  componentDidMount() {
    this.setInitTitleForCreate();
  }

  setInitTitleForCreate = () => {
    const {
      t,
      selectedReflection,
      updateSelectedReflection,
      reflectionSections,
    } = this.props;
    if (selectedReflection.data.value === '') {
      updateSelectedReflection({
        value: t(
          `mocha_value_${reflectionSections.values[0].replace(/ /g, '_')}`,
        ),
      });
    }
  };

  onPressRight = () => {
    this.props.addOrUpdateReflection();
  };

  onToggleCustomButton = () => {
    const {addingCustomTitle, customTitle} = this.state;
    const {t, reflectionSections, updateSelectedReflection} = this.props;
    if (addingCustomTitle) {
      if (
        this.getPickerItems(reflectionSections.values).indexOf(customTitle) < 0
      ) {
        this.props.addCustomReflectionTitle(
          'values',
          `custom_value_title${customTitle}`,
        );
        updateSelectedReflection({value: `custom_value_title${customTitle}`});
        this.setState({addingCustomTitle: false, customTitle: ''});
      } else {
        showAlert(t('add_new_constant_duplicateError'));
      }
    } else {
      this.setState({addingCustomTitle: true});
    }
  };

  getPickerItems = keys => {
    const {t} = this.props;
    return keys.map(key => ({
      label: this.getLabelWithKey(key),
      value: key,
    }));
  };

  getLabelWithKey = key => {
    const {t} = this.props;
    if (key.length === 0) {
      return '';
    } else if (key.indexOf('custom_value_title') < 0) {
      return t(`mocha_value_${key.replace(/ /g, '_')}`);
    } else {
      return key.split('custom_value_title')[1];
    }
  };

  render() {
    const {
      t,
      theme,
      selectedReflection,
      updateSelectedReflection,
      reflectionSections,
    } = this.props;
    const {addingCustomTitle, customTitle, searchText} = this.state;
    const {
      data: {value, phrase, image},
    } = selectedReflection;
    return (
      <MCRootView>
        <MCHeader
          title={t('add_value_headerTitle')}
          hasRight={value.length * phrase.length > 0}
          rightIcon={selectedReflection._id ? 'ios-cloud-upload' : 'ios-send'}
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <MCPicker
            items={this.getPickerItems(reflectionSections.values)}
            onChange={itemValue => {
              if (itemValue) updateSelectedReflection({value: itemValue});
              else updateSelectedReflection({value: ''});
            }}
            value={value}
          />
          <MCView row align="center" justify="flex-end" mb={20}>
            {addingCustomTitle && (
              <MCTextInput
                style={{flex: 1}}
                placeholder={t('motivation_description')}
                value={customTitle}
                onChangeText={text => this.setState({customTitle: text})}
              />
            )}
            <MCButton
              row
              align="center"
              onPress={() => this.onToggleCustomButton()}>
              <MCIcon name="ios-add-circle-outline" />
              <H3>
                {addingCustomTitle ? t('add_addButton') : t('value_custom')}
              </H3>
            </MCButton>
          </MCView>
          <MCCard p={1}>
            <MCCard shadow br={1} style={{width: '100%'}} align="center">
              <H4>{this.getLabelWithKey(value)}</H4>
            </MCCard>
            <MCView p={10}>
              <MCTextInput
                style={{width: dySize(333)}}
                placeholder={t('add_value_phrase')}
                placeholderTextColor="gray"
                multiline
                textAlignVertical="top"
                maxHeight={300}
                value={phrase}
                onChangeText={text => updateSelectedReflection({phrase: text})}
              />
              <MCView width={340} align="center" mt={50}>
                <MCImagePicker
                  width={150}
                  height={150}
                  image={image}
                  onSelectImage={img =>
                    updateSelectedReflection({image: img.path})
                  }
                  type="picture"
                  br={10}
                />
                <H3 align="center" width={240} mt={30}>
                  {t('value_image_placeholder')}
                </H3>
              </MCView>
            </MCView>
          </MCCard>
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
  )(EditValueScreen),
);
