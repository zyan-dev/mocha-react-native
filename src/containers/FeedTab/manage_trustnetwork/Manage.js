import React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {withTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
import {FlatList} from 'react-native-gesture-handler';
import {networkActions, userActions} from 'Redux/actions';
import {MCRootView, MCContent, MCCard, MCView} from 'components/styled/View';
import {MCHeader, MCImage, MCTextFormInput, MCIcon} from 'components/common';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import NetworkBasicPermissions from './BasicPermissions';
import NetworkAdvancedPermissions from './AdvancedPermissions';
import {BasicPermissions, AdvancedPermissions} from 'utils/constants';

class ManageTrustNetworkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: props.route.params.new, // true: create network, false: edit network
      tags: props.selectedNetwork.tags,
      submitted: false,
    };
  }

  onPressDone = () => {
    const {isNew} = this.state;
    const {
      selectedUsers,
      createNetwork,
      updateNetwork,
      updateSelectedTrustNetwork,
    } = this.props;
    this.setState({submitted: true});
    if (!this.validateName()) return;
    if (!this.validateMembers()) return;
    if (!this.validatePermissions()) return;
    const members = selectedUsers.map(user => user._id);
    updateSelectedTrustNetwork({members});
    if (isNew) {
      createNetwork();
    } else {
      updateNetwork();
    }
  };

  onPressAddMember = () => {
    NavigationService.navigate('SelectUntrustMember');
  };

  onDelete = () => {
    const {t, deleteNetwork} = this.props;
    Alert.alert(
      t('alert_title_mocha'),
      t('alert_remove_network'),
      [
        {
          text: t('button_cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: t('button_ok'), onPress: () => deleteNetwork()},
      ],
      {cancelable: false},
    );
  };

  updateTagState = state => {
    this.setState({tags: state.tagsArray});
    this.props.updateSelectedTrustNetwork({tags: state.tagsArray});
  };

  onToggleCheck = key => {
    const {
      updateSelectedTrustNetwork,
      selectedNetwork: {permissions},
    } = this.props;
    const index = permissions.indexOf(key);
    if (index < 0) {
      permissions.push(key);
    } else {
      permissions.splice(index, 1);
    }
    updateSelectedTrustNetwork({permissions});
  };

  onToggleSelectAll = () => {
    const {
      updateSelectedTrustNetwork,
      selectedNetwork: {permissions},
    } = this.props;
    if (
      permissions.length ===
      BasicPermissions.length + AdvancedPermissions.length
    ) {
      // if it was selected all, unset all
      updateSelectedTrustNetwork({permissions: []});
    } else {
      // set all permissions
      updateSelectedTrustNetwork({
        permissions: BasicPermissions.concat(AdvancedPermissions),
      });
    }
  };

  _renderMemberItem = ({item}) => {
    const user = item;
    const {deselectUser} = this.props;
    return (
      <MCView align="center" width={100} mt={10}>
        <MCImage
          round
          image={{uri: user.avatar}}
          width={80}
          height={80}
          type="avatar"
        />
        <MCButton onPress={() => deselectUser(user)}>
          <MCIcon name="ios-remove-circle-outline" />
        </MCButton>
        <H3 align="center">{user.name}</H3>
      </MCView>
    );
  };

  validateName = () => {
    return this.props.selectedNetwork.name.length > 0;
  };

  validateMembers = () => {
    return this.props.selectedUsers.length > 0;
  };

  validatePermissions = () => {
    return this.props.selectedNetwork.permissions.length > 0;
  };

  _onChangeValue = key => text => {
    this.props.updateSelectedTrustNetwork({[key]: text});
  };

  render() {
    const {isNew, submitted} = this.state;
    const {t, theme, selectedNetwork, selectedUsers} = this.props;
    const isErrorName = !this.validateName();
    const isErrorMember = !this.validateMembers();
    const isErrorPermission = !this.validatePermissions();
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={
            isNew
              ? t('button_create_network')
              : t('feed_network_edit_headerTitle')
          }
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressDone()}
        />
        <MCContent contentContainerStyle={{padding: dySize(15)}}>
          <MCTextFormInput
            label={t('feed_network_edit_nameofgroup')}
            onChange={this._onChangeValue('name')}
            value={selectedNetwork.name}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorName}
          />
          <MCView mt={20} row justify="space-between" align="center">
            <H3>{`${t('mocha_value_Members')}* - ${selectedUsers.length}`}</H3>
            <MCButton onPress={() => this.onPressAddMember()}>
              <MCIcon name="ios-add-circle-outline" />
            </MCButton>
          </MCView>
          <MCCard
            style={{
              borderColor:
                isErrorMember && submitted
                  ? theme.colors.danger
                  : theme.colors.border,
            }}>
            <FlatList
              horizontal
              style={{width: '100%', height: dySize(200)}}
              data={selectedUsers}
              renderItem={this._renderMemberItem}
              keyExtractor={item => item}
            />
          </MCCard>
          {isErrorMember && submitted && (
            <ErrorText>{t('error_input_trustnetwork_members')}</ErrorText>
          )}
          <H3 mt={20}>{t('feed_network_edit_viewpermission')}</H3>
          <H4 color={theme.colors.border}>
            {t('feed_network_edit_viewpermission_displayText')}
          </H4>
          {isErrorPermission && submitted && (
            <ErrorText>{t('error_trustnetwork_permissions')}</ErrorText>
          )}
          <MCView mt={30}>
            <Swiper
              loadMinimal
              loop={false}
              showsButtons={false}
              dot={<MCView width={8} height={8} mr={5} bordered br={4} />}
              height={dySize(500)}
              paginationStyle={{
                position: 'absolute',
                top: 0,
                bottom: undefined,
              }}
              containerStyle={{paddingTop: 20}}
              activeDot={
                <MCView
                  width={8}
                  height={8}
                  bordered
                  br={4}
                  mr={5}
                  background={theme.colors.text}
                />
              }>
              <NetworkBasicPermissions
                permissions={selectedNetwork.permissions}
                onToggleCheck={key => this.onToggleCheck(key)}
                onSelectAll={() => this.onToggleSelectAll()}
              />
              <NetworkAdvancedPermissions
                permissions={selectedNetwork.permissions}
                onToggleCheck={key => this.onToggleCheck(key)}
              />
            </Swiper>
          </MCView>
          {!isNew && (
            <MCView mt={50} mb={30} align="center">
              <MCButton
                onPress={() => this.onDelete()}
                align="center"
                width={250}
                bordered
                background={theme.colors.danger}>
                <H3 color={theme.colors.text}>
                  {t('button_remove_trust_network')}
                </H3>
              </MCButton>
            </MCView>
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedNetwork: state.networkReducer.selectedNetwork,
  selectedUsers: state.usersReducer.selectedUsers,
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  updateSelectedTrustNetwork: networkActions.updateSelectedTrustNetwork,
  createNetwork: networkActions.createNetwork,
  updateNetwork: networkActions.updateNetwork,
  deselectUser: userActions.deselectUser,
  deleteNetwork: networkActions.deleteNetwork,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ManageTrustNetworkScreen),
);
