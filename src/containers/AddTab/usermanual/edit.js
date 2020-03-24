import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Picker} from '@react-native-community/picker';
import {reflectionActions} from 'Redux/actions';
import {showAlert} from 'services/operators';
import {
  MCHeader,
  MCImagePicker,
  MCTagInput,
  MCVulnerabilityPicker,
} from 'components/common';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCTextInput} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {MCIcon} from '../../../components/styled/Text';
import {MCCard} from '../../../components/styled/View';

class EditUserManualScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addingCustomTitle: false,
      customTitle: '',
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
    if (selectedReflection.data.title === '') {
      updateSelectedReflection({
        title: t(`mocha_manual_${reflectionSections.manuals[0]}`),
      });
    }
  };

  onPressRight = () => {
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
        updateSelectedReflection({title: customTitle});
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
    return keys.map(key => {
      if (key.indexOf('custom_manual_title') < 0) {
        return t(`mocha_manual_${key}`);
      } else {
        return key.split('custom_manual_title')[1];
      }
    });
  };

  render() {
    const {
      t,
      theme,
      selectedReflection,
      updateSelectedReflection,
      reflectionSections,
    } = this.props;
    const {addingCustomTitle, customTitle} = this.state;
    const {
      data: {title, text, image, vulnerability, tags},
    } = selectedReflection;
    return (
      <MCRootView>
        <MCHeader
          title={t('profile_Manual_title')}
          hasRight={title.length * text.length > 0}
          rightIcon={selectedReflection._id ? 'ios-cloud-upload' : 'ios-send'}
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <Picker
            itemStyle={{color: theme.colors.text}}
            selectedValue={title}
            onValueChange={(itemValue, itemIndex) => {
              updateSelectedReflection({title: itemValue});
            }}>
            {this.getPickerItems(reflectionSections.manuals).map(section => (
              <Picker.Item label={section} value={section} />
            ))}
          </Picker>

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
              <H4>{title}</H4>
            </MCCard>
            <MCView p={10}>
              <MCTextInput
                style={{width: dySize(333)}}
                placeholder={t('motivation_description')}
                multiline
                maxHeight={300}
                value={text}
                onChangeText={value => updateSelectedReflection({text: value})}
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
  )(EditUserManualScreen),
);
