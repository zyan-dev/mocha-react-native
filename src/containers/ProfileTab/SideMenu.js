import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions, profileActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {colorThemes} from 'theme';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {ScrollView} from 'react-native-gesture-handler';

const sideMenuList = [
  {
    index: 1,
    icon: 'ios-link',
    iconType: 'Ionicon',
    title: 'profile_menu_signin',
    redirectTo: 'TabFeed',
  },
  {
    index: 2,
    icon: 'ios-calendar',
    iconType: 'Ionicon',
    title: 'profile_menu_timeline',
    redirectTo: 'TimeLine',
  },
  {
    index: 3,
    icon: 'ios-trending-up',
    iconType: 'Ionicon',
    title: 'profile_menu_analyze',
    redirectTo: 'Analyze',
  },
  {
    index: 4,
    icon: 'ios-send',
    iconType: 'Ionicon',
    title: 'profile_menu_cv',
    redirectTo: 'SendMochaCV',
  },
  {
    index: 5,
    icon: 'ios-notifications-outline',
    iconType: 'Ionicon',
    title: 'profile_menu_manage_notifications',
    redirectTo: 'ManageNotifications',
  },
  {
    index: 6,
    icon: 'logo-usd',
    iconType: 'Ionicon',
    title: 'profile_menu_purchase',
    redirectTo: 'Purchase',
  },
  {
    index: 7,
    icon: 'ios-remove-circle-outline',
    iconType: 'Ionicon',
    title: 'profile_menu_delete',
    redirectTo: '',
  },
];

class ProfileSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    };
  }

  onPressItem = menu => {
    this.setState({index: menu.index});
    this.props.showDrawer(false);
    if (menu.index === 7) {
      this.props.deleteAccount();
    } else {
      NavigationService.navigate(menu.redirectTo);
    }
  };

  render() {
    const {setThemeIndex, systemTheme, t} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <ScrollView>
          <MCView height={80} />
          {sideMenuList.map(menu => {
            return (
              <MCButton
                style={{width: '100%'}}
                align="flex-start"
                row
                onPress={() => this.onPressItem(menu)}>
                <MCIcon type={menu.iconType} name={menu.icon} padding={6} />
                <H3
                  ml={6}
                  color={menu.index === 7 ? systemTheme.colors.danger : ''}>
                  {t(menu.title)}
                </H3>
              </MCButton>
            );
          })}
          <MCView height={0.5} mr={10} ml={10} mb={30} mt={30} bordered />
          <MCView align="center" width={275}>
            <H3 padding={20}>{t('welcome_theme_displayText')}</H3>
            <MCView justify="space-between" row wrap width={240}>
              {colorThemes.map((theme, index) => {
                return (
                  <MCButton
                    bordered
                    align="center"
                    width={110}
                    mt={12}
                    onPress={() => setThemeIndex(index)}
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
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  setThemeIndex: routerActions.setThemeIndex,
  deleteAccount: profileActions.deleteAccount,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ProfileSideMenu),
);
