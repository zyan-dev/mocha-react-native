import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {postActions, challengeActions} from 'Redux/actions';
import {MCRootView, MCContent} from 'components/styled/View';
import {MCHeader} from 'components/common';
import ChallengeItem from './main/components/ChallengeItem';
import NavigationService from 'navigation/NavigationService';

class ChallengeDetail extends React.PureComponent {
  onPressAddPost = () => {
    const {focusedChallenge} = this.props;
    this.props.setInitialPost(focusedChallenge._id);
    NavigationService.navigate('AddPost');
  };

  onPressJoin = () => {
    const {
      profile,
      focusedChallenge,
      updateFocusedChallenge,
      addOrUpdateChallenge,
    } = this.props;
    const teammates = focusedChallenge.teammates.concat([profile]);
    updateFocusedChallenge({teammates});
    setTimeout(() => {
      addOrUpdateChallenge('focused');
    });
  };

  render() {
    const {t, profile, focusedChallenge} = this.props;
    const isMember =
      [focusedChallenge.ownerId]
        .concat(focusedChallenge.teammates.map(i => i._id))
        .indexOf(profile._id) > -1;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={focusedChallenge.title} />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 30}}>
          <ChallengeItem
            item={focusedChallenge}
            isMember={isMember}
            onPressAddPost={() => this.onPressAddPost()}
            onPressJoin={() => this.onPressJoin()}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  focusedChallenge: state.challengeReducer.focusedChallenge,
});

const mapDispatchToProps = {
  setInitialPost: postActions.setInitialPost,
  updateFocusedChallenge: challengeActions.updateFocusedChallenge,
  addOrUpdateChallenge: challengeActions.addOrUpdateChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChallengeDetail),
);
