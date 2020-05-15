import React from 'react';
import PropTypes from 'prop-types';
import {MCIcon} from '.';
import {H3} from '../styled/Text';
import {MCButton} from '../styled/Button';

class MCCheckBox extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    width: 320,
    iconSize: 20,
  };

  render() {
    const {width, checked, onChange, label, iconSize} = this.props;
    return (
      <MCButton
        row
        align="center"
        width={width}
        onPress={() => onChange(!checked)}>
        <MCIcon
          type="FontAwesome5Pro-Light"
          name={checked ? 'check-square' : 'square'}
          size={iconSize}
        />
        <H3 ml={5}>{label}</H3>
      </MCButton>
    );
  }
}

export default MCCheckBox;
