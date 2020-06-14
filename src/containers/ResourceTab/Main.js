import React from 'react';
import {View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {routerActions, resourceActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from '../../navigation/NavigationService';
import ResourceTabView from './TabView';
import {ResourcesRoots} from 'utils/constants';

class ResourceScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      viewAll: true,
      filterTypes: [],
      tabIndex: 1,
    };
  }

  onPressRight = () => {
    NavigationService.navigate('AddResource', {
      root: ResourcesRoots[this.state.tabIndex],
      from: 'trust-member',
    });
  };

  render() {
    const {tabIndex} = this.state;
    const {t, theme, profile} = this.props;

    if (!profile.userToken.length) {
      return (
        <MCRootView>
          <H3 mb={10}>{t('sign_up_required')}</H3>
          <MCButton
            bordered
            pl={20}
            pr={20}
            onPress={() => NavigationService.navigate('VerificationStack')}>
            <H3>{t('button_go_to_signup')}</H3>
          </MCButton>
        </MCRootView>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <MCHeader
          title={t('resources')}
          hasRight={tabIndex == 1 ? true : false}
          rightIcon="plus"
          onPressRight={() => this.onPressRight()}
          hasBack={false}
        />
        <ResourceTabView
          tabIndex={tabIndex}
          onChangeTabIndex={i => this.setState({tabIndex: i})}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceScreen),
);
