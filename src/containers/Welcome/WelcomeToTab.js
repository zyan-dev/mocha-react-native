import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {ToolsSvg, UserSvg, UsersSvg} from 'assets/svgs';
import {dySize} from 'utils/responsive';
import {routerActions, otherActions} from 'Redux/actions';

class WelcomeToTab extends React.PureComponent {
  turnOffPoints = () => {};

  gotoMainScreen = () => {
    this.props.setNewUser(false);
    this.props.trackEvent({event: 'Welcome to Mocha'});
    NavigationService.navigate('mainStack');
  };

  render() {
    const {t, theme} = this.props;
    return (
      <MCRootView>
        <MCView p={20} align="center">
          <MCView row width={320} mt={40} align="center">
            <MCView width={40} align="center">
              <ToolsSvg size={dySize(38)} color={theme.colors.text} />
            </MCView>
            <MCView style={{flex: 1}}>
              <H3 ml={20}>
                {`${t('welcome_explain_displayTextForAdd')} `}
                <H3 weight="bold">{t('add_manual_headerTitle')}</H3>
                {t('welcome_explain_and')}
                <H3 weight="bold">{t('trustnetwork_permissions_value')}</H3>,
                <H3 weight="bold">{` ${t('concept_feedback_title')}`}</H3>
                {t('welcome_explain_andset')}
                <H3 weight="bold">{t('trustnetwork_permissions_goal')}</H3>
              </H3>
            </MCView>
          </MCView>
          <MCView row width={320} mt={40} align="center">
            <MCView width={40} align="center">
              <UserSvg size={dySize(38)} color={theme.colors.text} />
            </MCView>
            <MCView style={{flex: 1}}>
              <H3 ml={20}>{t('welcome_explain_displayTextForProfile')}</H3>
            </MCView>
          </MCView>
          <MCView row width={320} mt={40} align="center">
            <MCView width={40} align="center">
              <UsersSvg size={dySize(38)} color={theme.colors.text} />
            </MCView>
            <MCView style={{flex: 1}}>
              <H3 ml={20}>{t('welcome_explain_displayTextForNetwork')}</H3>
            </MCView>
          </MCView>
          <MCButton
            mt={60}
            width={240}
            bordered
            align="center"
            onPress={() => this.gotoMainScreen()}>
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

const mapDispatchToProps = {
  setNewUser: routerActions.setNewUser,
  trackEvent: otherActions.trackEvent,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WelcomeToTab),
);
