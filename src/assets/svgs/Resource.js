import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const ResourceSvg = ({size, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 31 31"
    fill={color}
    stroke={color}

    // style={{ marginBottom: 8 }}
  >
    <Path
      fill={color}
      d="M21.606 5.636a5.636 5.636 0 10-11.273 0 5.636 5.636 0 0011.273 0zM13.714 14.3c-3.483-2.24-9.125-2.855-11.964-3.024A1.658 1.658 0 000 12.946V26.68c0 .883.68 1.62 1.555 1.668 2.563.14 7.75.658 11.334 2.554a.818.818 0 001.202-.732V15.006a.83.83 0 00-.377-.706zm15.536-3.024c-2.839.169-8.482.784-11.965 3.024a.846.846 0 00-.376.716V30.17a.82.82 0 001.206.734c3.584-1.894 8.767-2.412 11.33-2.553.875-.048 1.555-.784 1.555-1.668V12.946c0-.964-.796-1.727-1.75-1.67z"></Path>
  </Svg>
);

ResourceSvg.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ResourceSvg;
