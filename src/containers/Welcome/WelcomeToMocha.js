import React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {H2, H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';
import NavigationService from 'navigation/NavigationService';

class WelcomeToMocha extends React.PureComponent {
  render() {
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader hasBack={false} />
        <WideOvalGreenImage opacity={0.5} />
        <WideOvalYellowImage opacity={0.5} />
        <H2 mt={40} weight="bold">
          {t('welcome_title')}
        </H2>
        <H4 weight="italic" align="center" ph={60}>
          {t('welcome_title_description')}
        </H4>
        <MCView style={{flex: 1}} />
        <H4 weight="bold" mb={10}>
          {t('welcome_title_start')}
        </H4>
        <MCButton
          br={20}
          height={40}
          background={theme.colors.outline}
          align="center"
          pl={20}
          pr={20}
          onPress={() => NavigationService.navigate('VerificationStack')}>
          <H3 color={theme.colors.background}>
            {t('welcome_button_community')}
          </H3>
        </MCButton>
        <H5 weight="italic">{t('welcome_label_require_sms')}</H5>
        <MCButton
          br={20}
          mt={30}
          mb={100}
          height={40}
          background={theme.colors.outline}
          align="center"
          pl={20}
          pr={20}
          onPress={() => NavigationService.navigate('mainStack', {index: 3})}>
          <H3 color={theme.colors.background}>
            {t('welcome_button_self_knowledge')}
          </H3>
        </MCButton>
      </MCRootView>
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
  )(WelcomeToMocha),
);
