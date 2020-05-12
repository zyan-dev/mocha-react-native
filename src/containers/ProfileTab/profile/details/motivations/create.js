import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCHeader, MCImagePicker, MCTextFormInput} from 'components/common';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {dySize} from 'utils/responsive';
import {H3} from 'components/styled/Text';

class CreateMotivationScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onPressRight = () => {
    this.setState({submitted: true});
    if (!this.validateTitle()) return;
    if (!this.validateDescription()) return;
    this.props.addOrUpdateReflection();
  };

  validateTitle = () => {
    const {selectedReflection} = this.props;
    const title = _.get(selectedReflection, ['data', 'title'], '');
    return title.length > 0;
  };

  validateDescription = () => {
    const {selectedReflection} = this.props;
    const description = _.get(selectedReflection, ['data', 'description'], '');
    return description.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, selectedReflection, updateSelectedReflection} = this.props;
    if (!selectedReflection) return null;
    const title = _.get(selectedReflection, ['data', 'title'], '');
    const description = _.get(selectedReflection, ['data', 'description'], '');
    const image = _.get(selectedReflection, ['data', 'image'], '');
    const isErrorTitle = !this.validateTitle();
    const isErrorDescription = !this.validateDescription();

    return (
      <MCRootView>
        <MCHeader
          title={t('motivation_edit_headerTitle')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <MCTextFormInput
            label={t('label_title')}
            value={title}
            onChange={text => updateSelectedReflection({title: text})}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorTitle}
          />
          <MCTextFormInput
            label={t('label_description')}
            multiline
            value={description}
            textAlignVertical="top"
            onChange={text => updateSelectedReflection({description: text})}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorDescription}
          />
          <MCView align="center" mt={50}>
            <MCImagePicker
              width={150}
              height={150}
              image={image}
              onSelectImage={img => updateSelectedReflection({image: img.path})}
              type="picture"
              br={10}
            />
            <H3 align="center" width={240} mt={30}>
              {t('motivation_image_placeholder')}
            </H3>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
});

const mapDispatchToProps = {
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CreateMotivationScreen),
);
