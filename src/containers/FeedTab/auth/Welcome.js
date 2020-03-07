import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {SignInSuccess} from 'assets/images';
import NavigationService from 'navigation/NavigationService';
import {MCContent, MCView} from '../../../components/styled/View';

const SuccessIcon = styled(FastImage)`
  width: 100px;
  height: 100px;
  margin-top: 30px;
  resize-mode: contain;
`;

class FeedWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSkipWelcome = () => {
    NavigationService.navigate('Social');
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          rightText={t('header_skip')}
          onPressRight={() => this.onSkipWelcome()}
        />
        <MCContent>
          <MCView align="center" mb={40}>
            <H3 align="center" mt={30}>
              {t('auth_welcome_displayText')}
            </H3>
            <MCButton bordered mt={30}>
              <H3 align="center">{t('feed_menu_send_request')}</H3>
            </MCButton>
            <H3 align="center" mt={50} width={300}>
              {t('auth_welcome_trustnetwork_displayText')}
            </H3>
            <MCButton bordered mt={30}>
              <H3 align="center">{t('feed_menu_manage_trust_network')}</H3>
            </MCButton>
            <SuccessIcon source={SignInSuccess} />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FeedWelcome),
);
