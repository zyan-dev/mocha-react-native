import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCRootView, MCContent} from 'components/styled/View';
import {MCHeader} from 'components/common';
import ChallengeItem from './main/components/ChallengeItem';

class ChallengeDetail extends React.PureComponent {
  render() {
    const {t, profile, selectedChallenge} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={selectedChallenge.title} />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 30}}>
          <ChallengeItem
            item={selectedChallenge}
            mine={selectedChallenge._id === profile._id}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  selectedChallenge: state.challengeReducer.selectedChallenge,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChallengeDetail),
);
