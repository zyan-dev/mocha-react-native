import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {profileActions} from 'Redux/actions';
import {MCCard, MCView} from 'components/styled/View';
import {H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCImagePicker, MCEditableText} from 'components/common';
import {MochaIcon} from 'assets/images';

class BasicProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      updatedData: {},
      avatarChanged: false,
    };
  }

  onUpdateProfile = (key, value) => {
    const {updateProfile} = this.props;
    updateProfile({[key]: value});
  };

  onToggleEdit = () => {
    const {profile} = this.props;
    const {editing} = this.state;
    if (editing && profile.userToken.length) {
      this.props.updateBasicProfile();
    }
    this.setState({editing: !editing});
  };

  onChangedAvatar = image => {
    const {updateProfile} = this.props;
    updateProfile({
      avatar: image.path,
      avatarChanged: true,
    });
  };

  render() {
    const {
      t,
      profile: {name, user_id, bio, avatar},
    } = this.props;
    const {editing} = this.state;
    return (
      <MCCard width={320} padding={6}>
        <MCView row justify="space-between">
          <MCView row align="center" style={{flex: 1}}>
            <H4>{`@${user_id.length ? user_id : 'Unnamed'}`}</H4>
            <MCImage width={12} height={12} image={MochaIcon} />
          </MCView>
          <MCButton onPress={() => this.onToggleEdit()}>
            <MCIcon name={editing ? 'ios-share' : 'md-create'} />
          </MCButton>
        </MCView>
        <MCView row>
          <MCImagePicker
            round
            width={100}
            height={100}
            image={avatar}
            type="avatar"
            enabled={editing}
            onSelectImage={image => this.onChangedAvatar(image)}
          />
          <MCView
            ml={20}
            justify="flex-start"
            align="flex-start"
            style={{flex: 1}}>
            <MCEditableText
              text={name}
              editable={editing}
              maxLength={30}
              placeholder={t('profile_name_placeholder')}
              onChange={value => this.onUpdateProfile('name', value)}
            />
            {name.length * bio.length * user_id.length * avatar.length > 0 && (
              <MCView row>
                <MCIcon name="ios-checkmark-circle" color="green" />
                <H4>{t('profile_completed')}</H4>
              </MCView>
            )}
          </MCView>
        </MCView>
        <MCView row mt={10}>
          <H4 mt={5}>{`${t('profile_bio')}: `}</H4>
          <MCEditableText
            text={bio}
            placeholder={t('profile_bio_placeholder')}
            editable={editing}
            maxLength={1024}
            onChange={value => this.onUpdateProfile('bio', value)}
            style={{flex: 1}}
          />
        </MCView>
      </MCCard>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  updateProfile: profileActions.setProfileData,
  updateBasicProfile: profileActions.updateBasicProfile,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(BasicProfile),
);
