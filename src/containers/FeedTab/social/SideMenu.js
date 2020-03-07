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
    title: 'feed_menu_send_request',
    redirectTo: 'SendRequest',
  },
  {
    index: 2,
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
        <MCView height={150} />
        {sideMenuList.map(menu => {
          return (
            <MCButton
              style={{width: '100%'}}
              align="flex-start"
              onPress={() => this.onPressItem(menu)}>
              <H3 align="right">{t(menu.title)}</H3>
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
