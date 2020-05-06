import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {userActions} from 'Redux/actions';
import {MCHeader, MCImage} from 'components/common';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCCard, MCView, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {selector} from 'Redux/selectors';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class PendingRequestScreen extends React.Component {
  componentDidMount() {
    this.props.getAllTrustMembers();
  }

  onAddUser = user => {
    NavigationService.navigate('AddPendingUser', {pendingUser: user});
  };

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  _renderPendingReqeustItem = ({item}) => {
    const {t, theme, declineRequest, allUsers} = this.props;
    const user = allUsers.find(user => user._id === item.requestId);
    return (
      <MCCard p={1} row align="center" mb={10}>
        <MCButton onPress={() => this.onPressUserAvatar(user)}>
          <MCImage
            width={80}
            height={80}
            round
            type="avatar"
            image={{uri: user.avatar}}
          />
        </MCButton>
        <MCView style={{flex: 1}} justify="center">
          <H3>{user.name}</H3>
          <H4 padding={0} color={theme.colors.border}>{`@${user.user_id}`}</H4>
        </MCView>
        <MCView mr={10}>
          <MCButton
            pt={1}
            pb={1}
            bordered
            width={80}
            align="center"
            onPress={() => this.onAddUser(user)}>
            <H4>{t('add_addButton')}</H4>
          </MCButton>
          <MCButton
            onPress={() => declineRequest(user.requestId)}
            mt={10}
            pt={1}
            pb={1}
            bordered
            width={80}
            align="center"
            style={{borderColor: theme.colors.border}}>
            <H4 color={theme.colors.danger}>{t('button_remove')}</H4>
          </MCButton>
        </MCView>
      </MCCard>
    );
  };

  render() {
    const {t, pendingUsers} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('feed_menu_pending_requests')} />
        <FlatList
          style={{width: dySize(355)}}
          data={pendingUsers}
          renderItem={this._renderPendingReqeustItem}
          keyExtractor={item => item.requestId}
          ListEmptyComponent={<MCEmptyText>{t('empty_request')}</MCEmptyText>}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  pendingUsers: selector.users.getAllPendingUsers(state),
  theme: state.routerReducer.theme,
  allUsers: state.usersReducer.allUsers,
});

const mapDispatchToProps = {
  declineRequest: userActions.declineRequest,
  getAllTrustMembers: userActions.getAllTrustMembers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PendingRequestScreen),
);
