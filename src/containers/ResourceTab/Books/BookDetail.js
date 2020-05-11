import React from 'react';
import {ScrollView} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import {routerActions, resourceActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {
  MCHeader,
  MCBookTagsView,
  MCReadMoreText,
  MCImage,
} from 'components/common';
import {H3, H4, H5, H6} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';
import {BookImgage} from 'assets/images';
import {dySize} from 'utils/responsive';

const BookIcon = styled(FastImage)`
  width: ${dySize(100)}px;
  height: ${dySize(130)}px;
  resize-mode: contain;
`;

class BookDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collaborators: [
        {
          _id: '5e2609b3a9834d7b0216fb8b',
          phone: '+380639348839',
          created: '2020-01-20T20:12:35.726Z',
          updated: '2020-04-21T09:27:58.540Z',
          __v: 0,
          name: 'viacheslav',
          avatar:
            'https://mochaassets.s3.amazonaws.com/uploads%2Funregistered%2Favatar_02-07-2020_01%3A11%3A24.jpg',
          user_id: 'Vstiger',
          pushToken:
            'dssxgs8YUy0:APA91bFxAC0vWsmRMstnDkdoEqxnDLEwazZPbEWQduWji1WUV7M5aywMtx8gZ5XHXP8oJddnlQ5TTUal1BYXjNzHxUyeIS_x2UiVgvNZLT1v_BWsjFYWj6c8dQWbb0bYR-0_EnoXA3Bv',
          bio: 'I am full stack engineer',
          email: 'via.sadovoy@mail.com',
          namepronoun: 'Viacheslav',
          neighborhood: 'Hlevakha, UK',
          preferredtobecalled: 'via',
          points: 0,
        },
        {
          _id: '5e300069aed5197aa96a42f9',
          phone: '+112133061472',
          created: '2020-01-28T09:35:37.014Z',
          updated: '2020-02-10T08:52:47.908Z',
          __v: 0,
          avatar:
            'https://mochaassets.s3.amazonaws.com/uploads%2Funregistered%2Favatar_02-05-2020_23%3A23%3A11.jpg',
          name: 'Francisco Dotti',
          user_id: 'franciscodotti',
          pushToken: 'ExponentPushToken[fVZ2_IExuDI_A4iI8_hiWP]',
        },
        {
          _id: '5e307be7aed5197aa96a430b',
          phone: '+18054599608',
          created: '2020-01-28T18:22:31.135Z',
          updated: '2020-04-02T21:53:16.378Z',
          __v: 0,
          avatar:
            'https://mochaassets.s3.amazonaws.com/uploads%2FDavid+Hansen%2Favatar_04-02-2020_14%3A53%3A15.jpg',
          email: 'david.c.hansen4@gmail.com',
          name: 'David Hansen',
          namepronoun: 'Day vid',
          neighborhood: 'Petaluma',
          points: 0,
          preferredpronoun: 'He',
          preferredtobecalled: 'David',
          pushToken:
            'dxnx0bghSwak0Id6o8bmni:APA91bHjx1he56-_FD2FGlsYfJoRkxBEuevZ0_aBmnfoMuhPR2FMNLP58yu1EYvKPFJ_z1pC_mX2LuMqfPl4lp-09FjizPvx1GxL6cN3o6Cz8eYjlSbmbk5dqQnEVrS96ACUxbYWljS2',
          user_id: 'DHansen',
        },
      ],
    };
  }

  onPressRight = resource => {
    NavigationService.navigate('AddResource', {resource: resource});
  };

  render() {
    const {t, profile} = this.props;
    const {collaborators} = this.state;
    const resource = this.props.route.params.resource;

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
                {resource.data.authors.map((item, index) => (
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
                  {resource.data.genre.map((item, index) => (
                    <H5 ml={10} key={index}>
                      {item}
                    </H5>
                  ))}
                </MCView>
              </MCView>
            </MCView>
            {resource.data.buyLink && (
              <MCView>
                <H5 weight="bold">{t('resource_type_book_buy_link')}</H5>
                <H5 ml={10}>{resource.data.buyLink}</H5>
              </MCView>
            )}
            {resource.data.readLink && (
              <MCView>
                <H5 weight="bold">{t('resource_type_book_read_link')}</H5>
                <H5 ml={10}>{resource.data.readLink}</H5>
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

            <MCView mb={30} style={{maxHeight: 300, height: 'auto'}}>
              <ScrollView>
                <MCView width={350} row justify="center">
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
                    <H4 underline>{t('resource_type_book_skills')}</H4>
                    <MCBookTagsView
                      tags={resource.data.skills}
                      collaborators={collaborators}
                      t={t}
                    />
                  </MCView>
                </MCView>
              </ScrollView>
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
