import React from 'react';
import {Linking, Clipboard, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';

import {MCView, MCCard} from 'components/styled/View';
import {MCReadMoreText, MCBookTagsView, MCIcon} from 'components/common';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {BookImgage} from 'assets/images';
import {showAlert} from '../../services/operators';
import {dySize} from 'utils/responsive';

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

  render() {
    const {t, resource, theme} = this.props;
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
        pv={5}
        >
        <MCView>
          <MCView row justify="space-between" align="flex-start">
            <H3 weight="bold">{resource.title}</H3>
            <MCIcon
              type="FontAwesome5"
              name="plus"
              size={16}/>
          </MCView>
          <H5>by {resource.author}</H5>
          <MCView mt={15} mb={15}>
            <MCView align="flex-end">
              <H5 align="right">
                Released: {moment(resource.released).format('MM/DD/YYYY')}
              </H5>
            </MCView>
            <MCView row justify="space-around">
              <BookIcon source={BookImgage} />
              <MCView width={90} align="flex-end">
                <H5>Length: {resource.length}</H5>
                <H5>Pages: {resource.pages} pg</H5>
              </MCView>
            </MCView>
          </MCView>
        </MCView>
        <MCView height={2} bordered mb={10} width={120} />
        <Swiper
          loop={false}
          showsButtons={false}
          dot={<MCView width={8} height={8} mr={5} bordered br={4}/>}
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
            height: 220
          }}>
          <ScrollView>
            <MCView align="center" style={{flex: 1}}>
              <H4 underline>Impact</H4>
              <MCBookTagsView tags={resource.impact} impact={true}/>
            </MCView>
          </ScrollView>
          <ScrollView>
            <MCView align="center" style={{flex: 1}}>
              <H4 underline>Skills</H4>
              <MCBookTagsView tags={resource.skills} />
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
    undefined
  )(BookItem)
);
