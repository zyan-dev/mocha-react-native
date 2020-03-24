import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import {networkActions, userActions} from 'Redux/actions';
import {MCRootView, MCContent, MCCard, MCView} from 'components/styled/View';
import {MCHeader, MCImage} from 'components/common';
import {H3, H4, MCIcon, MCTextInput} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {NetworkPermissions} from '../../../../utils/constants';
import {MCTagInput, MCVulnerabilityPicker} from '../../../../components/common';
import {Alert} from 'react-native';

class ManageTrustNetworkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: props.route.params.new, // true: create network, false: edit network
      permissions: props.selectedNetwork.permissions,
      tags: props.selectedNetwork.tags,
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
    const members = selectedUsers.map(user => user._id);
    updateSelectedTrustNetwork({members});
    if (isNew) {
      createNetwork();
    } else {
      updateNetwork();
    }
  };

  onPressAddMember = () => {
    NavigationService.navigate('SelectUser', {multiple: true});
  };

  onDelete = () => {
    const {t, deleteNetwork} = this.props;
    Alert.alert(
      'Mocha Alert',
      t('alert_remove_network'),
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteNetwork()},
      ],
      {cancelable: false},
    );
  };

  updateTagState = state => {
    this.setState({tags: state.tagsArray});
    this.props.updateSelectedTrustNetwork({tags: state.tagsArray});
  };

  onToggleCheck = key => {
    const {permissions} = this.state;
    const index = permissions.indexOf(key);
    if (index < 0) {
      permissions.push(key);
    } else {
      permissions.splice(index, 1);
    }
    this.setState({permissions});
  };

  _renderMemberItem = ({item}) => {
    const user = item;
    const {deselectUser} = this.props;
    return (
      <MCView align="center" width={100} mt={10}>
        <MCImage round image={{uri: user.avatar}} width={80} height={80} />
        <MCButton onPress={() => deselectUser(user)}>
          <MCIcon name="ios-remove-circle-outline" />
        </MCButton>
        <H3 align="center">{user.name}</H3>
      </MCView>
    );
  };

  render() {
    const {isNew, permissions} = this.state;
    const {
      t,
      theme,
      selectedNetwork,
      selectedUsers,
      updateSelectedTrustNetwork,
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={
            isNew ? t('create_network') : t('feed_network_edit_headerTitle')
          }
          hasRight={selectedNetwork.name.length * selectedUsers.length > 0}
          rightIcon={isNew ? 'ios-send' : 'ios-cloud-upload'}
          onPressRight={() => this.onPressDone()}
        />
        <MCContent contentContainerStyle={{padding: dySize(15)}}>
          <H3>{t('feed_network_edit_nameofgroup')}*</H3>
          <MCTextInput
            value={selectedNetwork.name}
            onChangeText={text => updateSelectedTrustNetwork({name: text})}
          />
          <MCView mt={20} row justify="space-between" align="center">
            <H3>{`${t('mocha_value_Members')}* - ${selectedUsers.length}`}</H3>
            <MCButton onPress={() => this.onPressAddMember()}>
              <MCIcon name="ios-add-circle-outline" />
            </MCButton>
          </MCView>
          <MCCard>
            <FlatList
              horizontal
              style={{width: '100%', height: dySize(200)}}
              data={selectedUsers}
              renderItem={this._renderMemberItem}
              keyExtractor={item => item}
            />
          </MCCard>
          <H3 mt={20}>{t('feed_network_edit_viewpermission')}</H3>
          <H4 color={theme.colors.border}>
            {t('feed_network_edit_viewpermission_displayText')}
          </H4>
          <MCView align="center">
            {NetworkPermissions.map(item => (
              <CheckBox
                style={{width: dySize(150), marginTop: 10}}
                onClick={() => this.onToggleCheck(item.key)}
                isChecked={permissions.indexOf(item.key) > -1}
                rightText={t(`trustnetwork_permissions_${item.data}`)}
                rightTextStyle={{
                  color: theme.colors.text,
                  fontSize: theme.base.FONT_SIZE_LARGE,
                  fontFamily: 'Raleway-Regular',
                }}
                checkBoxColor={theme.colors.text}
              />
            ))}
          </MCView>
          <H3 mt={20}>{t('trustnetwork_tags_title')}</H3>
          <H4 color={theme.colors.border}>{t('tag_input_placeholderText')}</H4>
          <MCTagInput
            updateState={this.updateTagState}
            tags={this.state.tags}
          />
          <H3 mt={20}>{t('section_label_vulnerability')}</H3>
          <MCVulnerabilityPicker
            defaultIndex={isNew ? 1 : selectedNetwork.vulnerability}
            onSelect={index =>
              updateSelectedTrustNetwork({vulnerability: index})
            }
          />
          {!isNew && (
            <MCView mt={50} mb={30} align="center">
              <MCButton
                onPress={() => this.onDelete()}
                align="center"
                width={250}
                bordered
                background={theme.colors.danger}>
                <H3>{t('button_remove_trust_network')}</H3>
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
