import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const BullhornSvg = ({size, theme}) => {
  let color1 = '#DDDDDD';
  let color2 = '#7591C9';
  if (theme.colors.theme_name === 'Stone') color1 = '#666666';
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 13"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M14,11.1999998 C14,11.4304998 13.8340625,12 13.25,12 C13.0796523,12.0001417 12.9143341,11.9384229 12.78125,11.8249998 L10.7890625,10.1249999 C9.98414678,9.4404746 9.02023847,9.00164525 8,8.85525007 L8,3.14600064 C9.02022592,2.99955682 9.98412254,2.5607328 10.7890625,1.87625077 L12.78125,0.175000943 C12.9142697,0.0614537105 13.0796301,-0.000280842828 13.25,0 C13.8359375,0 14,0.581500902 14,0.80000088 L14,11.1999998 Z"
        id="Path"
        fill={color1}
      />
      <Path
        d="M14.1666141,5.333125 L14.1666141,7.916875 C14.6819269,7.6521024 15,7.15904059 15,6.625 C15,6.09095941 14.6819269,5.5978976 14.1666141,5.333125 Z M0,5.5 L0,7.75 C0,8.57842712 0.746189317,9.25 1.66666049,9.25 L2.5442614,9.25 C2.50700629,9.49860196 2.48804144,9.74914759 2.48749078,10 C2.4872899,10.9009452 2.71491178,11.7901165 3.15311331,12.6001563 C3.28826906,12.8507031 3.58332005,13 3.8926939,13 L5.82706173,13 C6.50544463,13 6.91273479,12.300625 6.5015384,11.815 C6.05912627,11.293776 5.81979851,10.655908 5.82055134,10 C5.82141578,9.7465041 5.86004099,9.49425688 5.93539466,9.25 L6.66664195,9.25 L6.66664195,4 L1.66666049,4 C0.746189317,4 0,4.67157288 0,5.5 Z"
        id="Shape"
        fill={color2}
        opacity="0.504882812"
      />
    </Svg>
  );
};

BullhornSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default BullhornSvg;