import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import * as _ from 'lodash';
import {challengeActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import {MCHeader, MCTagInput} from 'components/common';
import {H4} from 'components/styled/Text';
import {MCView, MCContent} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';
import {challengeSkills} from 'utils/constants';
import {getStringWithOutline} from 'services/operators';
import NavigationService from 'navigation/NavigationService';

class SelectSkillsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customTagInputs: [],
      customTags: [],
    };
  }

  SkillText = {
    title: i18next.t('label_challenge_skill_select_description', {
      bold: i18next.t('outline_skills'),
    }),
    boldWordKeys: ['skills'],
  };

  onToggleSkill = skill => {
    const {updateSelectedChallenge, selectedChallenge} = this.props;
    const skills = _.get(selectedChallenge, ['skills'], []);
    const index = skills.indexOf(skill);
    if (index < 0) skills.push(skill);
    else skills.splice(index, 1);
    updateSelectedChallenge({skills});
  };

  updateTagState = state => {
    const customTags = state.tagsArray.map(tag => `custom_${tag}`);
    this.setState({
      customTags: customTags,
      customTagInputs: state.tagsArray,
    });
    const {updateSelectedChallenge, selectedChallenge} = this.props;
    const skills = _.get(selectedChallenge, ['skills'], []);
    const filtered = skills.filter(
      s => s.indexOf('custom_') < 0 || customTags.find(i => i === s),
    );
    updateSelectedChallenge({skills: filtered});
  };

  render() {
    const {customTags, customTagInputs} = this.state;
    const {t, theme, selectedChallenge} = this.props;
    const selectedSkills = _.get(selectedChallenge, ['skills'], []);
    return (
      <MCRootView justify="flex-start">
        <OvalGreenImage />
        <OvalYellowImage />
        <MCHeader
          title={t('title_progress_tab_select_skills')}
          hasRight
          rightIcon="arrow-right"
          rightText={t('button_next')}
          onPressRight={() => NavigationService.navigate('CompleteChallenge')}
        />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 30}}>
          <MCView width={320} mb={40}>
            {getStringWithOutline(this.SkillText, {
              align: 'left',
              underline: true,
            })}
          </MCView>
          <MCView row wrap justify="center">
            {challengeSkills.concat(customTags).map(skill => {
              const selected = selectedSkills.indexOf(skill) > -1;
              const custom = skill.indexOf('custom_') > -1;
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
                    {custom
                      ? skill.split('custom_')[1]
                      : t(`resource_book_skills_${skill}`)}
                  </H4>
                </MCButton>
              );
            })}
          </MCView>
          <MCView width={350} mt={40}>
            <H4>Add custom skills:</H4>
            <MCTagInput
              tags={customTagInputs}
              updateState={this.updateTagState}
            />
          </MCView>
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
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectSkillsScreen),
);
