import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const ShieldSvg = ({size, theme}) => {
  let color1 = '#FFFD00';
  let color2 = '#A52626';
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 28"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M11.7523927,12.25 L11.7523927,28 C12.0881398,27.9996699 12.4205366,27.9312853 12.7306072,27.79875 C16.5743899,26.1504687 22.3034009,21.0721875 24,12.2516406 L11.7523927,12.25 Z M11.7741781,0.200703125 L1.57226663,4.57570312 C0.619604328,4.98162543 -0.00116481702,5.93879886 1.64103344e-06,7 C0.000725661687,8.76314782 0.172135534,10.5218347 0.511692911,12.25 L12.7523927,12.25 L12.7523927,-3.55271368e-15 C12.4178493,0.0113762715 12.087387,0.0791781793 11.7741781,0.200703125 Z"
        id="Shape"
        fill={color1}
      />
      <Path
        d="M11.2608156,27.7987448 C11.5724096,27.9320822 11.9066175,28.000486 12.244084,27.9999974 L12.244084,12.2499977 L0,12.2499977 C1.56685157,20.2628087 6.54484744,25.7764014 11.2608156,27.7987448 Z M23.4320845,4.57624915 L13.2273525,0.201249962 C12.913648,0.079131708 12.5825033,0.0111342956 12.247273,0 L12.244084,0 L12.244084,12.2499977 L24.4950775,12.2499977 C24.8302716,10.5212651 24.999393,8.76279961 24.9999996,7 C25.0006072,5.94054932 24.3821932,4.98457848 23.4320845,4.57624915 L23.4320845,4.57624915 Z"
        id="Shape"
        fill={color2}
      />
    </Svg>
  );
};

ShieldSvg.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ShieldSvg;
