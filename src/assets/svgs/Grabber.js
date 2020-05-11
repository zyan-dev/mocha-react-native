import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';
import PropTypes from 'prop-types';

const GrabberSvg = ({size, color}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        fill={color}
        d="M 16 2 L 12 6 L 15 6 L 15 10 L 3 10 L 3 12 L 29 12 L 29 10 L 17 10 L 17 6 L 20 6 L 16 2 z M 3 15 L 3 17 L 29 17 L 29 15 L 3 15 z M 3 20.013672 L 3 22.013672 L 15 22.013672 L 15 26 L 12 26 L 16 30 L 20 26 L 17 26 L 17 22.013672 L 29 22.013672 L 29 20.013672 L 3 20.013672 z"
      />
    </Svg>
  );
};

GrabberSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default GrabberSvg;
