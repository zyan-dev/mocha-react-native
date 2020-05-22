import React from 'react';
import PropTypes from 'prop-types';
import {MCIcon} from '.';
import {H3, H4} from '../styled/Text';
import {MCButton} from '../styled/Button';
import {MCView} from '../styled/View';

class MCCheckBox extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    bigText: PropTypes.bool,
    iconSize: PropTypes.number,
    hasLeftText: PropTypes.bool,
    textAlign: PropTypes.string,
    iconColor: PropTypes.string,
  };

  static defaultProps = {
    width: 320,
    iconSize: 20,
    hasLeftText: false,
    textAlign: 'left',
    bigText: true,
    iconColor: undefined,
  };

  render() {
    const {
      width,
      checked,
      onChange,
      label,
      iconSize,
      hasLeftText,
      textAlign,
      bigText,
      iconColor,
    } = this.props;
    return (
      <MCButton
        row
        align="center"
        width={width}
        onPress={() => onChange(!checked)}>
        {hasLeftText && bigText && (
          <H3 ml={5} align={textAlign} style={{flex: 1}}>
            {label}
          </H3>
        )}
        {hasLeftText && !bigText && (
          <H4 ml={5} align={textAlign} style={{flex: 1}}>
            {label}
          </H4>
        )}
        <MCView mr={hasLeftText ? 0 : 20} ml={hasLeftText ? 20 : 0}>
          <MCIcon
            type="FontAwesome5Pro-Light"
            name={checked ? 'check-square' : 'square'}
            size={iconSize}
            color={iconColor}
          />
        </MCView>
        {!hasLeftText && bigText && (
          <H3 ml={5} align={textAlign} style={{flex: 1}}>
            {label}
          </H3>
        )}
        {!hasLeftText && !bigText && (
          <H4 ml={5} align={textAlign} style={{flex: 1}}>
            {label}
          </H4>
        )}
      </MCButton>
    );
  }
}

export default MCCheckBox;
