import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import moment from 'moment';

import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, H5} from 'components/styled/Text';
import {
  MCHeader,
  MCTagInput,
  MCTextFormInput,
  MCIcon,
  MCReadMoreText,
} from 'components/common';
import {dySize} from 'utils/responsive';
import {ResourceTypes, skills, impacts} from 'utils/constants';
import {validURL} from 'services/operators';
import {BookImgage} from 'assets/images';

const BookIcon = styled(FastImage)`
  width: ${dySize(100)}px;
  height: ${dySize(130)}px;
  resize-mode: contain;
`;

class AddResourceScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      flagMore: false,
      resource: null,
      selectedImpacts: [],
      selectedSkills: [],
      tags: [],
    };
  }

  componentDidMount() {
    if (this.props.route.params) {
      const resource = this.props.route.params.resource;
      this.setState({resource: resource});
    }
  }

  updateTagState = state => {
    const {selectedSkills} = this.state;
    const newSkills = [...selectedSkills];
    state.tagsArray.forEach((tag, index) => {
      if (newSkills.indexOf(tag) > -1) {
        state.tagsArray.splice(index, 1);
      } else {
        newSkills.push(tag);
      }
    });
    const newTags = [...state.tagsArray];
    this.setState({tags: newTags});
    this.props.updateSelectedResource({tags: newTags});
  };

  updateSelectedImpacts = impact => {
    const {selectedImpacts} = this.state;
    const newImpacts = [...selectedImpacts];
    const index = newImpacts.indexOf(impact);
    if (index >= 0) {
      newImpacts.splice(index, 1);
    } else {
      newImpacts.push(impact);
    }
    this.setState({selectedImpacts: newImpacts});
    this.props.updateSelectedResource({impacts: newImpacts});
  };

  updateSelectedSkills = skill => {
    const {selectedSkills} = this.state;
    const newSkills = Object.assign([], selectedSkills);
    const index = newSkills.indexOf(skill);
    if (index >= 0) {
      newSkills.splice(index, 1);
    } else {
      newSkills.push(skill);
    }
    this.setState({selectedSkills: newSkills});
    this.props.updateSelectedResource({skills: newSkills});
  };

  onPressRight = () => {
    const {selectedResource, createResources, updateResources} = this.props;
    console.log(selectedResource);
    this.setState({submitted: true});
    if (!this.validateTitle()) return;
    if (!this.validateLink()) return;
    if (selectedResource._id && selectedResource._id.length < 20) {
      // create resource
      createResources([selectedResource]);
    } else {
      updateResources([selectedResource]);
    }
  };

  validateTitle = () => {
    return (
      this.props.selectedResource.title &&
      this.props.selectedResource.title.length > 0
    );
  };

  validateLink = () => {
    return validURL(this.props.selectedResource.link);
  };

  render() {
    const {
      submitted,
      flagMore,
      resource,
      selectedImpacts,
      selectedSkills,
    } = this.state;
    const {t, selectedResource, updateSelectedResource} = this.props;
    const {title, link, type, tags} = selectedResource;
    isErrorTitle = !this.validateTitle();
    isErrorLink = !this.validateLink();

    return (
      <MCRootView>
        <MCHeader
          title={
            resource && resource._id
              ? t('resources_edit_headerTitle')
              : t('resources_add_headerTitle')
          }
          rightIcon="cloud-upload-alt"
          hasRight
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(15)}}>
          {resource ? (
            <MCView width={350} row justify="center" mb={30}>
              <MCView mr={20}>
                <BookIcon source={BookImgage} />
              </MCView>

              <MCView width={210}>
                <H3 weight="bold">{resource.title}</H3>
                <H5>
                  {t('resource_type_book_released')}:{' '}
                  {moment(resource.released).format('MM/DD/YYYY')}
                </H5>
                <H5>
                  {t('resource_type_book_length')}: {resource.length}
                </H5>
                <H5>
                  {t('resource_type_book_page')}: {resource.pages} pg
                </H5>
              </MCView>
            </MCView>
          ) : (
            <>
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
                    key={rt.type}
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
            </>
          )}

          <MCView>
            <MCView row wrap>
              <H3 mt={20} mb={5}>
                {t('resources_how')}
              </H3>
              <H3 mt={20} mb={5} underline>
                {t('resource_type_book_impact')}
              </H3>
              <H3 mt={20} mb={5}>
                {t('resources_to_you')}?
              </H3>
            </MCView>
            <MCView row wrap>
              {impacts.map((impact, index) => (
                <MCButton
                  key={index}
                  onPress={() => this.updateSelectedImpacts(impact)}
                  row
                  align="center"
                  background="#6f4c4b"
                  mr={5}
                  mb={5}
                  style={{
                    opacity: selectedImpacts.indexOf(impact) > -1 ? 1 : 0.5,
                  }}>
                  <H4>{impact}</H4>
                </MCButton>
              ))}
            </MCView>
          </MCView>
          <MCView>
            <MCView row wrap>
              <H3>{t('resources_personal_development')}</H3>
              <H3 underline>{t('resource_type_book_skills').toLowerCase()}</H3>
              <H3>{t('resources_focuses_on')}:</H3>
            </MCView>
            <MCView row wrap>
              {skills.map((skill, index) => (
                <MCButton
                  key={index}
                  onPress={() => this.updateSelectedSkills(skill)}
                  row
                  align="center"
                  background="#3d5164"
                  mr={5}
                  mb={5}
                  style={{
                    opacity: selectedSkills.indexOf(skill) > -1 ? 1 : 0.5,
                  }}>
                  <H4>{skill}</H4>
                </MCButton>
              ))}
            </MCView>

            <MCButton
              onPress={() => this.setState({flagMore: !flagMore})}
              row
              align="center"
              mr={5}
              mb={5}>
              <MCReadMoreText>
                <H5>{t('button_more')}...</H5>
              </MCReadMoreText>
            </MCButton>
          </MCView>
          {flagMore && (
            <MCTagInput tags={tags} updateState={this.updateTagState} />
          )}
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
