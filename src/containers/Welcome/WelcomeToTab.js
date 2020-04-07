import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {ToolsSvg, UserSvg, UsersSvg, ResourceSvg} from 'assets/svgs';
import {dySize} from 'utils/responsive';
import {routerActions, otherActions} from 'Redux/actions';
import {MCContent} from '../../components/styled/View';

const iconSize = 35;
const iconViewWidth = 70;

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
        <MCContent
          contentContainerStyle={{
            padding: 20,
            alignItems: 'center',
          }}>
          <MCView row width={320} mt={40} align="center">
            <MCView width={iconViewWidth} align="center">
              <ToolsSvg size={dySize(iconSize)} color={theme.colors.text} />
              <H4>{t('footer_tools')}</H4>
            </MCView>
            <MCView style={{flex: 1}}>
              <H3 ml={20}>
                {`${t('welcome_explain_displayTextForAdd')} `}
                <H3 weight="bold">{t('add_manual_headerTitle')}</H3>
                {t('welcome_explain_and')}
                <H3 weight="bold">{t('trustnetwork_permissions_value')}</H3>,
                <H3 weight="bold">{` ${t('concept_feedback_title')}`}</H3>
                {t('welcome_explain_andset')}
                <H3 weight="bold">{t('add_goal_headerTitle')}</H3>
              </H3>
            </MCView>
          </MCView>
          <MCView row width={320} mt={40} align="center">
            <MCView width={iconViewWidth} align="center">
              <ResourceSvg size={dySize(iconSize)} color={theme.colors.text} />
              <H4>{t('footer_resources')}</H4>
            </MCView>
            <MCView style={{flex: 1}}>
              <H3 ml={20}>{t('welcome_explain_displayTextForResource')}</H3>
            </MCView>
          </MCView>
          <MCView row width={320} mt={40} align="center">
            <MCView width={iconViewWidth} align="center">
              <UserSvg size={dySize(iconSize)} color={theme.colors.text} />
              <H4>{t('footer_profile')}</H4>
            </MCView>
            <MCView style={{flex: 1}}>
              <H3 ml={20}>{t('welcome_explain_displayTextForProfile')}</H3>
            </MCView>
          </MCView>
          <MCView row width={320} mt={40} align="center">
            <MCView width={iconViewWidth} align="center">
              <UsersSvg size={dySize(iconSize)} color={theme.colors.text} />
              <H4>{t('footer_feed')}</H4>
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
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  setNewUser: routerActions.setNewUser,
  trackEvent: otherActions.trackEvent,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(WelcomeToTab),
);
