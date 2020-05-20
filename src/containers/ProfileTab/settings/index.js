import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {H3} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';
import {ProfileSideSettingsList} from 'utils/constants';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressItem = item => {
    NavigationService.navigate(item.redirectTo);
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('profile_menu_setting')} />
        <MCContent>
          <MCView mt={20} align="center">
            {ProfileSideSettingsList.map(item => (
              <MCButton
                key={item.index}
                row
                bordered
                onPress={() => this.onPressItem(item)}
                pt={2}
                pb={2}
                ml={10}
                mb={10}
                width={220}
                justify="center">
                <MCIcon type={item.iconType} name={item.icon} />
                <H3>{t(item.title)}</H3>
              </MCButton>
            ))}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SettingsScreen),
);
