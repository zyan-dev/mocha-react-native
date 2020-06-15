import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {userActions, chatActions} from 'Redux/actions';
import {
  MCHeader,
  MCImage,
  MCIcon,
  MCCheckBox,
  MCTextFormInput,
} from 'components/common';
import {H3} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {MCView, MCRootView, MCCard, MCContent} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';

class CreateChatRoomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'private',
      title: '',
      submitted: false,
    };
  }

  componentDidMount() {
    this.props.setSeletedUsers([]);
    this.props.selectSingleUser(null);
  }

  onPressAddMember = () => {
    NavigationService.navigate('SelectChatMember', {multiple: true});
  };

  validateTitle = () => {
    return this.state.title.length > 0;
  };

  validateMembers = () => {
    return this.props.selectedUsers.length > 0;
  };

  validateMember = () => {
    return this.props.selectedUser;
  };

  onSubmitChatRoom = () => {
    const {type, title} = this.state;
    const {profile, selectedUsers, selectedUser, createChatRoom} = this.props;
    this.setState({submitted: true});
    if (type === 'group' && !this.validateTitle()) return;
    if (type === 'group' && !this.validateMembers()) return;
    if (type === 'private' && !this.validateMember()) return;

    const members =
      type === 'private' ? [selectedUser._id] : selectedUsers.map(i => i._id);

    // create chat room
    const param = {
      type,
      room_name: type === 'group' ? title : 'private_chat',
      owner: profile._id,
      members,
      last_message: '',
      last_updated: new Date().getTime(),
      last_userId: profile._id,
    };
    createChatRoom(param);
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

  render() {
    const {t, theme, selectedUser, selectedUsers} = this.props;
    const {type, submitted, title} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('title_create_chat_room')}
          hasRight
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onSubmitChatRoom()}
        />
        <MCContent
          contentContainerStyle={{
            width: dySize(375),
            paddingHorizontal: dySize(15),
          }}>
          <H3>Select type</H3>
          <MCView
            bordered
            br={10}
            pv={10}
            row
            align="center"
            justify="space-between">
            <MCCheckBox
              width={170}
              label="Private"
              checked={type === 'private'}
              onChange={checked => this.setState({type: 'private'})}
            />
            <MCCheckBox
              width={170}
              label="Group"
              checked={type === 'group'}
              onChange={checked => this.setState({type: 'group'})}
            />
          </MCView>
          {type === 'group' && (
            <>
              <MCTextFormInput
                label="Title"
                onChange={text => this.setState({title: text})}
                submitted={submitted}
                isInvalid={!this.validateTitle()}
                errorText={t('error_input_required')}
                value={title}
                maxLength={60}
                mt={20}
              />
            </>
          )}
          {type === 'group' && (
            <>
              <MCView row justify="space-between" align="center">
                <H3>{`${t('mocha_value_Members')}* - ${
                  selectedUsers.length
                }`}</H3>
                <MCButton onPress={() => this.onPressAddMember()}>
                  <MCIcon name="ios-add-circle-outline" />
                </MCButton>
              </MCView>
              <MCCard
                style={{
                  borderColor:
                    !this.validateMembers() && submitted
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
            </>
          )}
          {type === 'private' && (
            <>
              <H3 mt={20}>{t('label_select_user')}</H3>
              <MCView align="center">
                <MCButton
                  justify="center"
                  align="center"
                  width={100}
                  height={100}
                  bordered
                  br={50}
                  onPress={() =>
                    NavigationService.navigate('SelectChatMember', {
                      multiple: false,
                    })
                  }>
                  {selectedUser ? (
                    <MCImage
                      image={{uri: selectedUser.avatar}}
                      width={100}
                      height={100}
                      round
                      type="avatar"
                    />
                  ) : (
                    <MCIcon type="FontAwesome5Pro" name="plus" size={40} />
                  )}
                </MCButton>
              </MCView>
            </>
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedUsers: state.usersReducer.selectedUsers,
  selectedUser: state.usersReducer.selectedUser,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  deselectUser: userActions.deselectUser,
  setSeletedUsers: userActions.setSeletedUsers,
  selectSingleUser: userActions.selectSingleUser,
  createChatRoom: chatActions.createChatRoom,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CreateChatRoomScreen),
);
