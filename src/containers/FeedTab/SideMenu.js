import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions} from 'Redux/actions';
import {MCRootView, MCView, NativeCard} from 'components/styled/View';
import {MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
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
    redirectTo: 'MyTrustNetwork',
  },
  {
    index: 3,
    icon: 'ios-hourglass',
    iconType: 'Ionicon',
    title: 'feed_menu_pending_requests',
    redirectTo: 'PendingRequest',
  },
  {
    index: 4,
    icon: 'shield-check',
    iconType: 'FontAwesome5Pro',
    title: 'feed_menu_community_guidelines',
    redirectTo: 'CommunityGuideLines',
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
    const {t, isSocialDrawerOpened} = this.props;

    return (
      <MCRootView
        justify="flex-start"
        align="flex-start"
        style={{
          shadowColor: '#000000',
          shadowRadius: isSocialDrawerOpened ? 8 : 0,
          shadowOpacity: 0.5,
          elevation: 11,
        }}>
        <MCView height={80} />
        {sideMenuList.map(menu => {
          return (
            <MCButton
              key={menu.index}
              style={{width: '100%'}}
              align="flex-start"
              row
              onPress={() => this.onPressItem(menu)}>
              <MCView width={40} align="center">
                <MCIcon type={menu.iconType} name={menu.icon} padding={6} />
              </MCView>
              <H3 align="right" ml={6}>
                {t(menu.title)}
              </H3>
            </MCButton>
          );
        })}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  isSocialDrawerOpened: state.routerReducer.isSocialDrawerOpened,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setSocialDrawerOpened,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SocialSideMenu),
);
