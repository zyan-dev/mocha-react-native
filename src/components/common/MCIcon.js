import React from 'react';
import PropTypes from 'prop-types';
import {NBIcon, FAProIcon} from '../styled/Text';

export default class MCIcon extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    padding: PropTypes.number,
    margin: PropTypes.number,
    color: PropTypes.string,
    align: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    light: PropTypes.bool,
    solid: PropTypes.bool,
    regular: PropTypes.bool,
  };

  static defaultProps = {
    size: 20,
    padding: 5,
    margin: 0,
    color: undefined,
    align: 'left',
    type: 'Ionicon',
    light: false,
    solid: false,
    regular: false,
  };

  render() {
    const {type} = this.props;
    if (type === 'FontAwesome5Pro') {
      return <FAProIcon {...this.props} light />;
    } else {
      return <NBIcon {...this.props} />;
    }
  }
}
