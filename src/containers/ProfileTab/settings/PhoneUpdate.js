import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {MCHeader} from 'components/common';
import MCCountryPicker from 'components/common/MCCountryPicker';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {authActions} from 'Redux/actions';
import {showAlert} from 'services/operators';

class AnalyzeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPhoneCode: '',
      oldPhoneNumber: '',
      newPhoneCode: '',
      newPhoneNumber: '',
    };
  }

  updatePhoneNumber = () => {
    const {
      oldPhoneCode,
      oldPhoneNumber,
      newPhoneCode,
      newPhoneNumber,
    } = this.state;
    const {profile} = this.props;
    const oldPhone = `${oldPhoneCode}${oldPhoneNumber}`;
    const newPhone = `${newPhoneCode}${newPhoneNumber}`;
    if (oldPhone === newPhone) {
      showAlert('You are using same phone number.');
    } else if (oldPhone === profile.phone) {
      this.props.sendSMS({
        phone: newPhone,
        from: 'profile',
      });
    } else {
      showAlert('Your old phone number does not match. Please try again');
    }
  };

  render() {
    const {t} = this.props;

    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('settings_phone_number_update')} />
        <MCContent>
          <MCView ph={10} mt={30} align="center">
            <MCView mb={10}>
              <H3>{t('settings_phone_number_update_title1')}</H3>
              <MCCountryPicker
                onSelectCountry={code => this.setState({oldPhoneCode: code})}
                onChangeInput={value => this.setState({oldPhoneNumber: value})}
              />
            </MCView>
            <MCView mb={10}>
              <H3>{t('settings_phone_number_update_title2')}</H3>
              <MCCountryPicker
                onSelectCountry={code => this.setState({newPhoneCode: code})}
                onChangeInput={value => this.setState({newPhoneNumber: value})}
              />
            </MCView>
            <MCButton
              mt={70}
              pr={20}
              pl={20}
              bordered
              align="center"
              onPress={() => this.updatePhoneNumber()}>
              <H3>{t('button_update_phone_number')}</H3>
            </MCButton>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  sendSMS: authActions.sendSMS,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AnalyzeScreen),
);
