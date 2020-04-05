import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import {MCHeader} from 'components/common';
import {getTodayStartDateStamp} from 'services/operators';
import ObjectiveTabView from '../AddTab/goal/TabView';
import {MCImage} from '../../components/common';

class UserObjectiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentWillMount() {
    this.props.showUserObjectives(true);
  }

  componentWillUnmount() {
    this.props.showUserObjectives(false);
  }

  componentDidMount() {
    const {user, getUserCommits} = this.props;
    getUserCommits(user._id);
  }

  render() {
    const {t, user} = this.props;
    return (
      <View style={{flex: 1}}>
        <MCHeader
          title={t('whos_objective', {who: user.name})}
          hasRight
          rightImage={
            <MCImage image={{uri: user.avatar}} round width={30} height={30} />
          }
          onPressRight={() => this.onPressNew()}
        />
        <ObjectiveTabView />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
  user: state.usersReducer.userProfile,
});
const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  resetMyObjectives: reflectionActions.resetMyObjectives,
  getUserCommits: otherActions.getUserCommits,
  setSeletedUsers: userActions.setSeletedUsers,
  showUserObjectives: otherActions.showUserObjectives,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UserObjectiveScreen),
);
