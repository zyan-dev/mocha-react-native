import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import moment from 'moment';
import {challengeActions} from 'Redux/actions';
import {
  MCRootView,
  MCContent,
  MCView,
  NativeCard,
  DividerLine,
} from 'components/styled/View';
import {MCHeader, MCIcon, MCImage, MCTagsView} from 'components/common';
import {
  H2,
  H3,
  H4,
  MCTextInput,
  ErrorText,
  MCEmptyText,
} from 'components/styled/Text';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';
import {dySize} from 'utils/responsive';
import {
  combineChallenges,
  getChallengeCategory,
  getChallengeMeasure,
} from 'services/operators';
import {ChallengeIconData} from 'utils/constants';

class CompleteChallengeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateTitle()) return;
    // console.log(JSON.stringify(this.props.selectedChallenge));
    this.props.addOrUpdateChallenge();
  };

  validateTitle = () => {
    const {selectedChallenge} = this.props;
    return selectedChallenge.title.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedChallenge, updateSelectedChallenge} = this.props;
    const title = _.get(selectedChallenge, ['title'], '');
    const challenges = _.get(selectedChallenge, ['challenges'], []);
    const duration = _.get(selectedChallenge, ['duration'], 10);
    const skills = _.get(selectedChallenge, ['skills'], []);
    const invites = _.get(selectedChallenge, ['invites'], []);
    return (
      <MCRootView justify="flex-start">
        <OvalGreenImage />
        <OvalYellowImage />
        <MCHeader
          title={t('title_progress_tab_review_challenge')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onSubmit()}
        />
        <MCContent
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 100,
            paddingTop: dySize(20),
            paddingHorizontal: dySize(15),
          }}>
          <MCTextInput
            placeholder={t('placeholder_challenge_title')}
            placeholderTextColor={theme.colors.border}
            style={{width: '100%'}}
            value={title}
            onChangeText={title => updateSelectedChallenge({title})}
          />
          {submitted && !this.validateTitle() && (
            <ErrorText width={335}>{t('error_input_required')}</ErrorText>
          )}
          <MCView row mt={20} pv={5} ph={5} width={355}>
            <NativeCard
              align="flex-start"
              justify="flex-start"
              style={{flex: 1, minHeight: dySize(250)}}>
              <H4 weight="bold">Daily Challenge</H4>
              {combineChallenges(challenges).map(i => {
                return (
                  <MCView row>
                    <MCIcon
                      type="FontAwesome5Pro-Light"
                      name={
                        i.category.indexOf('custom_') < 0
                          ? ChallengeIconData[i.category]
                          : 'mountain'
                      }
                    />
                    <MCView pv={5} ml={10}>
                      <H4 underline>{getChallengeCategory(i.category)}</H4>
                      {i.measures.map(m => {
                        return <H4>{getChallengeMeasure(i.category, m)}</H4>;
                      })}
                    </MCView>
                  </MCView>
                );
              })}
            </NativeCard>
            <NativeCard
              align="flex-start"
              justify="flex-start"
              width={100}
              ml={20}
              style={{height: '100%'}}>
              <H4 weight="bold">Duration</H4>
              <H2 align="center" width={80}>
                {t('label_duration_day', {num: duration})}
              </H2>
              <DividerLine width={80} />
              <H4 mt={15} underline>
                {t('Starting')}:
              </H4>
              <H4 weight="italic" width={80} align="center">
                {moment().format('MMM Do')}
              </H4>
              <H4 underline mt={20}>
                {t('Ending')}:
              </H4>
              <H4 weight="italic" width={80} align="center">
                {moment()
                  .add(duration, 'days')
                  .format('MMM Do')}
              </H4>
            </NativeCard>
          </MCView>
          <NativeCard mt={20} width={345}>
            <H3 weight="bold" align="center">
              {t('label_invited_teammates')}
            </H3>
            <MCView row wrap>
              {invites.map(i => {
                return (
                  <MCView align="center" width={100} ml={4} mr={4} ph={10}>
                    <MCImage
                      width={80}
                      height={80}
                      round
                      type="avatar"
                      image={{uri: i.avatar}}
                    />
                    <H3 align="center">{i.name.split(' ')[0]}</H3>
                  </MCView>
                );
              })}
            </MCView>
            {invites.length === 0 && (
              <MCEmptyText>{t('no_members')}</MCEmptyText>
            )}
          </NativeCard>
          <NativeCard mt={20} width={345}>
            <H3 weight="bold" align="center" mb={10}>
              {t('label_personal_development_skills', {
                bold: t('outline_skills'),
              })}
            </H3>
            <MCTagsView
              tags={skills.map(s =>
                s.indexOf('custom_') < 0
                  ? t(`resource_book_skills_${s}`)
                  : s.split('custom_')[1],
              )}
              justify="center"
            />
          </NativeCard>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedChallenge: state.challengeReducer.selectedChallenge,
});

const mapDispatchToProps = {
  updateSelectedChallenge: challengeActions.updateSelectedChallenge,
  addOrUpdateChallenge: challengeActions.addOrUpdateChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CompleteChallengeScreen),
);
