import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

const sideMenuList = [
  {
    index: 1,
    icon: 'ios-send',
    iconType: 'Ionicon',
    title: 'feed_menu_send_request',
    redirectTo: 'SendRequest',
  },
  {
    index: 2,
    icon: 'ios-git-network',
    iconType: 'Ionicon',
    title: 'feed_menu_manage_trust_network',
    redirectTo: 'ManageTrustNetwork',
  },
];

class SocialSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    };
  }

  onPressItem = menu => {
    this.setState({index: menu.index});
    this.props.showDrawer(false);
    NavigationService.navigate(menu.redirectTo);
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <MCView height={80} />
        {sideMenuList.map(menu => {
          return (
            <MCButton
              style={{width: '100%'}}
              align="flex-start"
              row
              onPress={() => this.onPressItem(menu)}>
              <MCIcon type={menu.iconType} name={menu.icon} padding={6} />
              <H3 align="right" padding={6}>
                {t(menu.title)}
              </H3>
            </MCButton>
          );
        })}
      </MCRootView>
    );
  }
}

const mapDispatchToProps = {
  showDrawer: routerActions.setSocialDrawerOpened,
};

export default withTranslation()(
  connect(undefined, mapDispatchToProps)(SocialSideMenu),
);
