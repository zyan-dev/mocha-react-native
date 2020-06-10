import React from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import * as _ from 'lodash';
import {
  MCHeader,
  MCIcon,
  MCTagsView,
  MCTimeSlider,
  MCImage,
} from 'components/common';
import {
  MCRootView,
  NativeCard,
  MCView,
  MCContent,
} from 'components/styled/View';
import {postActions, challengeActions} from 'Redux/actions';
import {
  PostChallengeLevels,
  PostMoraleLevels,
  ChallengeIconData,
} from 'utils/constants';
import {
  getStringWithOutline,
  combineChallenges,
  getDayOf,
} from 'services/operators';
import {H1, H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class PostDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.route.params.post,
    };
  }

  ChallengeText = {
    title: i18next.t('post_question_challenge', {
      bold: i18next.t('outline_challenge'),
    }),
    boldWordKeys: ['challenge'],
  };

  MoraleText = {
    title: i18next.t('post_question_morale', {
      bold: i18next.t('outline_morale'),
    }),
    boldWordKeys: ['morale'],
  };

  SkillText = {
    title: i18next.t('label_personal_development_skills', {
      bold: i18next.t('outline_skills'),
    }),
    boldWordKeys: ['skills'],
  };

  onPressEdit = post => {
    this.props.selectPost(post);
    NavigationService.navigate('AddPost');
  };

  onPressRemove = post => {
    const {t} = this.props;
    Alert.alert(
      t('alert_title_mocha'),
      t('alert_remove_post'),
      [
        {
          text: t('button_cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('button_ok'),
          onPress: () => {
            this.props.removePosts([post._id]);
            NavigationService.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  onPressChallenge = challenge => {
    this.props.selectChallenge(challenge);
    NavigationService.navigate('ChallengeDetail');
  };

  render() {
    const {post} = this.state;
    const {t, theme, profile, myChallenges} = this.props;
    const mine = post.ownerId === profile._id;
    const relatedChallenge = myChallenges.find(c => c._id === post.challengeId);
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={
            mine
              ? t('title_post_detail')
              : t('label_whose_post', {who: post.ownerName.split(' ')[0]})
          }
          headerIcon={
            !mine && (
              <MCImage
                image={{uri: post.ownerAvatar}}
                width={40}
                height={40}
                round
                type="avatar"
              />
            )
          }
          hasRight={mine}
          rightIconType="Ionicon"
          rightIcon="ios-create"
          onPressRight={() => this.onPressEdit(post)}
        />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 30}}>
          <NativeCard width={350} mt={20} align="flex-start">
            <H3 weight="bold">{post.title}</H3>
            <H4>{post.content}</H4>
            <MCView row wrap width={340}>
              {post.attachments.map(path => {
                return (
                  <MCImage
                    image={{uri: path}}
                    width={100}
                    height={100}
                    br={10}
                    style={{marginRight: dySize(10)}}
                  />
                );
              })}
            </MCView>
          </NativeCard>
          <NativeCard width={350} mt={20}>
            <MCView width={320}>
              {getStringWithOutline(this.ChallengeText, {align: 'left'})}
            </MCView>
            <MCTimeSlider
              values={PostChallengeLevels}
              showBottomLabel
              value={[post.level_challenge]}
              showLabel={false}
              mt={20}
              width={300}
              enabledLeft={false}
            />
          </NativeCard>
          <NativeCard width={350} mt={20}>
            <MCView width={320}>
              {getStringWithOutline(this.MoraleText, {align: 'left'})}
            </MCView>
            <MCTimeSlider
              values={PostMoraleLevels}
              showBottomLabel
              value={[post.level_morale]}
              showLabel={false}
              mt={20}
              width={300}
              enabledLeft={false}
            />
          </NativeCard>
          {relatedChallenge && (
            <NativeCard width={350} mt={20} pv={1}>
              <MCButton
                width={350}
                align="center"
                onPress={() => this.onPressChallenge(relatedChallenge)}>
                <H3 weight="bold">{relatedChallenge.title}</H3>
                <MCView row wrap mb={10}>
                  {combineChallenges(relatedChallenge.challenges)
                    .slice(0, 4)
                    .map(i => {
                      return (
                        <MCIcon
                          type="FontAwesome5Pro-Light"
                          name={
                            i.category.indexOf('custom_') < 0
                              ? ChallengeIconData[i.category]
                              : 'mountain'
                          }
                          size={30}
                        />
                      );
                    })}
                </MCView>
                <MCView row align="center">
                  <H3>{t('unit_day')}: </H3>
                  <H1 weight="bold">
                    {getDayOf(relatedChallenge.created_at)}
                    <H3> /{relatedChallenge.duration}</H3>
                  </H1>
                </MCView>
              </MCButton>
            </NativeCard>
          )}

          <NativeCard width={350} mt={20}>
            <MCView width={320}>
              {getStringWithOutline(this.SkillText, {
                align: 'left',
                underline: true,
              })}
            </MCView>
            <MCTagsView tags={_.get(post, ['skills'], [])} />
          </NativeCard>
          {mine && (
            <MCView mt={50} mb={30} align="center">
              <MCButton
                onPress={() => this.onPressRemove(post)}
                align="center"
                width={250}
                bordered
                background={theme.colors.danger}>
                <H3 color="white">{t('button_remove_post')}</H3>
              </MCButton>
            </MCView>
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  myChallenges: state.challengeReducer.myChallenges,
});

const mapDispatchToProps = {
  selectPost: postActions.selectPost,
  removePosts: postActions.removePosts,
  selectChallenge: challengeActions.selectChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PostDetailScreen),
);
