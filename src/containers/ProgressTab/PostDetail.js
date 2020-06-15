import React from 'react';
import {Alert, Modal} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import ImageViewer from 'react-native-image-zoom-viewer';
import {SkypeIndicator} from 'react-native-indicators';
import i18next from 'i18next';
import * as _ from 'lodash';
import {H1, H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
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
import {PostChallengeLevels, PostMoraleLevels} from 'utils/constants';
import {
  getStringWithOutline,
  combineChallenges,
  getDayOf,
  getChallengeIcon,
} from 'services/operators';

class PostDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.route.params.post,
      selectedImageUrl: null,
      showImagePreview: false,
    };
  }

  ChallengeText = {
    title: i18next.t('post_question_challenge', {
      bold: i18next.t('outline_challenging'),
    }),
    boldWordKeys: ['challenging'],
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

  getGallaryImages = () => {
    return this.state.post.attachments.map(i => ({url: i}));
  };

  getSelectedImageIndex = () => {
    const {post, selectedImageUrl} = this.state;
    const index = post.attachments.findIndex(i => i === selectedImageUrl);
    return index;
  };

  render() {
    const {post, selectedImageUrl, showImagePreview} = this.state;
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
                  <MCButton
                    pt={1}
                    pb={1}
                    pl={1}
                    pr={1}
                    onPress={() =>
                      this.setState({
                        selectedImageUrl: path,
                        showImagePreview: true,
                      })
                    }>
                    <MCImage
                      image={{uri: path}}
                      width={100}
                      height={100}
                      br={10}
                      style={{marginRight: dySize(10)}}
                    />
                  </MCButton>
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
                      return getChallengeIcon(i.category, theme.colors.text);
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
            <MCTagsView
              tags={post.skills.map(s =>
                s.indexOf('custom_') < 0
                  ? t(`skill_${s}`)
                  : s.split('custom_')[1],
              )}
            />
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
        {selectedImageUrl && (
          <Modal visible={showImagePreview} transparent={true}>
            <ImageViewer
              index={this.getSelectedImageIndex()}
              imageUrls={this.getGallaryImages()}
              renderHeader={() => null}
              loadingRender={() => <SkypeIndicator color={theme.colors.text} />}
            />
            <MCButton
              style={{
                position: 'absolute',
                top: 40,
                right: 20,
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.background,
              }}
              onPress={() => this.setState({showImagePreview: false})}>
              <MCIcon type="FontAwesome5Pro" name="times" size={20} />
            </MCButton>
          </Modal>
        )}
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
