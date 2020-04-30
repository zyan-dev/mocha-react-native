import React from 'react';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';

import {MCRootView, MCView} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H2, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {WelcomeOnboardImage3} from 'assets/images';
import {getStringWithOutline} from 'services/operators';
import {mochaValues} from 'utils/constants';
import {dySize} from 'utils/responsive';

class WelcomeOnboardSecond extends React.PureComponent {
  MochaValue = {
    title: i18next.t('welcome_onboard_second_text_3', {
      bold: i18next.t('mocha'),
    }),
    boldWordKeys: ['mocha'],
  };

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
            image={WelcomeOnboardImage3}
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
          <MCView align="center" mt={15}>
            {getStringWithOutline(this.MochaValue, 'center', true, false)}
          </MCView>
          <MCView column align="center">
            <MCView row justify="center" align="center" mt="10">
              <MCView bordered br="20" mr="10" ph="10">
                <H4>{t('mocha_value_Trust')}</H4>
              </MCView>
              <H4>&</H4>
              <MCView bordered br="20" ml="10" ph="10">
                <H4>{t('mocha_value_Empathy')}</H4>
              </MCView>
            </MCView>
            <MCView row justify="center" align="center" mt="10">
              <MCView bordered br="20" mr="10" ph="10">
                <H4>{t('mocha_value_Connection')}</H4>
              </MCView>
              <H4>&</H4>
              <MCView bordered br="20" ml="10" ph="10">
                <H4>{t('mocha_value_Understanding')}</H4>
              </MCView>
            </MCView>
            <MCView row justify="center" align="center" mt="10">
              <MCView bordered br="20" mr="10" ph="10">
                <H4>{t('mocha_value_Competition')}</H4>
              </MCView>
              <H4>&</H4>
              <MCView bordered br="20" ml="10" ph="10">
                <H4>{t('mocha_value_Collaboration')}</H4>
              </MCView>
            </MCView>
          </MCView>
          <H4 mt={15} align="center">
            {t('welcome_onboard_second_text_4')}
          </H4>
          <MCView style={{flex: 1}} justify="center">
            <H2>{t('welcome_onboard_second_core_text')}</H2>
          </MCView>
          <MCView height={2} bordered mb={20} width={150} />
        </MCView>
      </MCRootView>
    );
  }
}

export default withTranslation()(WelcomeOnboardSecond);
