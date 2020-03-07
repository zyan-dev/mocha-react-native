import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

const sideMenuList = [
  {
    index: 1,
    title: 'profile_menu_signin',
    redirectTo: 'TabFeed',
  },
  {
    index: 2,
    title: 'profile_menu_timeline',
    redirectTo: 'TimeLine',
  },
  {
    index: 3,
    title: 'profile_menu_analyze',
    redirectTo: 'Analyze',
  },
  {
    index: 4,
    title: 'profile_menu_cv',
    redirectTo: 'SendMochaCV',
  },
  {
    index: 5,
    title: 'profile_menu_manage_notifications',
    redirectTo: 'ManageNotifications',
  },
  {
    index: 6,
    title: 'profile_menu_purchase',
    redirectTo: 'Purchase',
  },
  {
    index: 7,
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
      // this.props.deleteAccount();
    } else {
      NavigationService.navigate(menu.redirectTo);
    }
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <MCView height={150} />
        {sideMenuList.map(menu => {
          return (
            <MCButton
              style={{width: '100%'}}
              align="flex-start"
              onPress={() => this.onPressItem(menu)}>
              <H3>{t(menu.title)}</H3>
            </MCButton>
          );
        })}
      </MCRootView>
    );
  }
}

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default withTranslation()(
  connect(undefined, mapDispatchToProps)(ProfileSideMenu),
);
