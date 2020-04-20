import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {networkActions, userActions} from 'Redux/actions';
import {MCRootView, MCCard, MCView, MCContent} from 'components/styled/View';
import {MCHeader, MCImage} from 'components/common';
import {H2, H3, H4, MCIcon, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {FlatList} from 'react-native-gesture-handler';

class MyTrustNetworkScreen extends React.Component {
  componentDidMount() {
    this.props.getTrustNetworks();
  }

  onPressNewNetwork = () => {
    const {initTrustNetwork, profile} = this.props;
    initTrustNetwork(profile._id);
    NavigationService.navigate('ManageTrustNetwork', {new: true});
  };

  onEditNetwork = network => {
    const {setSeletedUsers, selectTrustNetwork, allUsers} = this.props;
    const filtered = allUsers.filter(
      user => network.members.indexOf(user._id) > -1,
    );
    // select network members with full profile data
    setSeletedUsers(filtered);
    // select network for edit screen
    selectTrustNetwork(network);
    NavigationService.navigate('ManageTrustNetwork', {new: false});
  };

  renderAvatars = network => {
    const {allUsers} = this.props;
    return (
      <MCView width={80} height={70} style={{position: 'relative'}}>
        {network.members.slice(0, 3).map((memberId, index) => {
          const find = allUsers.find(user => user._id === memberId);
          return (
            <MCImage
              key={index}
              width={40}
              height={40}
              round
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

  _renderNetworkItem = ({item}) => {
    const network = item;
    const {t, theme} = this.props;
    return (
      <MCCard row mb={10} height={70} align="center">
        {this.renderAvatars(network)}
        <MCView style={{flex: 1}}>
          <H3>{network.name}</H3>
          {network.members.length === 0 && (
            <H4 color={theme.colors.border}>{t('no_members')}</H4>
          )}
          {network.members.length === 1 && (
            <H4 color={theme.colors.border}>{`1 ${t('network_member')}`}</H4>
          )}
          {network.members.length > 1 && (
            <H4 color={theme.colors.border}>
              {`${network.members.length} ${t('members')}`}
            </H4>
          )}
        </MCView>
        <MCButton onPress={() => this.onEditNetwork(network)}>
          <MCIcon name="edit" type="FontAwesome" />
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, myNetworks} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('feed_network_headerTitle')} />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H2 align="center" mb={10}>
            {t('trust_network')}
          </H2>
          <FlatList
            data={myNetworks}
            renderItem={this._renderNetworkItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={<MCEmptyText>{t('empty_network')}</MCEmptyText>}
          />
          <MCCard row height={70} align="center">
            <MCButton
              row
              align="center"
              style={{flex: 1}}
              onPress={() => this.onPressNewNetwork()}>
              <MCIcon name="ios-add" size={40} />
              <H3 ml={10}>{t('create_network')}</H3>
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
  setSeletedUsers: userActions.setSeletedUsers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MyTrustNetworkScreen),
);
