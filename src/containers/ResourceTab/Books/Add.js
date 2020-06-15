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
  MCIcon,
} from 'components/common';
import {dySize} from 'utils/responsive';
import {skills, impacts, veryImpacts, mostImpacts} from 'utils/constants';
import {getStringWithOutline} from 'services/operators';
import NavigationService from 'navigation/NavigationService';

class AddResourceScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      flagMore: false,
      selectedImpacts: [],
      selectedVeryImpacts: [],
      selectedMostImpacts: [],
      selectedSkills: [],
      selectedTags: [],
      searchText: '',
      added: false,
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
    const {
      tags,
      selectedImpacts,
      selectedVeryImpacts,
      selectedMostImpacts,
      skills,
    } = this.props.selectedResource;
    this.setState({
      selectedImpacts: selectedImpacts || [],
      selectedVeryImpacts: selectedVeryImpacts || [],
      selectedMostImpacts: selectedMostImpacts || [],
      selectedSkills: skills || [],
      selectedTags: tags || [],
    });
    if (this.props.route.params.resource) {
      const resource = this.props.route.params.resource;
      this.setState({resource: resource});
      this.setState({
        selectedImpacts: resource.data.impacts || [],
        selectedVeryImpacts: resource.data.veryImpacts || [],
        selectedMostImpacts: resource.data.mostImpacts || [],
        selectedSkills: resource.data.skills || [],
        selectedTags: resource.data.tags || [],
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

  updateSelectedImpacts = (type, impact) => {
    const newImpacts = Object.assign([], this.state[type]);
    const index = newImpacts.indexOf(impact);
    if (index >= 0) {
      newImpacts.splice(index, 1);
    } else {
      newImpacts.push(impact);
    }
    this.setState({[type]: newImpacts});
    this.props.updateSelectedResource({[type]: newImpacts});
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
      profile,
      selectedResource,
      createResources,
      updateResources,
      searchedResourceByTitle,
    } = this.props;
    const {
      selectedImpacts,
      selectedVeryImpacts,
      selectedMostImpacts,
      selectedSkills,
      selectedTags,
    } = this.state;
    const {from} = this.props.route.params;
    this.setState({submitted: true});
    let resource = searchedResourceByTitle;
    // let type;

    // if (this.props.route.params.root) {
    //   type = this.props.route.params.root.key;
    // }

    if (this.props.route.params && this.props.route.params.resource) {
      resource = this.props.route.params.resource;
      // type = resource.type;
    }

    resource.data.impacts = selectedImpacts;
    resource.data.veryImpacts = selectedVeryImpacts;
    resource.data.mostImpacts = selectedMostImpacts;
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

    const score =
      resource.data.impacts.length +
      resource.data.veryImpacts.length * 5 +
      resource.data.mostImpacts.length * 10;
    resource.data.score = score;

    delete resource.data.type;

    if (
      resource._id &&
      from == 'trust-member' &&
      profile._id == resource.owner
    ) {
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
        _id: resource._id,
      };
      createResources([data]);
    }
    this.props.updateSelectedResource({selectedImpacts: []});
    this.props.updateSelectedResource({selectedVeryImpacts: []});
    this.props.updateSelectedResource({selectedMostImpacts: []});
    this.props.updateSelectedResource({skills: []});
    this.props.updateSelectedResource({tags: []});
  };

  validateTitle = () => {
    const {searchedResourceByTitle} = this.props;
    return (
      searchedResourceByTitle &&
      searchedResourceByTitle.data &&
      searchedResourceByTitle.data.title
    );
  };

  searchBook = _.debounce(() => {
    const {searchText} = this.state;
    if (searchText.length > 2) {
      const {getResourceByTitle} = this.props;
      getResourceByTitle(searchText);
    }
  }, 1000);

  onPressBrowser = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  recommendResourceToMembers = () => {
    if (!this.validateTitle()) return;

    this.setState({added: !this.state.added});
    this.setState({submitted: true});
    const {selectedImpacts, selectedSkills, selectedTags} = this.state;
    const {searchedResourceByTitle} = this.props;
    let resource = searchedResourceByTitle;

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
    resource.data.impacts = selectedImpacts;

    NavigationService.navigate('SelectRecommendMember', {resource: resource});
  };

  render() {
    const {
      flagMore,
      selectedImpacts,
      selectedVeryImpacts,
      selectedMostImpacts,
      selectedSkills,
      selectedTags,
      searchText,
      added,
    } = this.state;
    const {t, searchedResourceByTitle, theme, profile} = this.props;
    const {from} = this.props.route.params;
    let resource = searchedResourceByTitle;

    if (this.props.route.params && this.props.route.params.resource) {
      resource = this.props.route.params.resource;
    }

    return (
      <MCRootView>
        <MCHeader
          title={
            resource && resource.owner == profile._id && from == 'trust-member'
              ? t('resources_edit_headerTitle')
              : t('resources_add_headerTitle')
          }
          hasRight
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
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
                <MCView width={170} mr={40}>
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
                {!resource._id && (
                  <MCView absolute style={{right: 0}}>
                    <MCButton
                      align="center"
                      onPress={() => this.recommendResourceToMembers()}>
                      <MCIcon
                        type="FontAwesome5Pro"
                        name="hand-holding-seedling"
                        size={15}
                        color={theme.colors.outline}
                      />
                    </MCButton>
                  </MCView>
                )}
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
          <MCView mt={5}>
            <MCView width={350} pv={5}>
              {getStringWithOutline(this.PersonalDevelopmentQuestion, {
                align: 'center',
                underline: true,
                bigSize: true,
              })}
            </MCView>
            <MCView row wrap justify="center">
              {skills.map((skill, index) => (
                <MCButton
                  key={index}
                  onPress={() => this.updateSelectedSkills(skill)}
                  row
                  align="center"
                  background="#FFE482"
                  mr={5}
                  mb={5}
                  style={{
                    opacity:
                      selectedSkills && selectedSkills.indexOf(skill) > -1
                        ? 1
                        : 0.5,
                  }}>
                  <H4 color="#000000">{t(`resource_book_skills_${skill}`)}</H4>
                </MCButton>
              ))}
              <MCButton
                onPress={() => this.setState({flagMore: !flagMore})}
                row
                align="center"
                ml={5}
                mt={20}>
                <MCReadMoreText>
                  <H5>{t('button_more')}...</H5>
                </MCReadMoreText>
              </MCButton>
            </MCView>
          </MCView>
          {flagMore && (
            <MCTagInput tags={selectedTags} updateState={this.updateTagState} />
          )}
          <MCView mt={10}>
            <MCView width={350} pv={5}>
              {getStringWithOutline(this.ResourceTypeQuestion, {
                align: 'center',
                underline: true,
                bigSize: true,
              })}
            </MCView>
            <MCView>
              <H4>{t('resource_book_impact_type_one')}</H4>
            </MCView>
            <MCView row wrap>
              {impacts.map((impact, index) => (
                <MCButton
                  key={index}
                  onPress={() =>
                    this.updateSelectedImpacts('selectedImpacts', impact)
                  }
                  row
                  align="center"
                  justify="center"
                  background="#C1F1D8"
                  mr={5}
                  ml={5}
                  mb={5}
                  width={160}
                  height={120}
                  style={{
                    opacity: selectedImpacts.indexOf(impact) > -1 ? 1 : 0.5,
                  }}>
                  <H4 align="center" color="#000000">
                    {t(`resource_book_impact_${impact}`)}
                  </H4>
                </MCButton>
              ))}
            </MCView>
            <MCView>
              <H4>{t('resource_book_impact_type_two')}</H4>
            </MCView>
            <MCView row wrap>
              {veryImpacts.map((impact, index) => (
                <MCButton
                  key={index}
                  onPress={() =>
                    this.updateSelectedImpacts('selectedVeryImpacts', impact)
                  }
                  row
                  align="center"
                  justify="center"
                  background="#C1F1D8"
                  mr={5}
                  ml={5}
                  mb={5}
                  width={160}
                  height={120}
                  style={{
                    opacity: selectedVeryImpacts.indexOf(impact) > -1 ? 1 : 0.5,
                  }}>
                  <H4 align="center" color="#000000">
                    {t(`resource_book_impact_${impact}`)}
                  </H4>
                </MCButton>
              ))}
            </MCView>
            <MCView>
              <H4>{t('resource_book_impact_type_three')}</H4>
            </MCView>
            <MCView row wrap>
              {mostImpacts.map((impact, index) => (
                <MCButton
                  key={index}
                  onPress={() =>
                    this.updateSelectedImpacts('selectedMostImpacts', impact)
                  }
                  row
                  align="center"
                  justify="center"
                  background="#C1F1D8"
                  mr={5}
                  ml={5}
                  mb={5}
                  width={160}
                  height={120}
                  style={{
                    opacity: selectedMostImpacts.indexOf(impact) > -1 ? 1 : 0.5,
                  }}>
                  <H4 align="center" color="#000000">
                    {t(`resource_book_impact_${impact}`)}
                  </H4>
                </MCButton>
              ))}
            </MCView>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedResource: state.resourceReducer.selectedResource,
  searchedResourceByTitle: state.resourceReducer.searchedResourceByTitle,
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  updateSelectedResource: resourceActions.updateSelectedResource,
  createResources: resourceActions.createResources,
  updateResources: resourceActions.updateResources,
  getResourceByTitle: resourceActions.getResourceByTitle,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddResourceScreen),
);
