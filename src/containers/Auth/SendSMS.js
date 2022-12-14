import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {authActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {dySize} from 'utils/responsive';
import {H3} from 'components/styled/Text';
import MCCountryPicker from 'components/common/MCCountryPicker';
import {MCButton} from 'components/styled/Button';
import {MCHeader} from 'components/common';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';

class SendSMSScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneCode: '',
      phoneNumber: '',
    };
  }

  sendSMS = () => {
    const {phoneCode, phoneNumber} = this.state;
    const phone = `${phoneCode}${phoneNumber}`;
    this.props.sendSMS({
      phone: phone,
      from: 'signup',
    });
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('title_sms_verification')} />
        <WideOvalGreenImage />
        <WideOvalYellowImage />
        <MCView mt={dySize(20)} width={300} align="center">
          <H3 align="center" mb={30}>
            {t('auth_signup_displayText')}
          </H3>
          <MCCountryPicker
            onSelectCountry={code => this.setState({phoneCode: code})}
            onChangeInput={value => this.setState({phoneNumber: value})}
          />
        </MCView>
        <MCButton
          mt={70}
          bordered
          align="center"
          width={150}
          onPress={() => this.sendSMS()}>
          <H3>{t('button_send_sms')}</H3>
        </MCButton>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  sendSMS: authActions.sendSMS,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SendSMSScreen),
);
