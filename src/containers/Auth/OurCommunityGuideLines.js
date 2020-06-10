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
  CornerOvalYellowA,
  CornerOvalYellowB,
  CornerOvalGreenA,
  CornerOvalGreenB,
} from 'components/styled/Custom';

const ServiceRules = ['authenticity', 'belonging', 'coaching', 'determination'];

class OurCommunityGuidelineScreen extends React.Component {
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
        <CornerOvalYellowA />
        <CornerOvalYellowB />
        <CornerOvalGreenA />
        <CornerOvalGreenB />
        <MCHeader title={t('title_our_community_guidelines')} />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingTop: 30}}>
          {ServiceRules.map(rule => {
            return (
              <MCView width={340} row align="center" mt={25}>
                <MCCheckBox
                  width={320}
                  hasLeftText
                  bigText={false}
                  iconColor={theme.colors.outline}
                  label={t(`auth_rule_${rule}`)}
                  checked={checkedOptions.indexOf(rule) > -1}
                  onChange={checked => this.onToggleCheck(rule)}
                  round
                />
              </MCView>
            );
          })}
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
            disabled={agreeText !== t('I_agree') || checkedOptions.length < 4}
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
  )(OurCommunityGuidelineScreen),
);
