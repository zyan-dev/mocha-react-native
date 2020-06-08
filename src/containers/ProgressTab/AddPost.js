import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import i18next from 'i18next';
import * as _ from 'lodash';
import {dySize} from 'utils/responsive';
import {MCButton} from 'components/styled/Button';
import {postActions} from 'Redux/actions';
import {H4, ErrorText} from 'components/styled/Text';
import {getStringWithOutline} from 'services/operators';
import {
  PostChallengeLevels,
  PostMoraleLevels,
  skills as PostSkills,
} from 'utils/constants';
import {
  MCHeader,
  MCIcon,
  MCEditableText,
  MCTimeSlider,
  MCImage,
} from 'components/common';
import {
  MCRootView,
  NativeCard,
  MCView,
  MCContent,
  DividerLine,
} from 'components/styled/View';

class AddPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
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
    title: i18next.t('post_skill_select_description', {
      bold: i18next.t('outline_skills'),
    }),
    boldWordKeys: ['skills'],
  };

  onSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateTitle()) return;
    if (!this.validateContent()) return;
    this.props.addOrUpdatePost();
  };

  onPressAttachment = () => {
    const {
      updateSelectedPost,
      selectedPost: {attachments},
    } = this.props;
    ImagePicker.openPicker({
      width: 400,
      height: 600,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // image object (path, data ...)
      attachments.push(image.path);
      updateSelectedPost({attachments});
    });
  };

  onToggleSkill = skill => {
    const {updateSelectedPost, selectedPost} = this.props;
    const skills = _.get(selectedPost, ['skills'], []);
    const index = skills.indexOf(skill);
    if (index < 0) skills.push(skill);
    else skills.splice(index, 1);
    updateSelectedPost({skills});
  };

  validateTitle = () => {
    return this.props.selectedPost.title.length > 0;
  };

  validateContent = () => {
    return this.props.selectedPost.content.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedPost, updateSelectedPost} = this.props;
    const skills = _.get(selectedPost, ['skills'], []);
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t(selectedPost._id ? 'title_edit_post' : 'title_add_post')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onSubmit()}
        />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 30}}>
          <NativeCard width={350} mt={20}>
            {submitted && !this.validateTitle() && (
              <ErrorText width={320}>{t('error_input_required')}</ErrorText>
            )}
            <MCView row align="center">
              <MCEditableText
                text={selectedPost.title}
                bordered={false}
                onChange={text => updateSelectedPost({title: text})}
                style={{flex: 1}}
                placeholder="Post Title"
                maxLength={256}
              />
              <MCButton onPress={() => this.onPressAttachment()}>
                <MCIcon type="FontAwesome5Pro" name="file-upload" />
              </MCButton>
            </MCView>
            <DividerLine width={320} />
            {submitted && !this.validateContent() && (
              <ErrorText width={320}>{t('error_input_required')}</ErrorText>
            )}
            <MCEditableText
              multiline
              text={selectedPost.content}
              bordered={false}
              onChange={text => updateSelectedPost({content: text})}
              style={{
                flex: 1,
                minHeight: 100,
                paddingTop: 10,
              }}
              placeholder="Write your post here"
              maxLength={1024}
            />
            <MCView row wrap width={320}>
              {selectedPost.attachments.map(path => {
                return (
                  <MCImage
                    image={{uri: path}}
                    width={100}
                    height={100}
                    br={10}
                    style={{marginRight: dySize(5)}}
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
              value={[selectedPost.level_challenge]}
              showLabel={false}
              mt={20}
              width={300}
              onChange={value =>
                updateSelectedPost({level_challenge: value[0]})
              }
            />
          </NativeCard>
          <NativeCard width={350} mt={20}>
            <MCView width={320}>
              {getStringWithOutline(this.MoraleText, {align: 'left'})}
            </MCView>
            <MCTimeSlider
              values={PostMoraleLevels}
              showBottomLabel
              value={[selectedPost.level_morale]}
              showLabel={false}
              mt={20}
              width={300}
              onChange={value => updateSelectedPost({level_morale: value[0]})}
            />
          </NativeCard>
          <NativeCard width={350} mt={20}>
            <MCView width={320}>
              {getStringWithOutline(this.SkillText, {
                align: 'left',
                underline: true,
              })}
            </MCView>
            <MCView row wrap justify="center">
              {PostSkills.map(skill => {
                const selected = skills.indexOf(skill) > -1;
                return (
                  <MCButton
                    mt={10}
                    mr={10}
                    pt={1}
                    pb={1}
                    bordered
                    onPress={() => this.onToggleSkill(skill)}
                    background={
                      selected ? theme.colors.outline : theme.colors.card_border
                    }>
                    <H4
                      ph={10}
                      color={
                        selected ? theme.colors.background : theme.colors.text
                      }>
                      {t(`resource_book_skills_${skill}`)}
                    </H4>
                  </MCButton>
                );
              })}
            </MCView>
          </NativeCard>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedPost: state.postReducer.selectedPost,
});

const mapDispatchToProps = {
  updateSelectedPost: postActions.updateSelectedPost,
  addOrUpdatePost: postActions.addOrUpdatePost,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddPostScreen),
);
