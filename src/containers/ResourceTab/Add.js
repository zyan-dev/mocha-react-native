import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCTagInput, MCTextFormInput} from 'components/common';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {ResourceTypes} from 'utils/constants';
import {validURL} from 'services/operators';

class AddResourceScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  updateTagState = state => {
    this.props.updateSelectedResource({tags: state.tagsArray});
  };

  onPressRight = () => {
    const {selectedResource, createResources, updateResources} = this.props;
    this.setState({submitted: true});
    if (!this.validateTitle()) return;
    if (!this.validateLink()) return;
    if (selectedResource._id.length < 20) {
      // create resource
      createResources([selectedResource]);
    } else {
      updateResources([selectedResource]);
    }
  };

  validateTitle = () => {
    return this.props.selectedResource.title.length > 0;
  };

  validateLink = () => {
    return validURL(this.props.selectedResource.link);
  };

  render() {
    const {submitted} = this.state;
    const {t, selectedResource, updateSelectedResource} = this.props;
    const {title, link, type, tags} = selectedResource;
    isErrorTitle = !this.validateTitle();
    isErrorLink = !this.validateLink();
    return (
      <MCRootView>
        <MCHeader
          title={
            selectedResource._id
              ? t('resources_edit_headerTitle')
              : t('resources_add_headerTitle')
          }
          rightIcon="cloud-upload-alt"
          hasRight
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(15)}}>
          <MCTextFormInput
            label={t('resource_input_title')}
            value={title}
            maxLength={60}
            onChange={text => updateSelectedResource({title: text})}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorTitle}
          />
          <MCTextFormInput
            label={t('resource_input_link')}
            value={link}
            maxLength={1024}
            onChange={text => updateSelectedResource({link: text})}
            submitted={submitted}
            errorText={t('error_invalid_link')}
            isInvalid={isErrorLink}
          />
          <H3 mt={20} mb={5}>
            {t('resource_select_type')}
          </H3>
          <MCView width={345} bordered row wrap br={4} ph={10} pv={10}>
            {ResourceTypes.map(rt => (
              <MCButton
                onPress={() => updateSelectedResource({type: rt.type})}
                width={160}
                row
                align="center"
                pv={5}>
                <MCIcon
                  name={
                    type === rt.type
                      ? 'ios-radio-button-on'
                      : 'ios-radio-button-off'
                  }
                />
                <H4 ml={10}>{t(`resource_type_${rt.type}`)}</H4>
              </MCButton>
            ))}
          </MCView>
          <H3 mt={20} mb={5}>
            {t('resource_input_tag')}
          </H3>
          <MCTagInput tags={tags} updateState={this.updateTagState} />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedResource: state.resourceReducer.selectedResource,
});

const mapDispatchToProps = {
  updateSelectedResource: resourceActions.updateSelectedResource,
  createResources: resourceActions.createResources,
  updateResources: resourceActions.updateResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddResourceScreen),
);
