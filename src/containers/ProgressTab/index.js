import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import ProgressScreen from './main';
import AddPostScreen from './AddPost';
import PostDetailScreen from './PostDetail';
import ChallengeDetailScreen from './ChallengeDetail';
import SelectTeammatesScreen from './main/add_challenge/SelectTeammates';
import SelectSkillsScreen from './main/add_challenge/SelectSkills';
import CompleteChallengeScreen from './main/add_challenge/CompleteChallenge';
import SelectChallengesScreen from './main/add_challenge/SelectChallenges';
import SelectDurationScreen from './main/add_challenge/SelectDuration';
import {routerActions} from 'Redux/actions';

const Stack = createStackNavigator();

class ProgressTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="Progress">
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen
          name="ChallengeDetail"
          component={ChallengeDetailScreen}
        />
        <Stack.Screen
          name="SelectTeammates"
          component={SelectTeammatesScreen}
        />
        <Stack.Screen name="SelectSkills" component={SelectSkillsScreen} />
        <Stack.Screen
          name="CompleteChallenge"
          component={CompleteChallengeScreen}
        />
        <Stack.Screen
          name="SelectChallenges"
          component={SelectChallengesScreen}
        />
        <Stack.Screen name="SelectDuration" component={SelectDurationScreen} />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = state => ({
  isDrawerOpened: state.routerReducer.isProfileDrawerOpened,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgressTabStack);
