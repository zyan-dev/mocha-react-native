import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {profileActions} from 'Redux/actions';
import {MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {
  MCEditableText,
  MCImagePicker,
  MCModal,
  MCImage,
  MCIcon,
} from 'components/common';
import {dySize} from 'utils/responsive';

class OverviewCard extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    profile: PropTypes.object.isRequired,
    hideOverview: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    hideOverview: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      expandAvatar: false,
    };
  }

  onUpdateProfile = (key, value) => {
    this.props.updateProfile({[key]: value});
  };

  toggleEdit = () => {
    const {editing} = this.state;
    if (editing) {
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
    const {t, theme, editable, profile, hideOverview} = this.props;
    const {editing, expandAvatar} = this.state;
    return (
      <MCView>
        {editable && (
          <MCView row align="center">
            <H3 weight="bold" style={{flex: 1}}>
              {t('profile_subtitle_overview')}
            </H3>
            <MCButton onPress={() => this.toggleEdit()}>
              <MCIcon
                type="FontAwesome5"
                name={editing ? 'cloud-upload-alt' : 'edit'}
              />
            </MCButton>
          </MCView>
        )}
        <MCView width={300} align="center">
          <MCImagePicker
            round
            width={150}
            height={150}
            image={profile.avatar}
            type="avatar"
            enabled={editing}
            onSelectImage={image => this.onChangedAvatar(image)}
          />
          <MCView mt={10} width={300}>
            <MCEditableText
              text={profile.name}
              editable={editing}
              maxLength={30}
              fontSize={20}
              textAlign="center"
              placeholder={t('profile_name_placeholder')}
              onChange={value => this.onUpdateProfile('name', value)}
            />
          </MCView>
          <H4 color={theme.colors.border}>{`@${profile.user_id}`}</H4>
        </MCView>
        {!hideOverview && (
          <MCView width={300} mt={20}>
            {editing ? (
              <MCEditableText
                multiline
                text={profile.bio}
                maxLength={1024}
                placeholder={
                  editable
                    ? t(`profile_card_overview_placeholder`)
                    : t('profile_card_user_overview_placeholder')
                }
                editable={editing}
                onChange={value => this.onUpdateProfile('bio', value)}
                style={{
                  lineHeight: dySize(24),
                  fontStyle: 'italic',
                  color: theme.colors.text,
                  height: editing ? dySize(200) : 'auto',
                }}
              />
            ) : (
              <H4
                weight="italic"
                style={{
                  lineHeight: dySize(24),
                }}>
                {profile.bio ||
                  (editable
                    ? t(`profile_card_overview_placeholder`)
                    : t('profile_card_user_overview_placeholder'))}
              </H4>
            )}
          </MCView>
        )}
        <MCModal
          isVisible={expandAvatar}
          onClose={() => this.setState({showModal: false})}>
          <MCView align="center" width={280} mt={20}>
            <MCImage image={{uri: profile.avatar}} width={280} height={280} />
          </MCView>
        </MCModal>
      </MCView>
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(OverviewCard),
);
