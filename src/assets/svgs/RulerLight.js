import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const RulerLightSvg = ({size, color}) => (
  <Svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="ruler-triangle"
    class="svg-inline--fa fa-ruler-triangle fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={color}
    stroke={color}>
    <Path
      fill={color}
      d="M501.65 452.08L59.91 10.35C52.76 3.2 43.97 0 35.35 0 17.31 0 0 14.01 0 35.17V476.9C0 496.29 15.71 512 35.1 512h441.73c31.27 0 46.93-37.8 24.82-59.92zm-21.96 26.01c-.79 1.91-2.04 1.91-2.86 1.91H35.1c-1.71 0-3.1-1.39-3.1-3.1V35.17c0-3.13 3.21-3.17 3.36-3.17.48 0 1.03.08 1.93.98l73.79 73.79-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.32 11.31a7.98 7.98 0 0 0 5.66 2.34c2.05 0 4.09-.78 5.66-2.34l16.97-16.97 45.26 45.26-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31a7.98 7.98 0 0 0 5.66 2.34c2.05 0 4.1-.78 5.66-2.34l16.97-16.97 45.26 45.26-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31a7.98 7.98 0 0 0 5.66 2.34c2.05 0 4.1-.78 5.66-2.34l16.97-16.97 45.25 45.25-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.66-2.34l16.97-16.97 45.25 45.25-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.66-2.34l16.97-16.97 73.79 73.79c.55.61 1.44 1.5.64 3.41zM123.31 228.68c-4.56-4.56-11.5-5.95-17.44-3.47A15.999 15.999 0 0 0 96 239.99v160c0 8.84 7.16 16 16 16h160c6.47 0 12.31-3.89 14.78-9.88a16.048 16.048 0 0 0-3.47-17.44l-160-159.99zM128 383.99V278.62L233.37 384H128z"
    />
  </Svg>
);

RulerLightSvg.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default RulerLightSvg;
