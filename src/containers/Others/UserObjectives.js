import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {reflectionActions, otherActions, userActions} from 'Redux/actions';
import {MCView} from 'components/styled/View';
import {H4, H5} from 'components/styled/Text';
import {MCHeader, MCImage, MCModal} from 'components/common';
import ObjectiveTabView from '../ToolsTab/goal/TabView';

class UserObjectiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      showAvatarModal: false,
    };
  }

  componentWillMount() {
    this.props.showUserObjectives(true);
  }

  componentWillUnmount() {
    this.props.showUserObjectives(false);
  }

  componentDidMount() {
    const {id} = this.props.route.params;
    const {getUserCommits} = this.props;
    getUserCommits(id);
  }

  onPressHeaderAvatar = () => {
    this.setState({showAvatarModal: true});
  };

  render() {
    const {showAvatarModal} = this.state;
    const {t, user, theme} = this.props;
    const {tabIndex} = this.props.route.params;
    return (
      <View style={{flex: 1}}>
        <MCHeader
          title={t('whos_objective', {who: user.name.split(' ')[0]})}
          hasRight
          rightImage={
            <MCImage image={{uri: user.avatar}} round width={30} height={30} />
          }
          onPressRight={() => this.onPressHeaderAvatar()}
        />
        <ObjectiveTabView initialIndex={tabIndex} />
        <MCModal
          isVisible={showAvatarModal}
          onClose={() => this.setState({showAvatarModal: false})}>
          <MCView align="center" width={280} mt={20}>
            <MCImage
              image={{uri: user.avatar}}
              round
              width={200}
              height={200}
            />
            <H4>{user.name}</H4>
            <H5 color={theme.colors.border}>{`@${user.user_id}`}</H5>
          </MCView>
        </MCModal>
      </View>
    );
  }
}
const mapStateToProps = state => ({
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserObjectiveScreen),
);
