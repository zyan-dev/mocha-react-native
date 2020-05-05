import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {showAlert} from 'services/operators';
import {
  MCHeader,
  MCImagePicker,
  MCTagInput,
  MCVulnerabilityPicker,
  MCPicker,
  MCTextFormInput,
  MCIcon,
} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, ErrorText, MCTextInput} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {getTitleByKey} from 'services/operators';

class EditUserManualScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addingCustomTitle: false,
      customTitle: '',
      submitted: false,
    };
  }

  onPressRight = () => {
    this.setState({submitted: true});
    if (!this.validateTitle()) return;
    if (!this.validateDescription()) return;
    this.props.addOrUpdateReflection();
  };

  updateTagState = state => {
    this.props.updateSelectedReflection({tags: state.tagsArray});
  };

  onToggleCustomButton = () => {
    const {addingCustomTitle, customTitle} = this.state;
    const {t, reflectionSections, updateSelectedReflection} = this.props;
    if (addingCustomTitle) {
      if (
        this.getPickerItems(reflectionSections.manuals).indexOf(customTitle) < 0
      ) {
        this.props.addCustomReflectionTitle(
          'manuals',
          `custom_manual_title${customTitle}`,
        );
        updateSelectedReflection({title: `custom_manual_title${customTitle}`});
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
      label: getTitleByKey('manual', key),
      value: key,
    }));
  };

  getLabelWithKey = key => {
    const {t} = this.props;
    if (key.length === 0) {
      return '';
    } else if (key.indexOf('custom_manual_title') < 0) {
      return t(`mocha_manual_${key}`);
    } else {
      return key.split('custom_manual_title')[1];
    }
  };

  validateTitle = () => {
    const {selectedReflection} = this.props;
    const title = _.get(selectedReflection, ['data', 'title'], '');
    return title.length > 0;
  };

  validateDescription = () => {
    const {selectedReflection} = this.props;
    const text = _.get(selectedReflection, ['data', 'text'], '');
    return text.length > 0;
  };

  render() {
    const {
      t,
      theme,
      selectedReflection,
      updateSelectedReflection,
      reflectionSections,
    } = this.props;
    const {addingCustomTitle, customTitle, submitted} = this.state;
    if (!selectedReflection) return null;
    const title = _.get(selectedReflection, ['data', 'title'], '');
    const text = _.get(selectedReflection, ['data', 'text'], '');
    const image = _.get(selectedReflection, ['data', 'image'], '');
    const vulnerability = _.get(
      selectedReflection,
      ['data', 'vulnerability'],
      1,
    );
    const tags = _.get(selectedReflection, ['data', 'tags'], []);
    const isErrorTitle = !this.validateTitle();
    const isErrorDescription = !this.validateDescription();
    return (
      <MCRootView>
        <MCHeader
          title={t('profile_Manual_title')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H3 weight="bold">{t('title')}</H3>
          <MCPicker
            items={this.getPickerItems(reflectionSections.manuals)}
            onChange={itemValue => {
              if (itemValue) updateSelectedReflection({title: itemValue});
              else updateSelectedReflection({title: ''});
            }}
            value={title}
            height={30}
          />
          {isErrorTitle && submitted && (
            <ErrorText>{t('error_input_required')}</ErrorText>
          )}
          <MCView row align="center" justify="flex-end" mb={20}>
            {addingCustomTitle && (
              <MCTextInput
                style={{flex: 1}}
                placeholder={t('motivation_description')}
                value={customTitle}
                onChangeText={value => this.setState({customTitle: value})}
              />
            )}
            <MCButton
              row
              align="center"
              onPress={() => this.onToggleCustomButton()}>
              <MCIcon name="ios-add-circle-outline" />
              <H3>
                {addingCustomTitle
                  ? t('add_addButton')
                  : t('usermanual_custom_title')}
              </H3>
            </MCButton>
          </MCView>
          <MCCard p={1}>
            <MCCard shadow br={1} style={{width: '100%'}} align="center">
              <H4>{this.getLabelWithKey(title)}</H4>
            </MCCard>
            <MCView ph={10} pv={10}>
              <MCTextFormInput
                style={{width: dySize(333)}}
                placeholder={t('motivation_description')}
                multiline
                textAlignVertical="top"
                maxHeight={300}
                value={text}
                onChange={value => updateSelectedReflection({text: value})}
                submitted={submitted}
                errorText={t('error_input_required')}
                isInvalid={isErrorDescription}
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
                  {t('motivation_image_placeholder')}
                </H3>
              </MCView>
              <H3 mt={20}>{t('trustnetwork_tags_title')}</H3>
              <H4 color={theme.colors.border}>
                {t('tag_input_placeholderText')}
              </H4>
              <MCView width={333}>
                <MCTagInput updateState={this.updateTagState} tags={tags} />
              </MCView>
              <H3 mt={20}>{t('section_label_vulnerability')}</H3>
              <MCVulnerabilityPicker
                defaultIndex={vulnerability}
                onSelect={index =>
                  updateSelectedReflection({vulnerability: index})
                }
              />
            </MCView>
          </MCCard>
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
  )(EditUserManualScreen),
);
