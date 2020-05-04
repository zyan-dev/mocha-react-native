import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selector} from 'Redux/selectors';
import {otherActions} from 'Redux/actions';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H2, H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCModal} from 'components/common';
import {ProfileAdvanceCards} from 'utils/constants';
import ProfileBasicCard from '../profile_basic/components/ProfileBasicCard';
import {IceCreamSvg, ShieldSvg} from 'assets/svgs';
import {HeadPhoneSvg, PeopleArrowSvg} from '../../../assets/svgs';

class ProfileAdvancedScreen extends React.Component {
  render() {
    const {
      t,
      theme,
      coaching_feedback,
      criticism_feedback,
      praise_feedback,
      qualities_character,
      challenges_concerns,
      approach,
      attachment,
      comforting,
      stress_recovery,
      completedAdvanceProfile,
      checkCompletedAdvanceProfile,
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('tools_tab_profile_advance')}
          headerIcon={
            <MCIcon
              type="FontAwesome5Pro-Solid"
              name="chess-knight-alt"
              size={50}
            />
          }
        />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H4 width={340} align="center" weight="italic">
            {t('profile_basic_title_top')}
          </H4>
          <H4 width={340} align="center">
            {t('profile_advance_title_bottom')}
          </H4>

          <H3 underline mt={40}>
            {t('tools_tab_feedback_preferences')}
          </H3>
          <MCView row align="center">
            <H3 mr={10}>{t('tools_tab_level_1')}</H3>
            <MCIcon name="ios-git-compare" />
          </MCView>
          <ProfileBasicCard
            data={ProfileAdvanceCards.coaching_feedback}
            completed={coaching_feedback}
            theme={theme}
          />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard
              data={ProfileAdvanceCards.criticism_feedback}
              completed={criticism_feedback}
              locked={!coaching_feedback}
              theme={theme}
            />
            <ProfileBasicCard
              data={ProfileAdvanceCards.praise_feedback}
              locked={!criticism_feedback}
              completed={praise_feedback}
            />
          </MCView>

          <H3 underline mt={40}>
            {t('profile_card_Behavior_preference')}
          </H3>
          <MCView row align="center">
            <H3 mr={10}>{t('tools_tab_level_1')}</H3>
            <PeopleArrowSvg color={theme.colors.text} size={30} />
          </MCView>
          <ProfileBasicCard
            data={ProfileAdvanceCards.qualities_character}
            locked={!praise_feedback}
            completed={qualities_character}
            theme={theme}
          />
          <ProfileBasicCard
            data={ProfileAdvanceCards.challenges_concerns}
            locked={!qualities_character}
            completed={challenges_concerns}
          />

          <H3 underline mt={40}>
            {t('tools_tab_conflict_and_security')}
          </H3>
          <MCView row align="center">
            <H3 mr={10}>{t('tools_tab_level_1')}</H3>
            <ShieldSvg size={25} />
          </MCView>
          <ProfileBasicCard
            data={ProfileAdvanceCards.approach}
            locked={!challenges_concerns}
            completed={approach}
          />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard
              data={ProfileAdvanceCards.attachment}
              completed={attachment}
              locked={!approach}
            />
            <ProfileBasicCard
              data={ProfileAdvanceCards.comforting}
              locked={!attachment}
              completed={comforting}
              theme={theme}
            />
          </MCView>

          <H3 underline mt={40}>
            {t('tools_tab_stress_response')}
          </H3>
          <MCView row align="center">
            <H3 mr={10}>{t('tools_tab_level_2')}</H3>
            <HeadPhoneSvg size={30} theme={theme} />
          </MCView>
          <ProfileBasicCard
            data={ProfileAdvanceCards.stress_recovery}
            locked={!comforting}
            completed={stress_recovery}
            theme={theme}
          />
        </MCContent>
        <MCModal
          hasCloseButton={false}
          isVisible={
            !completedAdvanceProfile &&
            coaching_feedback &&
            criticism_feedback &&
            praise_feedback &&
            qualities_character &&
            challenges_concerns &&
            approach &&
            attachment &&
            comforting &&
            stress_recovery
          }>
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
                onPress={() => checkCompletedAdvanceProfile()}>
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
  coaching_feedback: selector.reflections.findMySpecialReflections(
    state,
    'CoachingFeedback',
  ),
  criticism_feedback: selector.reflections.findMySpecialReflections(
    state,
    'CriticismFeedback',
  ),
  praise_feedback: selector.reflections.findMySpecialReflections(
    state,
    'PraiseFeedback',
  ),
  qualities_character: selector.reflections.findMySpecialReflections(
    state,
    'Qualities',
  ),
  challenges_concerns: selector.reflections.findMySpecialReflections(
    state,
    'Challenges',
  ),
  approach: selector.reflections.findMySpecialReflections(state, 'Approach'),
  attachment: selector.reflections.findMySpecialReflections(
    state,
    'Attachment',
  ),
  comforting: selector.reflections.findMySpecialReflections(state, 'Comfort'),
  stress_recovery: selector.reflections.findMySpecialReflections(
    state,
    'StressRecovery',
  ),
  completedAdvanceProfile: state.otherReducer.completedAdvanceProfile,
});

const mapDispatchToProps = {
  checkCompletedAdvanceProfile: otherActions.checkCompletedAdvanceProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileAdvancedScreen),
);
