import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {networkActions, userActions} from 'Redux/actions';
import {MCRootView, MCCard, MCView, MCContent} from 'components/styled/View';
import {MCHeader, MCImage} from 'components/common';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {showAlert} from 'services/operators';

class AddPendingUserScreen extends React.Component {
  componentDidMount() {
    this.props.getTrustNetworks();
  }

  onPressNewNetwork = () => {
    const {setSeletedUsers, initTrustNetwork, profile} = this.props;
    initTrustNetwork(profile._id);
    setSeletedUsers([this.props.route.params.pendingUser]);
    NavigationService.navigate('ManageTrustNetwork', {new: true});
  };

  onAdd = network => {
    const {selectTrustNetwork, updateNetwork} = this.props;
    try {
      const pendingUserId = this.props.route.params.pendingUser._id;
      selectTrustNetwork({
        ...network,
        members: network.members.concat([pendingUserId]),
      });
      setTimeout(() => {
        updateNetwork();
        this.props.approveRequest(pendingUserId);
      });
    } catch (e) {
      showAlert(e.toString());
    }
  };

  renderAvatars = network => {
    const {allUsers} = this.props;
    return (
      <MCView width={80} height={70} style={{position: 'relative'}}>
        {network.members.slice(0, 3).map((memberId, index) => {
          const find = allUsers.find(user => user._id === memberId);
          return (
            <MCImage
              key={memberId}
              width={40}
              height={40}
              round
              type="avatar"
              image={{uri: find ? find.avatar : ''}}
              style={{
                position: 'absolute',
                left: 20 * index,
                top: dySize(15),
              }}
            />
          );
        })}
      </MCView>
    );
  };

  render() {
    const {
      t,
      theme,
      myNetworks,
      route: {
        params: {pendingUser},
      },
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('feed_network_add_headerTitle')} />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          {myNetworks.map(network => {
            return (
              <MCCard key={network._id} row mb={10} height={70} align="center">
                {this.renderAvatars(network)}
                <MCView style={{flex: 1}}>
                  <H3>{network.name}</H3>
                  {network.members.length === 0 && (
                    <H4 color={theme.colors.border}>{t('no_members')}</H4>
                  )}
                  {network.members.length === 1 && (
                    <H4 color={theme.colors.border}>
                      {`1 ${t('network_member')}`}
                    </H4>
                  )}
                  {network.members.length > 1 && (
                    <H4 color={theme.colors.border}>
                      {`${network.members.length} ${t('members')}`}
                    </H4>
                  )}
                </MCView>
                {/* {You can't add pending user to a network which has him as a member} */}
                {network.members.indexOf(pendingUser._id) < 0 && (
                  <MCButton
                    pl={20}
                    pr={20}
                    mr={5}
                    bordered
                    onPress={() => this.onAdd(network)}>
                    <H4>{t('add_addButton')}</H4>
                  </MCButton>
                )}
              </MCCard>
            );
          })}
          <MCCard row height={70} align="center">
            <MCButton
              row
              align="center"
              style={{flex: 1}}
              onPress={() => this.onPressNewNetwork()}>
              <MCIcon name="ios-add" size={40} />
              <H3>{t('create_network')}</H3>
            </MCButton>
          </MCCard>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  myNetworks: state.networkReducer.myNetworks,
  allUsers: state.usersReducer.allUsers,
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getTrustNetworks: networkActions.getTrustNetworks,
  initTrustNetwork: networkActions.initTrustNetwork,
  selectTrustNetwork: networkActions.selectTrustNetwork,
  updateNetwork: networkActions.updateNetwork,
  setSeletedUsers: userActions.setSeletedUsers,
  approveRequest: userActions.approveRequest,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddPendingUserScreen),
);
