import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const BellSvg = ({size, color}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 29"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M42,25.375 L42,27.7916667 C42,28.4590107 41.4123737,29 40.6875,29 L1.3125,29 C0.587626266,29 0,28.4590107 0,27.7916667 L0,25.375 C0,24.7076559 0.587626266,24.1666667 1.3125,24.1666667 L40.6875,24.1666667 C41.4123737,24.1666667 42,24.7076559 42,25.375 Z M17.0625,3.625 L18.375,3.625 L18.375,5.00627604 C20.1160383,4.77569013 21.8839617,4.77569013 23.625,5.00627604 L23.625,3.625 L24.9375,3.625 C25.6623737,3.625 26.25,3.08401074 26.25,2.41666667 L26.25,1.20833333 C26.25,0.540989261 25.6623737,0 24.9375,0 L17.0625,0 C16.3376263,0 15.75,0.540989261 15.75,1.20833333 L15.75,2.41666667 C15.75,3.08401074 16.3376263,3.625 17.0625,3.625 L17.0625,3.625 Z"
        id="Shape"
        fill={color}
      />
      <Path
        d="M39,22 L2,22 C2,12.6112946 10.2828795,5 20.5,5 C30.7171205,5 39,12.6112946 39,22 Z"
        id="Path"
        fill={color}
        opacity="0.600051153"
      />
    </Svg>
  );
};

BellSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default BellSvg;
