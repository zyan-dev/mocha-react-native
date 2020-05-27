import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H2, H4} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';
import {OvalYellowWide, OvalGreenWide} from 'assets/images';

class OurValuesScreen extends React.PureComponent {
  render() {
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('title_our_values')}
          rightText={t('button_next')}
          onPressRight={() =>
            NavigationService.navigate('Auth_OurCommunityRule')
          }
        />
        <WideOvalGreenImage source={OvalGreenWide} resizeMode="stretch" />
        <WideOvalYellowImage source={OvalYellowWide} resizeMode="stretch" />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H2 weight="bold" color={theme.colors.outline} mt={40}>
            {t('label_service')}
          </H2>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_service_1')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_service_2')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_service_3')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_service_4')}
            </H4>
          </MCView>
          <H2 weight="bold" color={theme.colors.outline} mt={50}>
            {t('label_community')}
          </H2>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_community_1')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_community_2')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_community_3')}
            </H4>
          </MCView>
          <H2 weight="bold" color={theme.colors.outline} mt={50}>
            {t('label_incremental_progress')}
          </H2>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_progress_1')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_progress_2')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_progress_3')}
            </H4>
          </MCView>
          <MCView width={200} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <H4 weight="italic" style={{flex: 1}}>
              {t('auth_progress_4')}
            </H4>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(OurValuesScreen),
);
