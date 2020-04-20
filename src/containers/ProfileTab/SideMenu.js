import React from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions, profileActions, otherActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {colorThemes} from 'theme';
import {H3, H5, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {ScrollView} from 'react-native-gesture-handler';
import {ProfileSideMenuList} from 'utils/constants';

class ProfileSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    };
  }

  onPressItem = menu => {
    const {t} = this.props;
    this.setState({index: menu.index});
    this.props.showDrawer(false);
    if (menu.index === 1) {
      this.props.resetAllReducer();
      NavigationService.reset('welcomeStack');
      AsyncStorage.removeItem('userToken');
    } else if (menu.index === 7) {
      Alert.alert(
        t('alert_title_mocha'),
        t('alert_remove_account'),
        [
          {
            text: t('modal_cancel'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: t('modal_ok'), onPress: () => this.props.deleteAccount()},
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
      event: 'Select Theme',
      data: {type: colorThemes[index].theme_name},
    });
  };

  render() {
    const {systemTheme, profile, t} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <ScrollView>
          <MCView height={80} />
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
                    color={menu.index === 7 ? systemTheme.colors.danger : ''}>
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
          <MCView height={0.5} mr={10} ml={10} mb={30} mt={30} bordered />
          <MCView align="center" width={275} mb={50}>
            <H3 padding={20}>{t('welcome_theme_displayText')}</H3>
            <MCView justify="space-between" row wrap width={240}>
              {colorThemes.map((theme, index) => {
                return (
                  <MCButton
                    key={index}
                    bordered
                    align="center"
                    width={110}
                    mt={12}
                    onPress={() => this.onPressTheme(index)}
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                    }}>
                    <H3 style={{color: theme.text}}>{theme.theme_name}</H3>
                  </MCButton>
                );
              })}
            </MCView>
          </MCView>
        </ScrollView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  systemTheme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  setThemeIndex: routerActions.setThemeIndex,
  deleteAccount: profileActions.deleteAccount,
  resetAllReducer: routerActions.resetAllReducer,
  trackEvent: otherActions.trackEvent,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileSideMenu),
);
