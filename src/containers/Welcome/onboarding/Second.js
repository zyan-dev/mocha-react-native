import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H2, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {WelcomeOnboardImage2} from 'assets/images';

class WelcomeOnboardSecond extends React.PureComponent {
  render() {
    const {t} = this.props;
    return (
      <MCRootView>
        <MCView
          style={{flex: 1}}
          bordered
          br={60}
          ph={20}
          pv={40}
          mt={60}
          mb={60}
          justify="center"
          align="center"
          width={dySize(300)}>
          <MCImage
            image={WelcomeOnboardImage2}
            width={200}
            height={200}
            br={10}
          />
          <H4 mt={30} align="center">
            {t('welcome_onboard_second_text_1')}
          </H4>
          <H4 mt={15} align="center">
            {t('welcome_onboard_second_text_2')}
          </H4>
          <MCView style={{flex: 1}} justify="center">
            <H2>{t('welcome_onboard_second_core_text')}</H2>
          </MCView>
          <MCView height={2} bordered mb={60} width={150} />
        </MCView>
      </MCRootView>
    );
  }
}

export default withTranslation()(WelcomeOnboardSecond);
