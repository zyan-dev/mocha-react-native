import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {routerActions, otherActions} from 'Redux/actions';
import {MCRootView, MCContent} from 'components/styled/View';
import {MCIcon} from 'components/common';
import {H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {ToolsSideTabs} from 'utils/constants';
import {dySize} from 'utils/responsive';

class ToolsSideMenu extends React.Component {
  onPressTab = index => {
    this.props.changeToolsTab(index);
    this.props.showDrawer(false);
  };

  render() {
    const {t, theme, isDrawerOpened, toolsTab} = this.props;

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
        <MCContent
          contentContainerStyle={{
            width: dySize(75),
            alignItems: 'center',
          }}>
          <MCButton
            align="center"
            onPress={() => this.props.showDrawer(false)}
            mt={-5}>
            <MCIcon name="ios-close" size={60} />
          </MCButton>
          {ToolsSideTabs.map((tab, index) => {
            const tabColor =
              toolsTab === index ? theme.colors.outline : theme.colors.text;
            return (
              <MCButton
                key={index}
                mb={20}
                align="center"
                onPress={() => this.onPressTab(index)}>
                <MCIcon
                  type={tab.iconType}
                  name={tab.icon}
                  color={tabColor}
                  size={30}
                />
                <H5 color={tabColor}>{t(`tools_tab_side_${tab.key}`)}</H5>
              </MCButton>
            );
          })}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  isDrawerOpened: state.routerReducer.isProfileDrawerOpened,
  toolsTab: state.otherReducer.toolsTab,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setToolsDrawerOpened,
  changeToolsTab: otherActions.changeToolsTab,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ToolsSideMenu),
);
