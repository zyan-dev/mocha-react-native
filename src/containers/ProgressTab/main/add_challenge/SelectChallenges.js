import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import * as _ from 'lodash';
import {challengeActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import {MCCheckBox, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCView, MCContent} from 'components/styled/View';
import {getStringWithOutline} from 'services/operators';
import {TemplateDailyChallenges, ChallengeIconData} from 'utils/constants';
import {dySize} from 'utils/responsive';

class SelectChallengsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      challenges.splice(findIndex, 1);
    } else {
      challenges.push({catgory, measure});
    }
    updateSelectedChallenge({challenges});
  };

  render() {
    const {t, selectedChallenge} = this.props;
    if (!selectedChallenge) return null;
    const challenges = _.get(selectedChallenge, ['challenges'], []);
    return (
      <MCRootView justify="flex-start">
        <H3 mt={10}>{getStringWithOutline(this.title, {align: 'center'})}</H3>
        <MCContent contentContainerStyle={{paddingHorizontal: 50}}>
          {TemplateDailyChallenges.map(challenge => {
            return (
              <MCView mt={15}>
                <MCView row align="center">
                  <MCView width={40} align="center">
                    <MCIcon
                      type="FontAwesome5Pro-Light"
                      name={ChallengeIconData[challenge.category]}
                    />
                  </MCView>
                  <H3 underline ml={20} weight="bold">
                    {t(`progress_challenge_title_${challenge.category}`)}
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
                        label={measure}
                        width={200}
                      />
                    );
                  })}
                </MCView>
              </MCView>
            );
          })}
        </MCContent>
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
