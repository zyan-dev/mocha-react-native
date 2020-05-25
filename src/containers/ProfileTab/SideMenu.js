import React from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import {ScrollView} from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';

import {routerActions, profileActions, otherActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCIcon} from 'components/common';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {colorThemes} from 'theme';
import {ProfileSideMenuList} from 'utils/constants';
import {UserCrownSvg} from 'assets/svgs';
import {DividerLine} from '../../components/styled/View';

class ProfileSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
      cp_version: '',
    };
  }

  componentDidMount() {
    codePush.getUpdateMetadata().then(metadata => {
      console.log({metadata});
      this.setState({cp_version: metadata.label});
    });
  }

  onPressItem = menu => {
    const {t} = this.props;
    this.setState({index: menu.index});
    this.props.showDrawer(false);
    if (menu.title === 'profile_menu_signout') {
      this.props.resetAllReducer();
      setTimeout(() => {
        NavigationService.reset('welcomeStack');
      });
      AsyncStorage.removeItem('userToken');
    } else if (menu.title === 'profile_menu_delete') {
      Alert.alert(
        t('alert_title_mocha'),
        t('alert_remove_account'),
        [
          {
            text: t('button_cancel'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: t('button_ok'), onPress: () => this.props.deleteAccount()},
        ],
        {cancelable: false},
      );
    } else {
      NavigationService.navigate(menu.redirectTo);
    }
  };

  onPressTheme = index => {
    this.props.setThemeIndex(index);
    this.props.trackEvent({
      event: 'change_theme',
      data: {type: colorThemes[index].theme_name},
    });
  };

  onToggle = isOn => {
    this.props.toggleCrown(isOn);
  };

  render() {
    const {cp_version} = this.state;
    const {
      t,
      systemTheme,
      profile,
      completedExpertProfile,
      setCrown,
      isDrawerOpened,
      cp_status,
    } = this.props;

    return (
      <MCRootView
        justify="flex-start"
        align="flex-start"
        style={{
          shadowColor: '#000000',
          shadowRadius: isDrawerOpened ? 8 : 0,
          shadowOpacity: 0.5,
          elevation: 11,
        }}>
        <ScrollView>
          <MCView mt={50} justify="space-between" ph={10} align="flex-start">
            <MCView row justify="space-between" width={250}>
              <H3 color={systemTheme.colors.border}>{t('version')}</H3>
              <H3 color={systemTheme.colors.border}>
                {DeviceInfo.getVersion()}
              </H3>
            </MCView>
            <MCView row justify="space-between" width={250} mb={15}>
              <H3 color={systemTheme.colors.border}>{t('cp_version')}</H3>
              <H3 color={systemTheme.colors.border}>{cp_version}</H3>
            </MCView>
            <MCButton
              bordered
              onPress={() => this.props.checkCodePushUpdates()}
              pt={2}
              pb={2}>
              <H4>{t('codepush_check_for_update')}</H4>
            </MCButton>
            {cp_status.length > 0 && (
              <H4 mt={10} color={systemTheme.colors.border}>
                {t(cp_status)}
              </H4>
            )}
          </MCView>
          <MCView align="center" mt={20} mb={20}>
            <DividerLine width={275} />
          </MCView>
          {ProfileSideMenuList.map(menu => {
            if (profile.userToken.length && !menu.registerRequired) return;
            else if (!profile.userToken.length && menu.registerRequired) return;
            return (
              <MCButton
                key={menu.index}
                style={{width: '100%'}}
                row
                onPress={() => this.onPressItem(menu)}>
                <MCIcon type={menu.iconType} name={menu.icon} padding={6} />
                <MCView>
                  <H3
                    ml={6}
                    color={
                      menu.title === 'profile_menu_delete'
                        ? systemTheme.colors.danger
                        : ''
                    }>
                    {t(menu.title)}
                  </H3>
                  {menu.index === 0 && (
                    <H5 ml={6} color={systemTheme.colors.border}>
                      This is required for more features
                    </H5>
                  )}
                </MCView>
              </MCButton>
            );
          })}
          <MCView align="center" mt={20} mb={20}>
            <DividerLine width={275} />
          </MCView>
          <MCView align="center" width={275} mb={20}>
            <H3 padding={20}>{t('welcome_theme_displayText')}</H3>
            <MCView align="center" width={240}>
              {colorThemes.map((theme, index) => {
                return (
                  <MCButton
                    key={index}
                    bordered
                    align="center"
                    width={150}
                    mt={12}
                    onPress={() => this.onPressTheme(index)}
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.outline,
                    }}>
                    <H3 style={{color: theme.text}}>{theme.theme_name}</H3>
                  </MCButton>
                );
              })}
            </MCView>
          </MCView>
          <MCView align="center" mt={20} mb={20}>
            <DividerLine width={275} />
          </MCView>
          {completedExpertProfile && (
            <MCView row align="center" justify="space-around" mb={20}>
              <MCView row>
                <H3 mr={5}>{t('profile_menu_self_mastery')}</H3>
                <UserCrownSvg color={systemTheme.colors.text} size={30} />
              </MCView>
              <ToggleSwitch
                isOn={setCrown}
                onColor={systemTheme.colors.toggle_on}
                offColor={systemTheme.colors.toggle_off}
                size="medium"
                onToggle={isOn => this.onToggle(isOn)}
              />
            </MCView>
          )}
          <MCView align="center" mb={20}>
            <MCButton
              bordered
              align="center"
              width={150}
              onPress={() =>
                this.onPressItem({
                  index: 7,
                  redirectTo: 'Contact',
                })
              }>
              <H3>{t('contact_us')}</H3>
            </MCButton>
          </MCView>
        </ScrollView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  systemTheme: state.routerReducer.theme,
  profile: state.profileReducer,
  completedExpertProfile: state.otherReducer.completedExpertProfile,
  setCrown: state.otherReducer.setCrown,
  cp_status: state.otherReducer.cp_status,
  isDrawerOpened: state.routerReducer.isProfileDrawerOpened,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  setThemeIndex: routerActions.setThemeIndex,
  deleteAccount: profileActions.deleteAccount,
  resetAllReducer: routerActions.resetAllReducer,
  trackEvent: otherActions.trackEvent,
  toggleCrown: otherActions.toggleCrown,
  checkCodePushUpdates: otherActions.checkCodePushUpdates,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileSideMenu),
);
