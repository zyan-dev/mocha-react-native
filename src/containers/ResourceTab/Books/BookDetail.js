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
    const {allResources} = this.props;

    if (from === 'global') {
      allResources.map(item => {
        if (item.title === resource.data.title) {
          this.setState({bookInfo: item}, () => {
            const groupImpacts = _.groupBy(
              this.state.bookInfo.data,
              v => v.data.impacts,
            );
            const impactsArray = [];
            Object.keys(groupImpacts).forEach(impact => {
              const data = {
                [impact]: groupImpacts[impact].map(
                  ({ownerAvatar}) => ownerAvatar,
                ),
              };
              impactsArray.push(data);
            });

            const mapping = [];
            this.state.bookInfo.data.map(book => {
              book.data.skills.map(skill => {
                const item = {
                  avatar: book.ownerAvatar,
                  skill: skill,
                };
                mapping.push(item);
              });
            });

            const groupSkills = _.groupBy(mapping, v => v.skill);
            const skillsArray = [];
            Object.keys(groupSkills).forEach(skill => {
              const data = {
                [skill]: groupSkills[skill].map(({avatar}) => avatar),
              };
              skillsArray.push(data);
            });
            this.setState({impactsArray: impactsArray});
            this.setState({skillsArray: skillsArray});
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

  render() {
    const {t, theme} = this.props;
    const {bookInfo, impactsArray, skillsArray} = this.state;
    const {from, resource} = this.props.route.params;
    const index = impacts.findIndex(
      impact => impact.key === resource.data.impacts,
    );

    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('resource_type_book_detail')}
          hasBack
          leftIcon="arrow-left"
          hasRight
          rightIcon={from == 'my-resource' ? 'edit' : 'plus'}
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
              {from === 'global' && bookInfo && (
                <>
                  <H5>
                    {bookInfo.ownerInfo.length} of user
                    {bookInfo.ownerInfo.length > 1 && 's'} have added this book
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
                              <H4 weight="bold" color={theme.colors.background}>
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

              {/* {from !== 'global' && trustMemebers.length > 0 && (
                <>
                  <H5>
                    {trustMemebers.length} of your TrustMemebers have added this
                    book
                  </H5>
                  <MCView row align="flex-start">
                    {trustMemebers.slice(0, 3).map((avatar, index) => {
                      return (
                        <>
                          <MCImage
                            key={index}
                            image={{uri: avatar}}
                            round
                            width={30}
                            height={30}
                            style={{marginLeft: dySize(25)}}
                          />
                          {trustMemebers.length > 3 && index == 2 && (
                            <MCView
                              width={30}
                              height={30}
                              bordered
                              br={15}
                              background={theme.colors.text}
                              align="center"
                              justify="center"
                              style={{opacity: 0.8}}>
                              <H4 weight="bold" color={theme.colors.background}>
                                +{trustMemebers.length - 3}
                              </H4>
                            </MCView>
                          )}
                        </>
                      );
                    })}
                  </MCView>
                </>
              )} */}
            </MCView>

            {from == 'global' ? (
              <MCView width={350} mb={30} row justify="center">
                <MCView align="center" style={{flex: 1}}>
                  <H4 underline>{t('resource_type_book_impact')}</H4>
                  {impactsArray.map(item => (
                    <MCBookTagsView
                      tags={[impacts[parseInt(Object.keys(item) - 1)]]}
                      impact={true}
                      users={item[Object.keys(item)]}
                      t={t}
                      theme={theme}
                    />
                  ))}
                </MCView>
                <MCView align="center" style={{flex: 1}}>
                  <H4 underline>{t('resource_type_book_skill')}</H4>
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
            ) : (
              <MCView width={350} mb={30} row justify="center">
                <MCView align="center" style={{flex: 1}}>
                  <H4 underline>{t('resource_type_book_impact')}</H4>
                  <MCBookTagsView tags={[impacts[index]]} impact={true} t={t} />
                </MCView>
                <MCView align="center" style={{flex: 1}}>
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
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  bookmarkResource: resourceActions.bookmarkResource,
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookDetailScreen),
);
