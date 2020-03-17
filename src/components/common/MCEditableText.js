import React from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {dySize} from 'utils/responsive';
import {fontFamilies} from 'utils/constants';

class MCEditableText extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    bordered: PropTypes.bool,
    multiline: PropTypes.bool,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    textAlign: PropTypes.string,
    fontSize: PropTypes.number,
    onBlur: PropTypes.func,
    style: PropTypes.object,
  };
  static defaultProps = {
    editable: true,
    onChange: () => undefined,
    bordered: true,
    multiline: false,
    placeholder: '',
    maxLength: 40,
    string: 'left',
    onBlur: () => undefined,
    style: {},
    textAlign: 'left',
    fontSize: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      text,
      editable,
      onChange,
      bordered,
      multiline,
      placeholder,
      maxLength,
      textAlign,
      fontSize,
      onBlur,
      style,
      theme,
    } = this.props;
    return (
      <TextInput
        value={text}
        editable={editable}
        onChangeText={value => onChange(value)}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.border}
        maxLength={maxLength}
        onBlur={onBlur}
        style={{
          width: '100%',
          paddingHorizontal: dySize(5),
          paddingVertical: dySize(10),
          borderRadius: dySize(4),
          borderColor: theme.colors.border,
          color: theme.colors.text,
          fontSize: dySize(fontSize || theme.base.FONT_SIZE_MEDIUM),
          borderWidth: bordered && editable ? 1 : 0,
          fontFamily: fontFamilies.regular,
          textAlign,
          ...style,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(mapStateToProps, undefined)(MCEditableText),
);
