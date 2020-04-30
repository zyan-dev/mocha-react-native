import React from 'react';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';

import {MCRootView, MCView} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H2, H3, H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {WelcomeOnboardImage2} from 'assets/images';
import {getStringWithOutline} from 'services/operators';

class WelcomeOnboardFirst extends React.PureComponent {
  MochaMeanQuestion = {
    title: i18next.t('welcome_onboard_first_text_1', {
      bold: i18next.t('mocha'),
    }),
    boldWordKeys: ['mocha'],
  };

  MochaMeanAnswer = {
    title: i18next.t('welcome_onboard_first_text_2', {
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
            image={WelcomeOnboardImage2}
            width={200}
            height={200}
            br={10}
          />
          <MCView align="center" mt={30}>
            {getStringWithOutline(
              this.MochaMeanQuestion,
              'center',
              true,
              false,
            )}
          </MCView>
          <MCView align="center" mt={15}>
            {getStringWithOutline(this.MochaMeanAnswer, 'center', true, false)}
          </MCView>
          <H4 mt={30} align="center">
            {t('welcome_onboard_first_text_3')}
          </H4>
          <H4 mt={30} align="center">
            {t('welcome_onboard_first_text_4')}
          </H4>
          <MCView style={{flex: 1}} justify="center">
            <H2>{t('welcome_onboard_first_core_text')}</H2>
          </MCView>
          <MCView height={2} bordered mb={20} width={150} />
        </MCView>
      </MCRootView>
    );
  }
}

export default withTranslation()(WelcomeOnboardFirst);
