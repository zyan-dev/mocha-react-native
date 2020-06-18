import React from 'react';
import {Linking, ScrollView} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import {routerActions, resourceActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {
  MCHeader,
  MCBookTagsView,
  MCReadMoreText,
  MCImage,
  MCIcon,
} from 'components/common';
import {H3, H4, H5, H6} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {skills, impacts} from 'utils/constants';

class BookDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: null,
      impactsArray: [],
      skillsArray: [],
    };
  }

  componentDidMount() {
    const {from, resource} = this.props.route.params;
    const {allResources, bookmarkedResources, searchedResources} = this.props;

    if (from === 'global' || from === 'bookmark' || from == 'search') {
      let resources = allResources;
      if (from === 'bookmark') {
        resources = bookmarkedResources;
      }
      if (from === 'search') {
        resources = searchedResources;
      }

      // if (from === 'recommended') {
      //   resources = recommendedResources;
      // }

      resources.map(item => {
        if (item.title === resource.data.title) {
          this.setState({bookInfo: item}, () => {
            const mappingImpacts = [];
            this.state.bookInfo.data.forEach(book => {
              book.data.impacts &&
                book.data.impacts.forEach(impact => {
                  const item = {
                    avatar: book.ownerAvatar,
                    impact: impact,
                  };
                  mappingImpacts.push(item);
                });
              book.data.veryImpacts &&
                book.data.veryImpacts.forEach(impact => {
                  const item = {
                    avatar: book.ownerAvatar,
                    impact: impact,
                  };
                  mappingImpacts.push(item);
                });
              book.data.mostImpacts &&
                book.data.mostImpacts.forEach(impact => {
                  const item = {
                    avatar: book.ownerAvatar,
                    impact: impact,
                  };
                  mappingImpacts.push(item);
                });
            });

            const groupImpacts = _.groupBy(mappingImpacts, v => v.impact);
            const impactsArray = [];
            Object.keys(groupImpacts).forEach(impact => {
              const data = {
                [impact]: groupImpacts[impact].map(({avatar}) => avatar),
              };
              impactsArray.push(data);
            });

            const mappingSkills = [];
            this.state.bookInfo.data.map(book => {
              book.data.skills.map(skill => {
                const item = {
                  avatar: book.ownerAvatar,
                  skill: skill,
                };
                mappingSkills.push(item);
              });
            });

            const groupSkills = _.groupBy(mappingSkills, v => v.skill);
            const skillsArray = [];
            Object.keys(groupSkills).forEach(skill => {
              const data = {
                [skill]: groupSkills[skill].map(({avatar}) => avatar),
              };
              skillsArray.push(data);
            });

            this.setState({impactsArray});
            this.setState({skillsArray});
          });
        }
      });
    }
  }

  onPressRight = resource => {
    const {from} = this.props.route.params;
    NavigationService.navigate('AddResource', {resource: resource, from: from});
  };

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
    const {resource} = this.props.route.params;
    NavigationService.navigate('SelectRecommendMember', {resource: resource});
  };

  render() {
    const {t, theme, profile} = this.props;
    const {bookInfo, impactsArray, skillsArray} = this.state;
    const {from, resource} = this.props.route.params;
    let allImpacts = [];
    allImpacts = _.concat(
      allImpacts,
      resource.data.mostImpacts || [],
      resource.data.veryImpacts || [],
      resource.data.impacts || [],
    );

    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('resource_type_book_detail')}
          hasBack
          leftIcon="arrow-left"
          hasRight
          rightIcon={
            from == 'trust-member' && resource.owner == profile._id
              ? 'edit'
              : 'plus'
          }
          onPressRight={() => this.onPressRight(resource)}
        />
        <MCContent>
          <MCView ph={10} pv={10} align="center">
            <MCView width={350} row justify="space-between" align="flex-start">
              <MCView>
                <MCImage
                  width={120}
                  height={180}
                  image={{uri: resource.data.thumbnail}}
                  resizeMode="contain"
                />
              </MCView>
              <MCView width={170} mr={40}>
                <H3 weight="bold">{resource.data.title}</H3>
                <MCView row wrap>
                  <H5 weight="bold">{t('resource_type_book_author')}</H5>
                  {resource.data.authors &&
                    resource.data.authors.map((item, index) => (
                      <H5 key={index} ml={10}>
                        {item}
                      </H5>
                    ))}
                </MCView>
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
              {from == 'my-resource' && (
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
            {resource.data.readLink && (
              <MCView mt={10}>
                <H5 weight="bold">{t('resource_type_book_read_link')}</H5>
                <MCButton
                  onPress={() => this.onPressBrowser(resource.data.readLink)}>
                  <H5>{resource.data.readLink}</H5>
                </MCButton>
              </MCView>
            )}

            <MCView height={1} bordered width={350} mb={10} mt={10} />
            <MCView width={350} row justify="space-between">
              {(from === 'global' ||
                from === 'search' ||
                from === 'bookmark') &&
                bookInfo && (
                  <>
                    <H5>
                      {bookInfo.ownerInfo.length} of user
                      {bookInfo.ownerInfo.length > 1 && 's'} have added this
                      book
                    </H5>
                    <MCView row justify="flex-end" width={180}>
                      {bookInfo.ownerInfo.slice(0, 3).map((owner, index) => {
                        return (
                          <>
                            <MCView ml={-15}>
                              <MCImage
                                key={index}
                                image={{uri: owner.avatar}}
                                round
                                width={30}
                                height={30}
                                type="avatar"
                              />
                            </MCView>
                            {bookInfo.ownerInfo.length > 3 && index == 2 && (
                              <MCView
                                width={30}
                                height={30}
                                bordered
                                br={15}
                                background={theme.colors.text}
                                align="center"
                                justify="center"
                                ml={-14}
                                style={{opacity: 0.8}}>
                                <H4
                                  weight="bold"
                                  color={theme.colors.background}>
                                  +{bookInfo.ownerInfo.length - 3}
                                </H4>
                              </MCView>
                            )}
                          </>
                        );
                      })}
                    </MCView>
                  </>
                )}
            </MCView>

            {from == 'global' || from == 'search' || from == 'bookmark' ? (
              <MCView mb={30}>
                {impactsArray.length > 0 && (
                  <MCView width={350}>
                    <H4 underline>{t('resource_type_book_impact')}</H4>
                    <MCView row wrap>
                      {impactsArray.map(item => (
                        <MCBookTagsView
                          tags={Object.keys(item)}
                          impact={true}
                          users={item[Object.keys(item)]}
                          t={t}
                          theme={theme}
                        />
                      ))}
                    </MCView>
                  </MCView>
                )}
                {skillsArray.length > 0 && (
                  <MCView width={350}>
                    <H4 underline>{t('resource_type_book_skill')}</H4>
                    <MCView row wrap>
                      {skillsArray.map(item => (
                        <MCBookTagsView
                          tags={Object.keys(item)}
                          impact={false}
                          users={item[Object.keys(item)]}
                          t={t}
                          theme={theme}
                        />
                      ))}
                    </MCView>
                  </MCView>
                )}
              </MCView>
            ) : (
              <MCView mb={30}>
                <MCView width={350}>
                  <H4 underline>{t('resource_type_book_impact')}</H4>
                  <MCBookTagsView tags={allImpacts} impact={true} t={t} />
                </MCView>
                <MCView width={350}>
                  <H4 underline>{t('resource_type_book_skill')}</H4>
                  <MCBookTagsView tags={resource.data.skills} t={t} />
                </MCView>
              </MCView>
            )}

            <MCView height={1} bordered width={350} />
            <MCView pv={10} width={350}>
              <H5 weight="bold">{t('resource_type_book_description')}</H5>
              <MCReadMoreText>
                <H5>{resource.data.description}</H5>
              </MCReadMoreText>
            </MCView>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  allResources: state.resourceReducer.allResources,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  searchedResources: state.resourceReducer.searchedResources,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookDetailScreen),
);
