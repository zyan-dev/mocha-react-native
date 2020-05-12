import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {authActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {H3, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader} from 'components/common';
import {dySize} from 'utils/responsive';

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

class VerifySMS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearInputs: false,
      code: '',
    };
  }

  componentWillMount() {
    this.props.setSMSVerifyStatus('pending');
  }

  verifySMS = code => {
    const {phone} = this.props.route.params;
    this.props.verifySMS({phone, code});
  };

  resendSMS = () => {
    const {phone} = this.props.route.params;
    this.props.setSMSVerifyStatus('pending');
    this.props.sendSMS(phone);
    this.setState({clearInputs: true, code: ''});
  };

  render() {
    const {sms_verify_status, t, theme} = this.props;
    const {clearInputs, code} = this.state;

    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('title_sms_verification')} />
        <OTPInputView
          style={{width: '80%', height: 100, marginTop: dySize(100)}}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={[
            styles.underlineStyleBase,
            {
              borderColor: theme.colors.border,
              color: theme.colors.text,
            },
          ]}
          codeInputHighlightStyle={{borderColor: theme.colors.text}}
          onCodeFilled={code => this.verifySMS(code)}
          onCodeChanged={code =>
            this.setState({clearInputs: false, code: code})
          }
          clearInputs={clearInputs}
          code={code}
        />
        {sms_verify_status === 'incorrect' && (
          <>
            <H5 align="center" mb={30} color={theme.colors.danger}>
              {t('alert_incorrect_code')}
            </H5>
            <MCButton
              bordered
              align="center"
              width={150}
              onPress={() => this.resendSMS()}>
              <H3>{t('button_resend_sms')}</H3>
            </MCButton>
          </>
        )}
        {sms_verify_status === 'checking' && (
          <H3 align="center" mb={30}>
            {t('alert_sms_checking')}
          </H3>
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  sms_verify_status: state.authReducer.sms_verify_status,
});

const mapDispatchToProps = {
  verifySMS: authActions.verifySMS,
  setSMSVerifyStatus: authActions.setSMSVerifyStatus,
  sendSMS: authActions.sendSMS,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(VerifySMS),
);
