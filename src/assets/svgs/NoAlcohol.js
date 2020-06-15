import React from 'react';
import {Svg, Path, Line} from 'react-native-svg';
import PropTypes from 'prop-types';

const NoAlcoholSvg = ({size, color}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 288 512"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M269.5,228.4l-13.2-147c-0.6-6.8-6.2-12-13-12H58.9c-6.7,0-12.4,5.2-13,12l-13.2,147c-5.9,66,41.8,122.9,105.2,130.1v107.1
	h-44c-12.2,0-22,9.9-22,22c0,2.4,2,4.4,4.4,4.4H226c2.4,0,4.4-2,4.4-4.4c0-12.2-9.9-22-22-22h-44V358.5
	C227.7,351.3,275.4,294.4,269.5,228.4L269.5,228.4z M151.1,332.1c-36.5,0-70-21.2-84.6-54.6c-6.2-14.1-9-30.1-7.5-46.7l12.1-135h160
  l12.1,135c1.5,16.6-1.3,32.6-7.5,46.7C221.1,310.9,187.6,332.1,151.1,332.1z"
        fill={color}
      />
      <Line
        x1="21"
        y1="26.6"
        x2="262.6"
        y2="488.6"
        stroke={color}
        strokeWidth={20}
      />
    </Svg>
  );
};

NoAlcoholSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default NoAlcoholSvg;
