import React from 'react';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';

import {MCRootView, MCView, MCContent} from 'components/styled/View';
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
          mt={40}
          mb={40}
          justify="center"
          align="center"
          width={320}>
          <MCImage
            image={WelcomeOnboardImage2}
            width={200}
            height={200}
            br={10}
            style={{marginTop: dySize(30), marginBottom: dySize(20)}}
          />
          <MCContent
            width={320}
            contentContainerStyle={{
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <MCView align="center">
              {getStringWithOutline(
                this.MochaMeanQuestion,
                'center',
                true,
                false,
              )}
            </MCView>
            <MCView align="center" mt={15}>
              {getStringWithOutline(
                this.MochaMeanAnswer,
                'center',
                true,
                false,
              )}
            </MCView>
            <H4 mt={30} align="center">
              {t('welcome_onboard_first_text_3')}
            </H4>
            <H4 mt={30} align="center">
              {t('welcome_onboard_first_text_4')}
            </H4>
          </MCContent>
          <MCView justify="center" mt={10} mb={20}>
            <H2>{t('welcome_onboard_first_core_text')}</H2>
          </MCView>
          <MCView height={2} bordered width={150} />
          <MCView height={80} />
        </MCView>
      </MCRootView>
    );
  }
}

export default withTranslation()(WelcomeOnboardFirst);
