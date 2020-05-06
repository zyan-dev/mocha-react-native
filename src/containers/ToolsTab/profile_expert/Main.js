import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import {selector} from 'Redux/selectors';
import {otherActions} from 'Redux/actions';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H2, H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCModal} from 'components/common';
import ProfileBasicCard from '../profile_basic/components/ProfileBasicCard';
import {IceCreamSvg} from 'assets/svgs';
import {getStringWithOutline} from 'services/operators';
import {ProfileExpertCards} from 'utils/constants';

class ProfileExpertScreen extends React.Component {
  render() {
    const {t, theme, coreValues, strength, meaning} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('tools_tab_profile_expert')}
          headerIcon={
            <MCIcon
              type="FontAwesome5Pro-Solid"
              name="chess-queen-alt"
              size={50}
            />
          }
          hasRight
          rightIconType="FontAwesome5Pro"
          rightIcon="question-circle"
          onPressRight={() => {}}
        />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}>
          <H3 underline mt={40}>
            {t('tools_tab_discover_your_values')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_2')}</H3>
            <MCIcon type="FontAwesome5Pro" name="key" />
          </MCView>
          <ProfileBasicCard
            data={ProfileExpertCards.core_values}
            completed={coreValues}
            theme={theme}
          />

          <H3 underline mt={40}>
            {t('tools_tab_know_your_stregths')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_2')}</H3>
            <MCIcon type="FontAwesome5Pro" name="hammer" />
          </MCView>
          <ProfileBasicCard
            data={ProfileExpertCards.strength}
            locked={!coreValues}
            completed={strength}
          />

          <H3 underline mt={40}>
            {t('tools_tab_your_future')}
          </H3>
          <MCView row align="center">
            <H3>{t('tools_tab_level_2')}</H3>
            <MCIcon type="FontAwesome5Pro" name="bullseye-arrow" />
          </MCView>
          <ProfileBasicCard
            data={ProfileExpertCards.meaning}
            locked={!strength}
            completed={meaning}
            theme={theme}
          />
        </MCContent>
        <MCModal hasCloseButton={false} isVisible={false}>
          <MCView width={280} mt={20}>
            <MCView bordered br={15} align="center" pv={20} ph={20}>
              <IceCreamSvg theme={theme} size={70} />
              <H2 weight="bold">Excellent 👍</H2>
              <MCView row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  You've completed your
                  <H3 weight="bold"> Basic Profile </H3>
                  <MCIcon type="FontAwesome5Pro" name="chess-pawn" />
                  <H3> set up.</H3>
                </H3>
              </MCView>
              <MCView mt={20} row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  Check out the
                  <H3 weight="bold"> Profile Tab </H3>
                  <MCIcon type="FontAwesome5Pro" name="user-alt" />
                  <H3> to see all your data.</H3>
                </H3>
              </MCView>
              <MCView mt={20} row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  Next you can meet some other Mocha Community Members on the
                  <H3 weight="bold"> Social Tab </H3>
                  <MCIcon type="FontAwesome5Pro" name="users" />
                  <H3> or check out </H3>
                  <H3 weight="bold">Profile Advanced </H3>
                  <MCIcon type="FontAwesome5Pro" name="chess-knight" />
                </H3>
              </MCView>
              <MCButton
                bordered
                mt={20}
                width={80}
                align="center"
                onPress={() => checkCompletedBasicProfile()}>
                <H3>{t('I Got It')}</H3>
              </MCButton>
            </MCView>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  coreValues: selector.reflections.findMySpecialReflections(
    state,
    'CoreValues',
  ),
  strength: selector.reflections.findMySpecialReflections(state, 'Strengths'),
  meaning: selector.reflections.findMySpecialReflections(state, 'MeaningLife'),
});

const mapDispatchToProps = {
  checkCompletedBasicProfile: otherActions.checkCompletedBasicProfile,
  checkWelcomeBasicProfile: otherActions.checkWelcomeBasicProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileExpertScreen),
);
