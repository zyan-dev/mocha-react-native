import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H2, H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {MochaLogo} from 'assets/images';

class WelcomeToMocha extends React.PureComponent {
  render() {
    const {t} = this.props;
    return (
      <MCRootView>
        <MCView
          style={{flex: 1}}
          bordered
          br={60}
          ph={20}
          pv={20}
          mt={60}
          mb={60}
          justify="center"
          align="center"
          width={dySize(300)}>
          <MCImage
            image={MochaLogo}
            width={200}
            height={200}
            resizeMode="contain"
          />
          <H2 mt={40}>{t('welcome_title')}</H2>
          <H4 weight="italic" align="center">
            {t('welcome_title_description')}
          </H4>
          <MCButton
            bordered
            mt={30}
            width={240}
            align="center"
            onPress={() => NavigationService.navigate('WelcomeOnboard')}>
            <H3>{t('welcome_reflectionpoints_buttons_continue')}</H3>
          </MCButton>
        </MCView>
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
