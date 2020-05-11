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
import {IceCreamSvg, ProfileCrownSvg, CrownSvg} from 'assets/svgs';
import {getStringWithOutline} from 'services/operators';
import {ProfileExpertCards} from 'utils/constants';
import {dySize} from 'utils/responsive';

class ProfileExpertScreen extends React.Component {
  checkCompletedBestSelf = () => {
    const {myFeedbacks, profile} = this.props;
    const find = myFeedbacks.find(
      feedback =>
        feedback.sender._id === profile._id &&
        feedback.question === 'mocha_feedback_best_self',
    );
    return find;
  };
  render() {
    const {
      t,
      theme,
      meaning,
      valueStory,
      completedExpertProfile,
      checkCompletedExpertProfile,
    } = this.props;
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
            completed={valueStory}
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
            locked={!valueStory}
            completed={this.checkCompletedBestSelf()}
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
            locked={!this.checkCompletedBestSelf()}
            completed={meaning}
            theme={theme}
          />
        </MCContent>
        <MCModal
          hasCloseButton={false}
          isVisible={
            !completedExpertProfile &&
            valueStory &&
            meaning &&
            this.checkCompletedBestSelf()
          }>
          <MCView width={280} mt={20}>
            <MCView bordered br={15} align="center" pv={20} ph={20}>
              <IceCreamSvg theme={theme} size={70} />
              <H2 weight="bold">Excellent 👍</H2>
              <MCView row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  You've completed your
                  <H3 weight="bold"> Expert Profile </H3>
                  <MCIcon
                    type="FontAwesome5Pro-Solid"
                    name="chess-queen-alt"
                    size={25}
                  />
                  <H3> set up.</H3>
                </H3>
              </MCView>
              <MCView mt={20} row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  Check out the
                  <H3 weight="bold"> Profile Tab </H3>
                  <ProfileCrownSvg size={25} theme={theme} />
                  <H3> to see all your data.</H3>
                </H3>
              </MCView>
              <MCView mt={20} row wrap align="center" justify="center">
                <H3 align="center" style={{lineHeight: 30}}>
                  Next check out
                  <H3 weight="bold"> Personal Development </H3>
                  <CrownSvg size={30} theme={theme} style={{marginTop: -5}} />
                </H3>
              </MCView>
              <MCButton
                bordered
                mt={20}
                width={80}
                align="center"
                onPress={() => checkCompletedExpertProfile()}>
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
  valueStory: selector.reflections.findMySpecialReflections(
    state,
    'ValueStory',
  ),
  strength: selector.reflections.findMySpecialReflections(state, 'Strengths'),
  meaning: selector.reflections.findMySpecialReflections(state, 'MeaningLife'),
  myFeedbacks: state.feedbackReducer.myFeedbacks,
  profile: state.profileReducer,
  completedExpertProfile: state.otherReducer.completedExpertProfile,
});

const mapDispatchToProps = {
  checkCompletedExpertProfile: otherActions.checkCompletedExpertProfile,
  checkWelcomeBasicProfile: otherActions.checkWelcomeBasicProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileExpertScreen),
);
