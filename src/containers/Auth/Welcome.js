import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {BookLightSvg, PeopleArrowSvg} from 'assets/svgs';

class FeedWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader hasBack={false} title={t('auth_welcome_community')} />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <MCView mt={70}>
            <PeopleArrowSvg size={40} color={theme.colors.text} />
          </MCView>
          <MCButton
            br={20}
            height={40}
            align="center"
            background={theme.colors.outline}
            pl={20}
            pr={20}
            mt={10}
            onPress={() => NavigationService.navigate('mainStack')}>
            <H3 color={theme.colors.background}>{t('button_peer_coaching')}</H3>
          </MCButton>
          <H4 weight="italic">{t('auth_peer_button_description')}</H4>
          <MCView mt={30}>
            <MCIcon type="FontAwesome5Pro" name="mountain" size={40} />
          </MCView>
          <MCButton
            br={20}
            height={40}
            align="center"
            background={theme.colors.outline}
            pl={20}
            pr={20}
            mt={10}
            onPress={() => NavigationService.navigate('mainStack')}>
            <H3 color={theme.colors.background}>
              {t('button_community_challenges')}
            </H3>
          </MCButton>
          <H4 weight="italic">{t('auth_challenge_button_description')}</H4>
          <MCView mt={30}>
            <BookLightSvg size={40} theme={theme} color={theme.colors.text} />
          </MCView>
          <MCButton
            br={20}
            height={40}
            align="center"
            background={theme.colors.outline}
            pl={20}
            pr={20}
            mt={10}
            onPress={() => NavigationService.navigate('mainStack')}>
            <H3 color={theme.colors.background}>
              {t('button_community_resources')}
            </H3>
          </MCButton>
          <H4 weight="italic">{t('auth_resource_button_description')}</H4>
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
