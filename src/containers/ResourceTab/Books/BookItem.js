import React from 'react';
import {Linking, Clipboard, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';

import {MCView} from 'components/styled/View';
import {MCBookTagsView, MCIcon} from 'components/common';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {BookImgage} from 'assets/images';
import {showAlert} from 'services/operators';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

const BookIcon = styled(FastImage)`
  width: ${dySize(50)}px;
  height: ${dySize(60)}px;
  resize-mode: contain;
`;

class BookItem extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    onPressBookmark: PropTypes.func,
    onPressEdit: PropTypes.func,
    onPressRemove: PropTypes.func,
  };

  static defaultProps = {
    onPressBookmark: () => undefined,
    onPressEdit: () => undefined,
    onPressRemove: () => undefined,
    editable: true,
  };

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

  onPressBrowser = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  onPressCopyLink = link => {
    const {t} = this.props;
    Clipboard.setString(link);
    showAlert(t('clipboard_link_saved'));
  };

  onPressBookmark = resource => {
    this.props.onPressBookmark(resource._id);
  };

  goDetailpage = resource => {
    NavigationService.navigate('BookDetail', {resource: resource});
  };

  render() {
    const {t, resource, theme} = this.props;
    const {collaborators} = this.state;

    return (
      <MCView
        key={resource._id}
        width={160}
        bordered
        align="center"
        br={10}
        mt={30}
        ml={8}
        mr={8}
        ph={5}
        pv={5}>
        <MCButton onPress={() => this.goDetailpage(resource)}>
          <MCView row justify="space-between" align="flex-start">
            <H3 weight="bold">{resource.title}</H3>
            <MCIcon type="FontAwesome5" name="plus" size={16} />
          </MCView>
          <H5>
            {t('resource_type_book_by')} {resource.author}
          </H5>
          <MCView mt={15} mb={15}>
            <MCView align="flex-end">
              <H5 align="right">
                {t('resource_type_book_released')}:{' '}
                {moment(resource.released).format('MM/DD/YYYY')}
              </H5>
            </MCView>
            <MCView row justify="space-around">
              <BookIcon source={BookImgage} />
              <MCView width={90} align="flex-end">
                <H5>
                  {t('resource_type_book_length')}: {resource.length}
                </H5>
                <H5>
                  {t('resource_type_book_page')}: {resource.pages} pg
                </H5>
              </MCView>
            </MCView>
          </MCView>
        </MCButton>
        <MCView height={2} bordered mb={10} width={120} />
        <Swiper
          loop={false}
          showsButtons={false}
          dot={<MCView width={8} height={8} mr={5} bordered br={4} />}
          activeDot={
            <MCView
              width={8}
              height={8}
              bordered
              br={4}
              mr={5}
              background={theme.colors.text}
            />
          }
          style={{
            height: 220,
            zIndex: 9999,
          }}>
          <ScrollView>
            <MCView align="center" style={{flex: 1}}>
              <H4 underline>{t('resource_type_book_impact')}</H4>
              <MCBookTagsView
                tags={resource.impact}
                impact={true}
                collaborators={collaborators}
              />
            </MCView>
          </ScrollView>
          <ScrollView>
            <MCView align="center" style={{flex: 1}}>
              <H4 underline>{t('resource_type_book_skills')}</H4>
              <MCBookTagsView
                tags={resource.skills}
                collaborators={collaborators}
              />
            </MCView>
          </ScrollView>
        </Swiper>
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(BookItem),
);
