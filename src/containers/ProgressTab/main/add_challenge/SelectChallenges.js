import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import * as _ from 'lodash';
import {challengeActions} from 'Redux/actions';
import {MCCheckBox, MCIcon, MCHeader} from 'components/common';
import {H3, MCTextInput} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {getStringWithOutline, showAlert} from 'services/operators';
import {TemplateDailyChallenges, ChallengeIconData} from 'utils/constants';
import NavigationService from 'navigation/NavigationService';
import {OvalYellow, OvalGreen} from 'assets/images';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';

class SelectChallengsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customChallenges: [],
      tempChallenge: {category: '', measures: ['']},
    };
  }

  title = {
    title: i18next.t('progress_title_select_challenges', {
      bold: i18next.t('outline_challenging'),
    }),
    boldWordKeys: ['challenging'],
  };

  onToggleChallenge = (category, measure, checked) => {
    const {
      selectedChallenge: {challenges},
      updateSelectedChallenge,
    } = this.props;
    const findIndex = challenges.findIndex(
      i => i.category === category && i.measure === measure,
    );
    if (findIndex < 0) {
      challenges.push({category, measure});
    } else {
      challenges.splice(findIndex, 1);
    }
    console.log({challenges});
    updateSelectedChallenge({challenges});
  };

  onChangeCustomCategory = text => {
    this.setState({
      tempChallenge: {
        ...this.state.tempChallenge,
        category: text,
      },
    });
  };

  onChangeCustomMeasure = (measure, index) => {
    const {
      tempChallenge: {category, measures},
    } = this.state;
    if (measure === '') return;
    measures[index] = measure;
    this.setState({
      tempChallenge: {
        category,
        measures,
      },
    });
  };

  onAddorRemoveCustomMeasure = index => {
    const {
      tempChallenge: {category, measures},
    } = this.state;
    if (measures[index].length === 0) return;
    if (index === measures.length - 1) measures.push('');
    else measures.splice(index, 1);
    this.setState({
      tempChallenge: {
        category,
        measures,
      },
    });
  };

  onAddCustomChallenge = () => {
    const {customChallenges, tempChallenge} = this.state;
    if (tempChallenge.category.length === 0) return;
    if (tempChallenge.measures.filter(i => i.length > 0).length === 0) return;
    const duplicated = TemplateDailyChallenges.concat(customChallenges).find(
      i =>
        this.getCategory(i.category).toLowerCase() ===
          tempChallenge.category.toLowerCase() ||
        i.category.toLowerCase() ===
          `custom_${tempChallenge.category.toLowerCase()}`,
    );
    if (duplicated) {
      showAlert(this.props.t('error_duplicated_challenge_category'));
      return;
    }
    customChallenges.push({
      category: `custom_${tempChallenge.category}`,
      measures: tempChallenge.measures.filter(i => i.length > 0),
    });
    this.setState({
      customChallenges,
      tempChallenge: {category: '', measures: ['']},
    });
  };

  getCategory = category => {
    const isCustom = category.indexOf('custom_') > -1;
    if (isCustom) return category.split('custom_')[1];
    else return this.props.t(`progress_challenge_title_${category}`);
  };

  getMeasure = (category, measure) => {
    const isCustom = category.indexOf('custom_') > -1;
    if (isCustom) return measure;
    else return this.props.t(`progress_measure_${category}_${measure}`);
  };

  onPressNext = () => {
    const {t, selectedChallenge} = this.props;
    if (selectedChallenge.challenges.length === 0) {
      showAlert(t('error_input_select_empty'));
      return;
    }
    NavigationService.navigate('SelectDuration');
  };

  render() {
    const {customChallenges, tempChallenge} = this.state;
    const {t, selectedChallenge} = this.props;
    if (!selectedChallenge) return null;
    const challenges = _.get(selectedChallenge, ['challenges'], []);
    return (
      <MCRootView justify="flex-start">
        <OvalGreenImage source={OvalGreen} resizeMode="stretch" />
        <OvalYellowImage source={OvalYellow} resizeMode="stretch" />
        <MCHeader
          title={t('title_progress_tab_select_challenges')}
          hasRight
          rightIcon="arrow-right"
          rightText={t('button_next')}
          onPressRight={() => this.onPressNext()}
        />
        <H3 mt={10} mb={10}>
          {getStringWithOutline(this.title, {align: 'center'})}
        </H3>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'padding'}>
          <MCContent
            enableResetScrollToCoords={false}
            contentContainerStyle={{
              paddingHorizontal: 50,
              alignItems: 'center',
              paddingBottom: 200,
            }}>
            {TemplateDailyChallenges.concat(customChallenges).map(challenge => {
              return (
                <MCView mt={15} width={300}>
                  <MCView row align="center">
                    <MCView width={40} align="center">
                      <MCIcon
                        type="FontAwesome5Pro-Light"
                        name={
                          challenge.category.indexOf('custom_') < 0
                            ? ChallengeIconData[challenge.category]
                            : 'mountain'
                        }
                      />
                    </MCView>
                    <H3 underline ml={20} weight="bold">
                      {this.getCategory(challenge.category)}
                    </H3>
                  </MCView>
                  <MCView ml={60}>
                    {challenge.measures.map(measure => {
                      const findIndex = challenges.findIndex(
                        i =>
                          i.category === challenge.category &&
                          i.measure === measure,
                      );
                      return (
                        <MCCheckBox
                          checked={findIndex > -1}
                          onChange={checked =>
                            this.onToggleChallenge(
                              challenge.category,
                              measure,
                              checked,
                            )
                          }
                          label={this.getMeasure(challenge.category, measure)}
                          width={200}
                        />
                      );
                    })}
                  </MCView>
                </MCView>
              );
            })}

            <MCView
              width={320}
              bordered
              br={10}
              ph={10}
              pv={10}
              mt={30}
              align="center">
              <MCView width={300} row align="center">
                <MCView width={40} align="center">
                  <MCIcon type="FontAwesome5Pro-Light" name="mountain" />
                </MCView>
                <H3>{t('progress_what_category')}</H3>
              </MCView>
              <MCView width={300}>
                <MCTextInput
                  underline
                  style={{width: '100%'}}
                  value={tempChallenge.category}
                  onChangeText={text => this.onChangeCustomCategory(text)}
                />
              </MCView>
              <MCView width={300} row align="center" mt={20}>
                <MCView width={40} align="center">
                  <MCIcon type="FontAwesome5Pro-Light" name="ruler" />
                </MCView>
                <H3>{t('progress_what_is_habit_to_perform')}</H3>
              </MCView>
              {tempChallenge.measures.map((measure, index) => {
                return (
                  <MCView row align="center" width={300} key={index}>
                    <MCView style={{flex: 1}}>
                      <MCTextInput
                        underline
                        style={{width: '100%'}}
                        value={tempChallenge.measures[index]}
                        onChangeText={text =>
                          this.onChangeCustomMeasure(text, index)
                        }
                        autoFocus={
                          index > 0 &&
                          index === tempChallenge.measures.length - 1
                        }
                      />
                    </MCView>
                    <MCButton
                      onPress={() => this.onAddorRemoveCustomMeasure(index)}>
                      <MCView align="center">
                        <MCIcon
                          type="FontAwesome5Pro-Light"
                          name={
                            index === tempChallenge.measures.length - 1
                              ? 'plus-circle'
                              : 'minus-circle'
                          }
                        />
                      </MCView>
                    </MCButton>
                  </MCView>
                );
              })}
              <MCButton
                width={200}
                onPress={() => this.onAddCustomChallenge()}
                bordered
                align="center"
                mt={30}
                br={10}
                ph={20}>
                <H3>{t('button_add')}</H3>
              </MCButton>
            </MCView>
          </MCContent>
        </KeyboardAvoidingView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedChallenge: state.challengeReducer.selectedChallenge,
});

const mapDispatchToProps = {
  updateSelectedChallenge: challengeActions.updateSelectedChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectChallengsScreen),
);
