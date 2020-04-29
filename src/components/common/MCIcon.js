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
    type: 'Ionicons',
    light: false,
    solid: false,
    regular: false,
  };

  render() {
    const {type} = this.props;
    if (type.indexOf('FontAwesome5Pro') > -1) {
      const fontType = type.split('-')[1];
      return (
        <FAProIcon
          {...this.props}
          light={fontType === 'Light'}
          regular={fontType === 'Regular'}
          solid={fontType === 'Solid'}
        />
      );
    } else {
      return <NBIcon {...this.props} />;
    }
  }
}
