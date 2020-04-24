import React from 'react';
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

  onPressRight = () => {
    NavigationService.navigate('AddResource');
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
          onPressRight={() => this.onPressRight()}
        />
        <MCContent>
          <MCView ph={10} pv={10} align="center">
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
            <MCView height={1} bordered mb={10} width={350} />
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

            <MCView width={350} row justify="center" mb={30}>
              <MCView align="center" style={{flex: 1}}>
                <H4 underline>{t('resource_type_book_impact')}</H4>
                <MCBookTagsView
                  tags={resource.impact}
                  impact={true}
                  collaborators={collaborators}
                />
              </MCView>
              <MCView align="center" style={{flex: 1}}>
                <H4 underline>{t('resource_type_book_skills')}</H4>
                <MCBookTagsView
                  tags={resource.skills}
                  collaborators={collaborators}
                />
              </MCView>
            </MCView>
            <MCView height={1} bordered mb={10} width={350} />
            <MCView width={300} justify="center" align="flex-end">
              <H5 align="center">
                Humans are social creatures: In this simple and obvious fact
                lies both the problem and the solution to the current crisis of
                loneliness. In his groundbreaking book, the 19th surgeon general
                of the United States Dr. Vivek Murthy makes a case for
                loneliness as a public health concern: a root cause and
                contributor to
              </H5>
              <MCReadMoreText>
                <H5>{t('button_read_more')}...</H5>
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
