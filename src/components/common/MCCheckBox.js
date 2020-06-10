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
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    bigText: PropTypes.bool,
    iconSize: PropTypes.number,
    hasLeftText: PropTypes.bool,
    textAlign: PropTypes.string,
    iconColor: PropTypes.string,
    weight: PropTypes.string,
    round: PropTypes.bool,
  };

  static defaultProps = {
    width: 320,
    iconSize: 20,
    hasLeftText: false,
    textAlign: 'left',
    bigText: true,
    iconColor: undefined,
    onChange: () => undefined,
    weight: 'regular',
    round: false,
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
      weight,
      round,
    } = this.props;
    const hasLabel = label.length > 0;
    const checkedIcon = round ? 'check-circle' : 'check-square';
    const unCheckedIcon = round ? 'circle' : 'square';
    return (
      <MCButton
        row
        align="center"
        width={width}
        onPress={() => onChange(!checked)}>
        {hasLeftText && bigText && hasLabel && (
          <H3 ml={5} weight={weight} align={textAlign} style={{flex: 1}}>
            {label}
          </H3>
        )}
        {hasLeftText && !bigText && hasLabel && (
          <H4 ml={5} weight={weight} align={textAlign} style={{flex: 1}}>
            {label}
          </H4>
        )}
        {!hasLeftText && hasLabel && <MCView width={20} />}
        <MCView>
          <MCIcon
            type="FontAwesome5Pro-Light"
            name={checked ? checkedIcon : unCheckedIcon}
            size={iconSize}
            color={iconColor}
          />
          {hasLeftText && hasLabel && <MCView width={20} />}
        </MCView>
        {!hasLeftText && bigText && hasLabel && (
          <H3 ml={5} weight={weight} align={textAlign} style={{flex: 1}}>
            {label}
          </H3>
        )}
        {!hasLeftText && !bigText && hasLabel && (
          <H4 ml={5} weight={weight} align={textAlign} style={{flex: 1}}>
            {label}
          </H4>
        )}
      </MCButton>
    );
  }
}

export default MCCheckBox;
