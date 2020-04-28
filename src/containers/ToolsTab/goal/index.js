import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import {MCHeader, MCIcon} from 'components/common';
import NavigationService from 'navigation/NavigationService';
import {getTodayStartDateStamp} from 'services/operators';
import ObjectiveTabView from './TabView';

class GoalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentWillMount() {
    const {
      profile,
      showUserObjectives,
      getUserCommits,
      resetMyObjectives,
    } = this.props;
    showUserObjectives(false);
    getUserCommits(profile._id);

    // reset current object and set time for the next reset
    resetMyObjectives();
    const resetTimeIn =
      getTodayStartDateStamp() + 86400 * 1000 - new Date().getTime();
    setTimeout(() => {
      resetMyObjectives();
    }, resetTimeIn);
  }

  onPressNew = () => {
    this.props.setSeletedUsers([]);
    this.props.setInitialReflection('objective');
    NavigationService.navigate('EditObjective');
  };

  render() {
    const {
      t,
      route: {params},
    } = this.props;
    return (
      <View style={{flex: 1}}>
        <MCHeader
          title={t('objective_headerTitle')}
          hasRight
          rightIcon="plus"
          onPressRight={() => this.onPressNew()}
          headerIcon={
            <MCIcon type="FontAwesome5Pro" name="apple-alt" size={30} />
          }
        />
        <ObjectiveTabView initialIndex={params ? params.tabIndex : 0} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profileReducer,
});
const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  resetMyObjectives: reflectionActions.resetMyObjectives,
  getUserCommits: otherActions.getUserCommits,
  showUserObjectives: otherActions.showUserObjectives,
  setSeletedUsers: userActions.setSeletedUsers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GoalScreen),
);
