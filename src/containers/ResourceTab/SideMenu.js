import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions, resourceActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {ResourceSideMenuList} from 'utils/constants';

class ResourceSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    };
  }

  onPressItem = (menu) => {
    const {setInitialResource, showDrawer} = this.props;
    this.setState({index: menu.index});
    showDrawer(false);
    switch (menu.index) {
      case 2:
        setInitialResource();
        break;
      default:
    }
    NavigationService.navigate(menu.redirectTo);
  };

  render() {
    const {theme, t} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <MCView height={80} />
        {ResourceSideMenuList.map((menu) => {
          return (
            <MCButton
              key={menu.index}
              style={{width: '100%'}}
              row
              onPress={() => this.onPressItem(menu)}>
              <MCView width={40} align="center">
                <MCIcon type={menu.iconType} name={menu.icon} padding={6} />
              </MCView>
              <MCView>
                <H3 ml={6} color={menu.index === 7 ? theme.colors.danger : ''}>
                  {t(menu.title)}
                </H3>
              </MCView>
            </MCButton>
          );
        })}
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  setInitialResource: resourceActions.setInitialResource,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ResourceSideMenu),
);
