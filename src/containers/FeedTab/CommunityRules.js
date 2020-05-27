import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import {routerActions} from 'Redux/actions';
import {MCHeader, MCIcon, MCCheckBox} from 'components/common';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H2, H4} from 'components/styled/Text';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';
import {OvalYellowWide, OvalGreenWide} from 'assets/images';

const ServiceRules = [
  'service_1',
  'service_2',
  'service_3',
  'service_4',
  'service_5',
];

const CommunityRules = [
  'community_1',
  'community_2',
  'community_3',
  'community_4',
];

class OurCommunityRuleScreen extends React.Component {
  render() {
    const {t, theme, profile} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('title_our_community_rules')} />
        <WideOvalGreenImage source={OvalGreenWide} resizeMode="stretch" />
        <WideOvalYellowImage source={OvalYellowWide} resizeMode="stretch" />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <MCView width={340} mt={40} row align="center">
            <H4 weight="bold">{t('auth_agree')}</H4>
          </MCView>
          {ServiceRules.map(rule => {
            return (
              <MCView width={340} row align="center">
                <MCIcon name="ios-remove" padding={1} />
                <MCCheckBox
                  width={320}
                  hasLeftText
                  bigText={false}
                  iconColor={theme.colors.outline}
                  label={t(`auth_rule_${rule}`)}
                  checked={true}
                  weight="italic"
                />
              </MCView>
            );
          })}
          {CommunityRules.map(rule => {
            return (
              <MCView width={340} row align="center">
                <MCIcon name="ios-remove" padding={1} />
                <MCCheckBox
                  width={320}
                  hasLeftText
                  bigText={false}
                  iconColor={theme.colors.outline}
                  label={t(`auth_rule_${rule}`)}
                  checked={true}
                  weight="italic"
                />
              </MCView>
            );
          })}
          <H4 weight="bold" mt={40}>
            {t('label_agreed_on')}
          </H4>
          <H4>{moment(profile.created).format('MMM Do, YYYY')}</H4>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  setNewUser: routerActions.setNewUser,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(OurCommunityRuleScreen),
);
