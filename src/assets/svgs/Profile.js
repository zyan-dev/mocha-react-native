import React from 'react';
import {Svg, Path, Polygon} from 'react-native-svg';
import PropTypes from 'prop-types';

const ProfileSvg = ({size, theme}) => {
  let color1 = '#FFC50C';
  let color2 = theme.colors.text;
  if (theme.colors.theme_name === 'Stone') color1 = '#336B87';
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 35"
      width={(size * 27) / 35}
      height={size}>
      <Polygon
        id="Path"
        fill={color1}
        points="21 6 6 6 6 0 9.75 2 13.5 0 17.25 2 21 0"
      />
      <Path
        d="M18.9,20.9166667 L17.8929241,20.9166667 C15.105474,22.3613831 11.894526,22.3613831 9.10707589,20.9166667 L8.1,20.9166667 C3.62649353,20.9166667 0,24.9908754 0,30.0166667 L0,31.75 C0,33.5449254 1.29517626,35 2.89285714,35 L24.1071429,35 C25.7048237,35 27,33.5449254 27,31.75 L27,30.0166667 C27,24.9908754 23.3735065,20.9166667 18.9,20.9166667 Z M13.7142857,18.75 C17.8564213,18.75 21.2142857,14.8698012 21.2142857,10.0833333 L21.2142857,9 L6.21428571,9 L6.21428571,10.0833333 C6.21428571,14.8698012 9.57215009,18.75 13.7142857,18.75 Z"
        id="Shape"
        fill={color2}
      />
    </Svg>
  );
};

ProfileSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ProfileSvg;
