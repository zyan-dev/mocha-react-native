import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {challengeActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import {MCHeader, MCCheckBox} from 'components/common';
import {H4} from 'components/styled/Text';
import {MCContent} from 'components/styled/View';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';
import NavigationService from 'navigation/NavigationService';

const Durations = [7, 10, 14, 20, 30, 60, 90];

class SelectDurationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 7,
    };
  }

  onPressOption = option => {
    this.setState({duration: option});
  };

  onPressNext = () => {
    this.props.updateSelectedChallenge({duration: this.state.duration});
    NavigationService.navigate('SelectTeammates');
  };

  render() {
    const {duration} = this.state;
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <OvalGreenImage />
        <OvalYellowImage />
        <MCHeader
          title={t('title_progress_tab_select_duration')}
          hasRight
          rightIcon="arrow-right"
          rightText={t('button_next')}
          onPressRight={() => this.onPressNext()}
        />
        <H4 weight="bold" mt={10} mb={10} align="center">
          {t('progress_title_select_duration')}
        </H4>
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingTop: 50}}>
          {Durations.map(d => {
            return (
              <MCCheckBox
                checked={duration === d}
                onChange={checked => this.onPressOption(d)}
                label={t('label_duration_day', {num: d})}
                width={250}
              />
            );
          })}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  updateSelectedChallenge: challengeActions.updateSelectedChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectDurationScreen),
);
