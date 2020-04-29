import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {MCHeader, MCTextFormInput} from 'components/common';
import {MCRootView, MCContent} from 'components/styled/View';
import {otherActions} from 'Redux/actions';
import {dySize} from 'utils/responsive';
import {validateEmail} from 'services/operators';

class ContactusScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      email: '',
      submitted: false,
      isErrorEmail: false,
      isErrorMessage: false,
    };
  }

  checkEmailValidate() {
    const {email} = this.state;
    isErrorEmail = validateEmail(email);
    this.setState({isErrorEmail});
    return isErrorEmail;
  }

  checkMessageValidate() {
    const {message} = this.state;
    isErrorMessage = message.length > 0 ? false : true;
    this.setState({isErrorMessage});
    return isErrorMessage;
  }

  onPressRight = () => {
    this.setState({submitted: true});
    if (!this.checkEmailValidate()) return;
    if (this.checkMessageValidate()) return;

    const data = {
      email: this.state.email,
      message: this.state.message,
    };
    this.props.sendEmail(data);
  };

  _onChange = key => text => {
    this.setState({[key]: text});
  };

  render() {
    const {
      message,
      email,
      submitted,
      isErrorMessage,
      isErrorEmail,
    } = this.state;
    const {t} = this.props;

    return (
      <MCRootView>
        <MCHeader
          title={t('contact_us')}
          hasBack
          hasRight
          rightIcon="telegram-plane"
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(30)}}>
          <MCTextFormInput
            label={t('contact_us_email')}
            value={email}
            bordered
            onChange={this._onChange('email')}
            maxLength={50}
            submitted={submitted}
            errorText={t('contact_us_email_error')}
            isInvalid={!isErrorEmail}
          />
          <MCTextFormInput
            label={t('contact_us_content')}
            value={message}
            multiline
            bordered
            onChange={this._onChange('message')}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorMessage}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapDispatchToProps = {
  sendEmail: otherActions.sendEmail,
};
export default withTranslation()(
  connect(
    undefined,
    mapDispatchToProps,
  )(ContactusScreen),
);
