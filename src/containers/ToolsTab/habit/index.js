import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import {MCHeader, MCIcon} from 'components/common';
import NavigationService from 'navigation/NavigationService';
import {getTodayStartDateStamp} from 'services/operators';
import HabitTabView from './TabView';
import {AppleSvg} from 'assets/svgs';

class GoalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentWillMount() {
    const {profile, showUserHabits, getUserCommits, resetMyHabits} = this.props;
    showUserHabits(false);
    getUserCommits(profile._id);

    // reset current object and set time for the next reset
    resetMyHabits();
    const resetTimeIn =
      getTodayStartDateStamp() + 86400 * 1000 - new Date().getTime();
    setTimeout(() => {
      resetMyHabits();
    }, resetTimeIn);
  }

  onPressNew = () => {
    this.props.setSeletedUsers([]);
    this.props.setInitialReflection('habit');
    NavigationService.navigate('EditHabit');
  };

  render() {
    const {
      t,
      route: {params},
    } = this.props;
    return (
      <View style={{flex: 1}}>
        <MCHeader
          title={t('habit_headerTitle')}
          hasRight
          rightIcon="plus"
          onPressRight={() => this.onPressNew()}
          headerIcon={<AppleSvg size={25} />}
        />
        <HabitTabView initialIndex={params ? params.tabIndex : 0} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profileReducer,
});
const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  resetMyHabits: reflectionActions.resetMyHabits,
  getUserCommits: otherActions.getUserCommits,
  showUserHabits: otherActions.showUserHabits,
  setSeletedUsers: userActions.setSeletedUsers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GoalScreen),
);
