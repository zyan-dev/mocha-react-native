import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const IceCreamSvg = ({size, theme}) => {
  let color1 = '#FEB9B9';
  let color2 = '#FFFFFF';
  if (theme.colors.theme_name === 'Stone') {
    color1 = '#086F3C';
    color2 = '#999999';
  }
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55 74"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M47.9011396,35.9935498 L7.09886039,35.9935498 C3.34467992,36.1548855 0.169326268,33.2699924 0.00650943333,29.5499606 C-0.156307401,25.8299288 2.755068,22.6834587 6.50924846,22.5221227 C6.70625822,22.5136961 6.90185063,22.5136961 7.09886039,22.5221227 L7.23209001,22.5221227 C6.3367441,14.7971151 9.99218206,7.24793963 16.633578,3.10625984 C23.274974,-1.03541995 31.725026,-1.03541995 38.366422,3.10625984 C45.0078179,7.24793963 48.6632559,14.7971151 47.76791,22.5221227 L47.9011396,22.5221227 C51.6553201,22.360787 54.8306737,25.2456801 54.9934906,28.9657119 C55.1563074,32.6857437 52.244932,35.8322139 48.4907515,35.9935498 C48.2937418,36.0019765 48.0981493,36.0019765 47.9011396,35.9935498 L47.9011396,35.9935498 Z"
        id="Path"
        fill={color1}
        opacity="0.4"
      />
      <Path
        d="M23.9724165,71.3846538 L10,42 L46,42 L32.0205509,71.3846538 C31.295297,72.9791921 29.7246446,74 27.9964837,74 C26.2683228,74 24.6976704,72.9791921 23.9724165,71.3846538 L23.9724165,71.3846538 Z"
        id="Path"
        fill={color2}
      />
    </Svg>
  );
};

IceCreamSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default IceCreamSvg;
