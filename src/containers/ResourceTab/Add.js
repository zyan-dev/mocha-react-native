import React from 'react';
import {Linking} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import i18next from 'i18next';
import * as _ from 'lodash';

import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, H5} from 'components/styled/Text';
import {
  MCHeader,
  MCTagInput,
  MCReadMoreText,
  MCSearchInput,
  MCImage,
} from 'components/common';
import {dySize} from 'utils/responsive';
import {skills, impacts} from 'utils/constants';
import {getStringWithOutline} from 'services/operators';

class AddResourceScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      flagMore: false,
      selectedImpacts: [],
      selectedSkills: [],
      selectedTags: [],
      searchText: '',
    };
  }

  ResourceTypeQuestion = {
    title: i18next.t('resources_type_impact', {
      bold: i18next.t('resource_type_book_impactful'),
    }),
    boldWordKeys: ['impactful'],
  };

  PersonalDevelopmentQuestion = {
    title: i18next.t('resources_personal_development', {
      bold: i18next.t('resource_type_book_skills'),
    }),
    boldWordKeys: ['skills'],
  };

  componentDidMount() {
    const {tags, impacts, skills} = this.props.selectedResource;
    this.setState({
      selectedImpacts: impacts || [],
      selectedSkills: skills || [],
      selectedTags: tags || [],
    });

    if (this.props.route.params.resource) {
      const resource = this.props.route.params.resource;
      this.setState({resource: resource});
      this.setState({
        selectedImpacts: resource.data.impacts,
        selectedSkills: resource.data.skills,
        selectedTags: resource.data.tags,
      });
    }
  }

  updateTagState = state => {
    const {selectedSkills} = this.state;
    const newSkills = [...selectedSkills];
    state.tagsArray.forEach((tag, index) => {
      if (
        newSkills.indexOf(tag) > -1 &&
        newSkills.indexOf(`resource_manual_${tag}`) > -1
      ) {
        state.tagsArray.splice(index, 1);
      }
    });

    const newTags = [...state.tagsArray];
    this.setState({selectedTags: newTags});
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
    if (!this.props.route.params.resource) {
      if (!this.validateTitle()) return;
    }

    const {
      selectedResource,
      createResources,
      updateResources,
      searchResource,
    } = this.props;
    const {selectedImpacts, selectedSkills, selectedTags} = this.state;

    this.setState({submitted: true});
    let resource = searchResource;
    // let type;

    // if (this.props.route.params.root) {
    //   type = this.props.route.params.root.key;
    // }

    if (this.props.route.params && this.props.route.params.resource) {
      resource = this.props.route.params.resource;
      // type = resource.type;
    }

    resource.data.impacts = [...selectedImpacts];
    resource.data.tags = [...selectedTags];
    let skills = [...selectedSkills];

    if (selectedTags.length == 0) {
      skills = skills.filter(skill => skill.indexOf('resource_manual_') < 0);
    } else {
      selectedTags.forEach(tag => {
        if (
          skills.indexOf(tag) == -1 &&
          skills.indexOf(`resource_manual_${tag}`) == -1
        ) {
          skills.push(`resource_manual_${tag}`);
        }
      });
    }

    resource.data.skills = skills;

    delete resource.data.type;
    if (resource._id) {
      const data = {
        _id: resource._id,
        ...resource,
      };
      updateResources([data]);
    } else {
      const data = {
        resourceData: {
          ...resource.data,
        },
        type: 'books',
      };
      createResources([data]);
    }
    this.props.updateSelectedResource({skills: []});
    this.props.updateSelectedResource({impacts: []});
    this.props.updateSelectedResource({tags: []});
  };

  validateTitle = () => {
    const {searchResource} = this.props;
    return searchResource && searchResource.data && searchResource.data.title;
  };

  searchBook = _.debounce(() => {
    const {searchText} = this.state;
    if (searchText.length > 2) {
      const {searchResources} = this.props;
      searchResources(searchText);
    }
  }, 2000);

  onPressBrowser = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  render() {
    const {
      submitted,
      flagMore,
      selectedImpacts,
      selectedSkills,
      selectedTags,
      searchText,
    } = this.state;
    const {
      t,
      selectedResource,
      updateSelectedResource,
      searchResource,
    } = this.props;

    let resource = searchResource;

    if (this.props.route.params && this.props.route.params.resource) {
      resource = this.props.route.params.resource;
    }

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
          {resource && resource._id ? null : (
            <MCSearchInput
              placeholder={t('resource_search_book_placeholder')}
              text={searchText}
              onChange={searchText => {
                this.setState({searchText});
                this.searchBook();
              }}
            />
          )}

          {resource && resource.data && (
            <>
              <MCView width={350} row justify="space-between">
                <MCView mt={10}>
                  <MCImage
                    width={120}
                    height={170}
                    image={{uri: resource.data.thumbnail}}
                  />
                </MCView>
                <MCView width={210}>
                  <H3 weight="bold">{resource.data.title}</H3>
                  <H5 weight="bold">{t('resource_type_book_author')}</H5>
                  {resource.data.authors &&
                    resource.data.authors.map((item, index) => (
                      <H5 key={index} ml={10}>
                        {item}
                      </H5>
                    ))}
                  <MCView row>
                    <H5 weight="bold">{t('resource_type_book_released')}</H5>
                    <H5 ml={10}>{resource.data.publishDate}</H5>
                  </MCView>
                  <MCView row>
                    <H5 weight="bold">{t('resource_type_book_page')}</H5>
                    <H5 ml={10}>{resource.data.pageCount} pg</H5>
                  </MCView>
                  <MCView row>
                    <H5 weight="bold">{t('resource_type_book_genre')}</H5>
                    {resource.data.genre &&
                      resource.data.genre.map((item, index) => (
                        <H5 ml={10} key={index}>
                          {item}
                        </H5>
                      ))}
                  </MCView>
                </MCView>
              </MCView>
              <MCView mt={10}>
                <H5 weight="bold">{t('resource_type_book_description')}</H5>
                {resource.data.description &&
                resource.data.description.length > 180 ? (
                  <H5>{resource.data.description.substr(0, 170)} ...</H5>
                ) : (
                  <H5>{resource.data.description}</H5>
                )}
              </MCView>
              {resource.data.readLink && (
                <MCView>
                  <H5 weight="bold">{t('resource_type_book_read_link')}</H5>
                  <MCButton
                    onPress={() => this.onPressBrowser(resource.data.readLink)}>
                    <H5>{resource.data.readLink}</H5>
                  </MCButton>
                </MCView>
              )}
            </>
          )}
          <MCView mt={10}>
            <MCView width={350} pv={5}>
              {getStringWithOutline(this.ResourceTypeQuestion, {
                align: 'left',
                underline: true,
                bigSize: true,
              })}
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
                    opacity:
                      selectedImpacts && selectedImpacts.indexOf(impact) > -1
                        ? 1
                        : 0.5,
                  }}>
                  <H4>{t(`resource_book_impact_${impact}`)}</H4>
                </MCButton>
              ))}
            </MCView>
          </MCView>
          <MCView mt={5}>
            <MCView width={350} align="center" pv={5}>
              {getStringWithOutline(this.PersonalDevelopmentQuestion, {
                align: 'left',
                underline: true,
                bigSize: true,
              })}
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
                    opacity:
                      selectedSkills && selectedSkills.indexOf(skill) > -1
                        ? 1
                        : 0.5,
                  }}>
                  <H4>{t(`resource_book_skills_${skill}`)}</H4>
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
            <MCTagInput tags={selectedTags} updateState={this.updateTagState} />
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedResource: state.resourceReducer.selectedResource,
  searchResource: state.resourceReducer.searchResource,
});

const mapDispatchToProps = {
  updateSelectedResource: resourceActions.updateSelectedResource,
  createResources: resourceActions.createResources,
  updateResources: resourceActions.updateResources,
  searchResources: resourceActions.searchResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddResourceScreen),
);
