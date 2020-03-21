import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {profileActions} from 'Redux/actions';
import {MCCard, MCView} from 'components/styled/View';
import {H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {
  MCImage,
  MCImagePicker,
  MCEditableText,
  MCReadMoreText,
} from 'components/common';
import {MochaIcon} from 'assets/images';

class BasicProfile extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    profile: PropTypes.object.isRequired,
  };

  static defaultProps = {
    editable: true,
  };
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
      theme,
      editable,
      profile: {name, user_id, bio, avatar},
    } = this.props;
    const {editing} = this.state;
    return (
      <MCCard width={320} align="center" p={10}>
        <MCView height={15} />
        <MCImagePicker
          round
          width={100}
          height={100}
          image={avatar}
          type="avatar"
          enabled={editing}
          onSelectImage={image => this.onChangedAvatar(image)}
        />
        <MCView width={200} mt={10}>
          <MCEditableText
            text={name}
            editable={editing}
            maxLength={30}
            fontSize={16}
            textAlign="center"
            placeholder={t('profile_name_placeholder')}
            onChange={value => this.onUpdateProfile('name', value)}
          />
        </MCView>
        <MCView row align="center" mb={10}>
          <H4 color={theme.colors.border} pv={1}>{`@${
            user_id.length ? user_id : 'Unnamed'
          }`}</H4>
          <MCImage width={12} height={12} image={MochaIcon} />
        </MCView>
        {editing ? (
          <MCEditableText
            multiline
            text={bio}
            placeholder={t('profile_bio_placeholder')}
            maxLength={1024}
            onChange={value => this.onUpdateProfile('bio', value)}
            style={{flex: 1}}
          />
        ) : (
          <MCView width={300}>
            <MCReadMoreText>
              <H4>{bio}</H4>
            </MCReadMoreText>
          </MCView>
        )}

        <MCView row justify="flex-end" width={320}>
          {editable && (
            <MCButton onPress={() => this.onToggleEdit()}>
              <MCIcon name={editing ? 'ios-share' : 'md-create'} />
            </MCButton>
          )}
        </MCView>
      </MCCard>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  updateProfile: profileActions.setProfileData,
  updateBasicProfile: profileActions.updateBasicProfile,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(BasicProfile),
);
