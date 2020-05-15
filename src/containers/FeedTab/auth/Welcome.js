import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {userActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {ManageTrustNetworkSvg} from 'assets/svgs';

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

  onPressSendRequest = () => {
    NavigationService.navigate('Social', {screen: 'SendRequest'});
  };

  onPressTrustNetwork = () => {
    NavigationService.navigate('Social', {screen: 'MyTrustNetwork'});
  };

  render() {
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          rightText={t('header_skip')}
          onPressRight={() => this.onSkipWelcome()}
        />
        <MCContent>
          <MCView align="center" mb={40}>
            <H3 align="center" mt={30}>
              {t('auth_welcome_displayText')}
            </H3>
            <MCButton
              bordered
              mt={30}
              mb={20}
              onPress={() => this.onPressSendRequest()}>
              <H3 align="center">{t('feed_menu_send_request')}</H3>
            </MCButton>
            <MCIcon type="FontAwesome5Pro-Light" name="paper-plane" size={70} />
            <H3 align="center" mt={50} width={300}>
              {t('auth_welcome_trustnetwork_displayText')}
            </H3>
            <MCButton
              bordered
              mt={30}
              mb={20}
              onPress={() => this.onPressTrustNetwork()}>
              <H3 align="center">{t('feed_menu_manage_trust_network')}</H3>
            </MCButton>
            <MCIcon type="FontAwesome5Pro-Light" name="handshake" size={70} />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  userToken: state.profileReducer.userToken,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(FeedWelcome),
);
