import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions, routerActions} from 'Redux/actions';
import API from 'services/api';
import {showAlert} from 'services/operators';
import {MCHeader, MCImagePicker, MCTextFormInput} from 'components/common';
import {DiscoverValues} from 'utils/constants';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class EditValueScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      value: '',
      phrase: '',
      image: '',
    };
  }

  onPressRight = async () => {
    const {profile, setLoading, selectedReflection} = this.props;
    const {value, phrase, image} = this.state;
    this.setState({submitted: true});
    if (!this.validateValue()) return;
    if (!this.validatePhrase()) return;
    if (!this.validateImage()) return;
    const custom = _.get(selectedReflection, ['data', 'custom'], []);
    const story = _.get(selectedReflection, ['data', 'story'], {});
    let valueImage = image;
    if (image.length > 0) {
      setLoading(true);
      const uploadedURL = await API.fileUploadToS3({
        image: image,
        type: 'Value',
        userId: profile._id,
      });
      if (uploadedURL === 'error') {
        showAlert(i18next.t('error_upload_file_failed'));
        setLoading(false);
        return;
      } else {
        valueImage = uploadedURL;
      }
      setLoading(false);
    }
    custom.push({
      value: value.replace(/ /g, '_'),
      category: 'custom',
      name: '',
      image: valueImage,
    });
    story[`custom_${value.replace(/ /g, '_')}`] = phrase;
    this.props.updateSelectedReflection({custom, story});
    NavigationService.goBack();
  };

  validateValue = () => {
    const {value} = this.state;
    if (value.length === 0) return false;
    const {selectedReflection} = this.props;
    const custom = _.get(selectedReflection, ['data', 'custom'], []);
    console.log({custom});
    const find = DiscoverValues.concat(custom).find(
      i => i.value.toLowerCase() === value.toLowerCase(),
    );
    if (find) {
      return false;
    } else {
      return true;
    }
  };

  validatePhrase = () => {
    return this.state.phrase.length > 0;
  };

  validateImage = () => {
    return this.state.image.length > 0;
  };

  render() {
    const {t, selectedReflection} = this.props;
    const {submitted, value, phrase, image} = this.state;
    if (!selectedReflection) return null;
    const isErrorValue = !this.validateValue();
    const isErrorPhrase = !this.validatePhrase();
    const isErrorImage = !this.validateImage();
    return (
      <MCRootView>
        <MCHeader
          title={t('title_add_value')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <MCCard p={1}>
            <MCCard shadow br={1} p={10} style={{width: '100%'}}>
              <MCTextFormInput
                style={{width: dySize(333)}}
                placeholder={t('placeholder_type_value_title')}
                placeholderTextColor="gray"
                textAlignVertical="top"
                value={value}
                onChange={text => this.setState({value: text})}
                submitted={submitted}
                errorText={t('error_input_empty_or_duplicated')}
                isInvalid={isErrorValue}
                maxLength={40}
                mb={0}
              />
            </MCCard>
            <MCView ph={10} pv={10}>
              <MCTextFormInput
                style={{width: dySize(333)}}
                placeholder={t('add_value_phrase')}
                placeholderTextColor="gray"
                multiline
                textAlignVertical="top"
                maxHeight={300}
                value={phrase}
                onChange={text => this.setState({phrase: text})}
                submitted={submitted}
                errorText={t('error_input_required')}
                isInvalid={isErrorPhrase}
              />
              <MCView width={340} align="center" mt={50}>
                <MCImagePicker
                  width={150}
                  height={150}
                  image={image}
                  onSelectImage={img => this.setState({image: img.path})}
                  type="picture"
                  br={10}
                />
                {submitted && isErrorImage && (
                  <ErrorText>{t('error_input_required')}</ErrorText>
                )}
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
  selectedReflection: selector.reflections.getSelectedReflection(state),
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  setLoading: routerActions.setLoading,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditValueScreen),
);
