import React from 'react';
import {Linking, ScrollView} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';

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
import {BookImgage} from 'assets/images';
import {dySize} from 'utils/responsive';

class BookDetailScreen extends React.PureComponent {
  onPressRight = resource => {
    NavigationService.navigate('AddResource', {resource: resource});
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
    const {t, profile} = this.props;
    const resource = this.props.route.params.resource;
    const collaborators = this.props.route.params.collaborators;

    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('resource_type_book_detail')}
          hasBack
          leftIcon="arrow-left"
          hasRight
          rightIcon="edit"
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
            <MCView width={350} row>
              <H5>14 of your TrustMemebers have added this book</H5>
              <MCView row align="flex-start">
                <H6 ml={30}>+14</H6>
                <MCView
                  row
                  align="center"
                  style={{flex: 1}}
                  ml={26}
                  overflow="visible">
                  {collaborators.map(user => (
                    <MCImage
                      key={user._id}
                      image={{uri: user.avatar}}
                      round
                      width={30}
                      height={30}
                      style={{marginLeft: dySize(-25)}}
                    />
                  ))}
                </MCView>
              </MCView>
            </MCView>

            <MCView width={350} mb={30} row justify="center">
              <MCView align="center" style={{flex: 1}}>
                <H4 underline>{t('resource_type_book_impact')}</H4>
                <MCBookTagsView
                  tags={resource.data.impacts}
                  impact={true}
                  collaborators={collaborators}
                  t={t}
                />
              </MCView>
              <MCView align="center" style={{flex: 1}}>
                <H4 underline>{t('resource_type_book_skill')}</H4>
                <MCBookTagsView
                  tags={resource.data.skills}
                  collaborators={collaborators}
                  t={t}
                />
              </MCView>
            </MCView>
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
  allUsers: state.usersReducer.allUsers,
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
