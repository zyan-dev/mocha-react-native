import React from 'react';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {H1, H2, H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

class CompletedFeedbackScreen extends React.Component {
  render() {
    const {t} = this.props;
    return (
      <MCRootView>
        <MCView width={320} align="center">
          <H2>{t('congrats')}</H2>
          <H2>{t('completed_feedback_title')}</H2>
          <H1>{t('completed_emojis')}</H1>
          <H3 mt={30} align="center">
            {t('completed_feedback_displayText')}
          </H3>
        </MCView>
        <MCButton
          mt={80}
          bordered
          width={300}
          align="center"
          onPress={() => {
            NavigationService.navigate('AddTabHome');
            NavigationService.navigate('TabProfile', {screen: 'Profile'});
            setTimeout(() => {
              NavigationService.navigate('Feedbacks');
            });
          }}>
          <H3>{t('button_go_to_feedback_list')}</H3>
        </MCButton>
        <MCButton
          width={300}
          bordered
          mt={20}
          align="center"
          onPress={() => NavigationService.goBack()}>
          <H3>{t('button_request_another_feedback')}</H3>
        </MCButton>
      </MCRootView>
    );
  }
}

export default withTranslation()(CompletedFeedbackScreen);
