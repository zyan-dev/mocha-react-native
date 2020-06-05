import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MCTextInput, H4, H5} from '../styled/Text';
import {MCView} from '../styled/View';

class MCTextFormInput extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
    submitted: PropTypes.bool,
    isInvalid: PropTypes.bool,
    value: PropTypes.string,
    errorText: PropTypes.string,
    maxLength: PropTypes.number,
    mt: PropTypes.number,
    mb: PropTypes.number,
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    label: '',
    multiline: false,
    submitted: false,
    isInvalid: false,
    value: '',
    errorText: '',
    maxLength: 1024,
    keyboardType: 'default',
    mt: 0,
    mb: 20,
    style: {},
  };

  render() {
    const {
      theme,
      label,
      isInvalid,
      onChange,
      multiline,
      submitted,
      errorText,
      value,
      maxLength,
      keyboardType,
      placeholder,
      mt,
      mb,
      style,
      ...others
    } = this.props;
    return (
      <>
        <MCView mt={mt} />
        {label.length > 0 && <H4>{label}</H4>}
        <MCTextInput
          value={value}
          multiline={multiline}
          onChangeText={text => onChange(text)}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.border}
          style={{
            borderColor:
              submitted && isInvalid
                ? theme.colors.danger
                : theme.colors.border,
            ...style,
          }}
          {...others}
        />
        {isInvalid && submitted && errorText && (
          <H5 color={theme.colors.danger}>{errorText}</H5>
        )}
        <MCView mb={mb} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default connect(
  mapStateToProps,
  undefined,
)(MCTextFormInput);
