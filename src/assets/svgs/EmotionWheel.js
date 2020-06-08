import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';
import PropTypes from 'prop-types';

const EmotionWheelSvg = ({size, color}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        fill={color}
        d="M255.4,8C119.9,8,10,117.9,10,253.4s109.9,245.4,245.4,245.4S500.9,389,500.9,253.4S391,8,255.4,8z M255.4,57.1
	c34.3,0,66,9.6,94.1,25.1l-57.6,79.3c-11.3-4.5-23.5-7.1-36.5-7.1c-12.9,0-25.1,2.6-36.5,7.1l-57.6-79.3
	C189.4,66.7,221.2,57.1,255.4,57.1L255.4,57.1z M59.1,253.4c0-56.4,24.2-106.9,62.3-142.7l58,79.9c-14.2,17.2-23.1,38.9-23.1,62.8
	c0,2.1,0.5,4.1,0.6,6.2l-94.2,30.6C60.5,278.3,59.1,266,59.1,253.4z M230.9,447.3c-66.4-8.3-123.9-50-152.6-110.5l93.6-30.4
	c13.3,21,34.2,36.4,58.9,42.7V447.3L230.9,447.3z M206.4,253.4c0-27.1,22-49.1,49.1-49.1c27.1,0,49.1,22,49.1,49.1
	s-22,49.1-49.1,49.1S206.4,280.5,206.4,253.4z M280,447.3v-98.2c24.7-6.3,45.6-21.7,58.9-42.7l93.6,30.4
	C403.9,397.3,346.4,439,280,447.3z M353.9,259.6c0.1-2.1,0.6-4.1,0.6-6.2c0-24-8.9-45.7-23.1-62.8l58-79.9
	c38.2,35.8,62.3,86.3,62.3,142.7c0,12.6-1.4,24.8-3.7,36.8L353.9,259.6z"
      />
    </Svg>
  );
};

EmotionWheelSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default EmotionWheelSvg;
