import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {profileActions} from 'Redux/actions';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCEditableText} from 'components/common';
import {ContactProfileKeys} from 'utils/constants';

class ContactCard extends React.Component {
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
    };
  }

  toggleEdit = () => {
    const {editing} = this.state;
    if (editing) {
      this.props.updateContactProfile();
    }
    this.setState({editing: !editing});
  };

  onUpdateProfile = (key, value) => {
    this.props.updateProfile({[key]: value});
  };

  render() {
    const {t, editable, profile} = this.props;
    const {editing} = this.state;
    return (
      <MCView>
        <MCView row align="center">
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_contact')}
          </H3>
          {editable && (
            <MCButton onPress={() => this.toggleEdit()}>
              <MCIcon
                type="FontAwesome5"
                name={editing ? 'cloud-upload-alt' : 'edit'}
              />
            </MCButton>
          )}
        </MCView>
        {ContactProfileKeys.map((key) => {
          if (key === 'phone' && !profile.user_id.length) {
            return null; // If user didn't sign up, user can't edit his phone number on profile screen
          }
          return (
            <MCView key={key} mt={20}>
              <H4 underline>{`${t(`profile_card_${key}`)}: `}</H4>
              <MCView width={300}>
                <MCEditableText
                  text={profile[key]}
                  placeholder={t(`profile_card_${key}_placeholder`)}
                  editable={key === 'phone' ? false : editing}
                  onChange={(value) => this.onUpdateProfile(key, value)}
                  style={{flex: 1, fontStyle: 'italic'}}
                  keyboardType={key === 'email' ? 'email-address' : 'default'}
                />
              </MCView>
            </MCView>
          );
        })}
      </MCView>
    );
  }
}

const mapDispatchToProps = {
  updateProfile: profileActions.setProfileData,
  updateContactProfile: profileActions.updateContactProfile,
};

export default withTranslation()(
  connect(undefined, mapDispatchToProps)(ContactCard),
);