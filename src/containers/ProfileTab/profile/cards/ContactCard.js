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
      collapsed: true,
      editing: false,
    };
  }

  onToggleCollapse = collapsed => {
    this.setState({collapsed});
  };

  onToggleEdit = editing => {
    const {profile} = this.props;
    if (!editing && profile.userToken.length) {
      this.props.updateContactProfile();
    }
    this.setState({editing});
  };

  onUpdateProfile = (key, value) => {
    this.props.updateProfile({[key]: value});
  };

  render() {
    const {t, editable, profile} = this.props;
    const {collapsed, editing} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCButton onPress={() => this.onToggleCollapse(!collapsed)}>
          <MCCard width={280} padding={20} align="center">
            <MCIcon name="ios-call" size={40} />
            <H3>{t('profile_card_contact')}</H3>
          </MCCard>
        </MCButton>
        <Collapsible collapsed={collapsed}>
          <MCCard mt={20} width={320} padding={6} align="center">
            {editable && (
              <MCView align="flex-end" width={320}>
                <MCButton onPress={() => this.onToggleEdit(!editing)}>
                  <MCIcon name={editing ? 'ios-share' : 'md-create'} />
                </MCButton>
              </MCView>
            )}
            {ContactProfileKeys.map(key => {
              if (key === 'phone' && !profile.user_id.length) {
                return null; // If user didn't sign up, user can't edit his phone number on profile screen
              }
              return (
                <MCView row mt={5} justify="space-between" align="center">
                  <H4>{`${t(`profile_card_${key}`)}: `}</H4>
                  <MCEditableText
                    text={profile[key]}
                    placeholder={t(`profile_card_${key}_placeholder`)}
                    textAlign="right"
                    editable={key === 'phone' ? false : editing}
                    onChange={value => this.onUpdateProfile(key, value)}
                    style={{flex: 1}}
                  />
                </MCView>
              );
            })}
          </MCCard>
        </Collapsible>
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
