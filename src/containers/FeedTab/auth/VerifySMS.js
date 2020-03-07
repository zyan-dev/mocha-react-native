import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {authActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {dySize} from 'utils/responsive';
import {H3} from 'components/styled/Text';

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
  verifySMS = code => {
    const {phone} = this.props.route.params;
    this.props.verifySMS({phone, code});
  };

  render() {
    const {sms_verify_status, t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCView mt={dySize(100)} width={300} align="center">
          <H3 align="center" mb={30}>
            {t('auth_sms_displayText')}
          </H3>
        </MCView>
        <OTPInputView
          style={{width: '80%', height: 100}}
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
        />
        {sms_verify_status === 'incorrect' && (
          <H3 align="center" mb={30}>
            {t('alert_incorrect_code')}
          </H3>
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
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(VerifySMS),
);
