import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import * as _ from 'lodash';
import moment from 'moment';
import {MCView, NativeCard, DividerLine} from 'components/styled/View';
import {MCTagsView, MCCheckBox, MCImage, MCIcon} from 'components/common';
import {H1, H2, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {
  combineChallenges,
  getChallengeMeasure,
  getChallengeCategory,
  getStringWithOutline,
  getChallengeIcon,
  getDayOf,
} from 'services/operators';

class ChallengeItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isMember: PropTypes.bool,
    onToggleCheckMeasure: PropTypes.func,
    onPressAddPost: PropTypes.func,
    onPressJoin: PropTypes.func,
  };

  static defaultProps = {
    onToggleCheckMeasure: () => undefined,
    onPressAddPost: () => undefined,
    onPressJoin: () => undefined,
    isMember: true,
  };

  SkillText = {
    title: i18next.t('label_personal_development_skills', {
      bold: i18next.t('outline_skills'),
    }),
    boldWordKeys: ['skills'],
  };

  render() {
    const {
      t,
      theme,
      profile,
      item,
      isMember,
      onToggleCheckMeasure,
      onPressAddPost,
      onPressJoin,
    } = this.props;
    if (!item || !item.challenges || !item.invites) return null;
    const owner = {
      _id: item.ownerId,
      name: item.ownerName,
      avatar: item.ownerAvatar,
    };
    const members = [owner]
      .concat(item.teammates)
      .filter(i => i._id !== profile._id);
    return (
      <MCView width={345} align="center" pv={10}>
        <MCView row pv={10} ph={5} height={180}>
          <NativeCard width={230} mr={15} justify="flex-start" height={160}>
            <H2>
              <H1 weight="bold">{t('unit_day').toUpperCase()}</H1>
              {t('label_day_of', {
                index: getDayOf(item.created),
                duration: item.duration,
              })}
            </H2>
            <DividerLine width={200} />
            <MCView row width={200} mt={15}>
              <MCView width={100} ph={10}>
                <H4>{t('label_started')}:</H4>
                <H4 weight="italic">{moment(item.created).format('MMM Do')}</H4>
              </MCView>
              <MCView
                width={100}
                ph={10}
                style={{
                  borderLeftWidth: 0.5,
                  borderColor: theme.colors.border,
                }}>
                <H4>{t('label_ending')}:</H4>
                <H4 weight="italic">
                  {moment(item.created)
                    .add(item.duration, 'days')
                    .format('MMM Do')}
                </H4>
              </MCView>
            </MCView>
          </NativeCard>
          {isMember ? (
            <NativeCard height={160} width={90} ph={2}>
              <MCButton
                align="center"
                justify="center"
                height={160}
                width={90}
                onPress={() => onPressAddPost(item._id)}>
                <MCIcon name="ios-add" size={40} />
                <H4 align="center">{t('button_post_progress')}</H4>
              </MCButton>
            </NativeCard>
          ) : (
            <NativeCard height={160} width={90} ph={2}>
              <MCButton
                align="center"
                justify="center"
                height={160}
                width={90}
                onPress={() => onPressJoin()}>
                <MCIcon type="FontAwesome5Pro-Light" name="sign-in" size={40} />
                <H2 align="center">{t('button_join')}</H2>
              </MCButton>
            </NativeCard>
          )}
        </MCView>
        <NativeCard width={335}>
          {combineChallenges(item.challenges).map((challenge, index) => {
            return (
              <>
                <MCView row align="center" width={325} mt={index > 0 ? 20 : 0}>
                  <MCView width={40} align="center">
                    {getChallengeIcon(challenge.category, theme.colors.text)}
                  </MCView>
                  <H4 underline>{getChallengeCategory(challenge.category)}</H4>
                </MCView>
                <MCView ml={60} width={325}>
                  {challenge.measures.map(measure => {
                    const find = item.challenges.find(
                      i =>
                        i.category === challenge.category &&
                        i.measure === measure,
                    );
                    const completedUsers = _.get(find, ['completedUsers'], []);
                    const findIndex = completedUsers.findIndex(
                      userId => userId === profile._id,
                    );
                    return (
                      <MCCheckBox
                        checked={findIndex > -1}
                        onChange={checked =>
                          onToggleCheckMeasure(challenge.category, measure)
                        }
                        label={getChallengeMeasure(challenge.category, measure)}
                        width={280}
                        hasLeftText
                        bigText={false}
                      />
                    );
                  })}
                </MCView>
              </>
            );
          })}
        </NativeCard>
        <NativeCard width={335} mt={20} align="center">
          <MCView row wrap width={315} justify="center">
            {members.map(user => {
              if (!user.name) return null;
              return (
                <MCView align="center" width={90} ml={7.5} mr={7.5}>
                  <MCImage
                    image={{uri: user.avatar}}
                    round
                    width={70}
                    height={70}
                    type="avatar"
                  />
                  <H4>{user.name.split(' ')[0]}</H4>
                </MCView>
              );
            })}
          </MCView>
          {members.length === 0 ? (
            <MCEmptyText>{t('empty_teammates')}</MCEmptyText>
          ) : isMember ? (
            <MCButton
              width={200}
              row
              mt={20}
              align="center"
              justify="center"
              bordered
              br={10}>
              <MCIcon type="FontAwesome5Pro-Light" name="comments-alt" />
              <H4>{t('button_start_chat')}</H4>
            </MCButton>
          ) : null}
        </NativeCard>
        <NativeCard mt={20} width={335} align="flex-start">
          <H4 mb={10}>
            {getStringWithOutline(this.SkillText, {
              align: 'left',
            })}
            :
          </H4>
          <MCTagsView
            tags={item.skills.map(s =>
              s.indexOf('custom_') < 0
                ? t(`skill_${s}`)
                : s.split('custom_')[1],
            )}
          />
        </NativeCard>
      </MCView>
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
  )(ChallengeItem),
);
