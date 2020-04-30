import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H3, H2, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {WelcomeOnboardImage1} from 'assets/images';
import {routerActions, otherActions} from 'Redux/actions';

class WelcomeOnboardThird extends React.PureComponent {
  onPressBegin = () => {
    this.props.setNewUser(false);
    this.props.trackEvent({event: 'Welcome to Mocha'});
    NavigationService.navigate('mainStack');
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCView
          style={{flex: 1}}
          bordered
          br={60}
          ph={20}
          mt={40}
          mb={40}
          align="center"
          width={dySize(300)}>
          <MCImage
            image={WelcomeOnboardImage1}
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
            <H4 align="center">{t('welcome_onboard_third_text_1')}</H4>
            <H4 mt={15} align="center">
              {t('welcome_onboard_third_text_2')}
            </H4>
            <H4 mt={15} align="center">
              {t('welcome_onboard_third_text_3')}
            </H4>
            <H4 mt={15} align="center">
              {t('welcome_onboard_third_text_4')}
            </H4>
          </MCContent>
          <MCView justify="center" mt={10} mb={20}>
            <H2>{t('welcome_onboard_third_core_text')}</H2>
          </MCView>
          <MCView height={2} bordered width={150} />
          <MCView height={80} justify="center">
            <MCButton
              align="center"
              bordered
              width={200}
              onPress={() => this.onPressBegin()}>
              <H3>Let's begin.</H3>
            </MCButton>
          </MCView>
        </MCView>
      </MCRootView>
    );
  }
}

const mapDispatchToProps = {
  setNewUser: routerActions.setNewUser,
  trackEvent: otherActions.trackEvent,
};

export default withTranslation()(
  connect(
    undefined,
    mapDispatchToProps,
  )(WelcomeOnboardThird),
);
