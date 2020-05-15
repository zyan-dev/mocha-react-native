import React from 'react';
import {View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {routerActions, resourceActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H4} from 'components/styled/Text';
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
    });
  };

  render() {
    const {tabIndex} = this.state;
    const {t, theme, profile} = this.props;

    if (!profile.userToken.length) {
      return (
        <MCRootView>
          <H4 mb={10}>{t('sign_up_required')}</H4>
          <MCButton
            bordered
            onPress={() => NavigationService.navigate('TabFeed')}>
            <H4>{t('button_go_to_signup')}</H4>
          </MCButton>
        </MCRootView>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <MCHeader
          title={t('resources')}
          hasRight={tabIndex != 3 ? true : false}
          rightIcon="plus"
          onPressRight={() => this.onPressRight()}
          hasBack={false}
          headerIcon={
            <MCView ml={10}>
              <MCIcon type="FontAwesome5" name="book-reader" size={30} />
            </MCView>
          }
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
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  bookmarkResource: resourceActions.bookmarkResource,
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ResourceScreen),
);
