import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions} from 'Redux/actions';
import {MCHeader, MCIcon, MCCheckBox} from 'components/common';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H2, H3, H4, MCTextInput} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';
import {OvalYellowWide, OvalGreenWide} from 'assets/images';

class OurCommunityRuleScreen extends React.Component {
  state = {
    checkedOptions: [],
    agreeText: '',
  };

  onToggleCheck = option => {
    const {checkedOptions} = this.state;
    const index = checkedOptions.indexOf(option);
    if (index < 0) {
      checkedOptions.push(option);
    } else {
      checkedOptions.splice(index, 1);
    }
    this.setState({checkedOptions});
  };

  continue = () => {
    this.props.setNewUser(false);
    NavigationService.navigate('Auth_Welcome');
  };

  render() {
    const {t, theme} = this.props;
    const {checkedOptions, agreeText} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('title_our_community_rules')} />
        <WideOvalGreenImage source={OvalGreenWide} resizeMode="stretch" />
        <WideOvalYellowImage source={OvalYellowWide} resizeMode="stretch" />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H2 weight="bold" mt={40} color={theme.colors.outline}>
            {t('label_service')}
          </H2>
          <MCView width={340} row align="center">
            <H4 weight="bold">{t('auth_agree')}</H4>
          </MCView>
          <MCView width={340} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <MCCheckBox
              width={320}
              hasLeftText
              bigText={false}
              iconColor={theme.colors.outline}
              label={t('auth_service_community_rule_1')}
              checked={checkedOptions.indexOf('service_1') > -1}
              onChange={checked => this.onToggleCheck('service_1')}
            />
          </MCView>
          <MCView width={340} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <MCCheckBox
              width={320}
              hasLeftText
              bigText={false}
              iconColor={theme.colors.outline}
              label={t('auth_service_community_rule_2')}
              checked={checkedOptions.indexOf('service_2') > -1}
              onChange={checked => this.onToggleCheck('service_2')}
            />
          </MCView>
          <MCView width={340} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <MCCheckBox
              width={320}
              hasLeftText
              bigText={false}
              iconColor={theme.colors.outline}
              label={t('auth_service_community_rule_3')}
              checked={checkedOptions.indexOf('service_3') > -1}
              onChange={checked => this.onToggleCheck('service_3')}
            />
          </MCView>
          <H2 weight="bold" color={theme.colors.outline} mt={50}>
            {t('label_community')}
          </H2>
          <MCView width={340} row align="center">
            <H4 weight="bold">{t('auth_agree')}</H4>
          </MCView>
          <MCView width={340} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <MCCheckBox
              width={320}
              hasLeftText
              bigText={false}
              iconColor={theme.colors.outline}
              label={t('auth_community_rule_1')}
              checked={checkedOptions.indexOf('community_1') > -1}
              onChange={checked => this.onToggleCheck('community_1')}
            />
          </MCView>
          <MCView width={340} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <MCCheckBox
              width={320}
              hasLeftText
              bigText={false}
              iconColor={theme.colors.outline}
              label={t('auth_community_rule_2')}
              checked={checkedOptions.indexOf('community_2') > -1}
              onChange={checked => this.onToggleCheck('community_2')}
            />
          </MCView>
          <MCView width={340} row align="center">
            <MCIcon name="ios-remove" padding={1} />
            <MCCheckBox
              width={320}
              hasLeftText
              bigText={false}
              iconColor={theme.colors.outline}
              label={t('auth_community_rule_3')}
              checked={checkedOptions.indexOf('community_3') > -1}
              onChange={checked => this.onToggleCheck('community_3')}
            />
          </MCView>
          <H4 weight="bold" mt={40}>
            {t('label_type_I_agree')}
          </H4>
          <MCView width={250}>
            <MCTextInput
              style={{width: '100%'}}
              value={agreeText}
              onChangeText={text => this.setState({agreeText: text})}
            />
          </MCView>
          <MCButton
            br={20}
            height={40}
            mt={20}
            mb={40}
            align="center"
            background={theme.colors.outline}
            pl={20}
            pr={20}
            disabled={agreeText !== t('I_agree') || checkedOptions.length < 6}
            onPress={() => this.continue()}>
            <H3 color={theme.colors.background}>{t('button_continue')}</H3>
          </MCButton>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
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
