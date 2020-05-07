import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const SortAmountSvg = ({size, theme}) => {
  let color1 = '#FFFFFF';
  let color2 = '#000000';
  if (theme.colors.theme_name === 'Stone') color2 = '#E65B1C';
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 43 36"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M19.3888889,5.14285714 L24.9444444,5.14285714 C25.7115066,5.14285714 26.3333333,4.56722325 26.3333333,3.85714286 L26.3333333,1.28571429 C26.3333333,0.575633893 25.7115066,0 24.9444444,0 L19.3888889,0 C18.6218267,0 18,0.575633893 18,1.28571429 L18,3.85714286 C18,4.56722325 18.6218267,5.14285714 19.3888889,5.14285714 Z M19.3888889,15.4285714 L30.5,15.4285714 C31.2670622,15.4285714 31.8888889,14.8529375 31.8888889,14.1428571 L31.8888889,11.5714286 C31.8888889,10.8613482 31.2670622,10.2857143 30.5,10.2857143 L19.3888889,10.2857143 C18.6218267,10.2857143 18,10.8613482 18,11.5714286 L18,14.1428571 C18,14.8529375 18.6218267,15.4285714 19.3888889,15.4285714 Z M41.6111111,30.8571429 L19.3888889,30.8571429 C18.6218267,30.8571429 18,31.4327768 18,32.1428571 L18,34.7142857 C18,35.4243661 18.6218267,36 19.3888889,36 L41.6111111,36 C42.3781733,36 43,35.4243661 43,34.7142857 L43,32.1428571 C43,31.4327768 42.3781733,30.8571429 41.6111111,30.8571429 Z M19.3888889,25.7142857 L36.0555556,25.7142857 C36.8226177,25.7142857 37.4444444,25.1386518 37.4444444,24.4285714 L37.4444444,21.8571429 C37.4444444,21.1470625 36.8226177,20.5714286 36.0555556,20.5714286 L19.3888889,20.5714286 C18.6218267,20.5714286 18,21.1470625 18,21.8571429 L18,24.4285714 C18,25.1386518 18.6218267,25.7142857 19.3888889,25.7142857 Z"
        id="Shape"
        fill={color1}
        opacity="0.818573289"
      />
      <Path
        d="M14.6658576,25.7147114 L10.6660958,25.7147114 L10.6660958,1.28573557 C10.6660958,0.575643422 10.0691777,0 9.33284185,0 L6.66633398,0 C5.92999816,0 5.33308004,0.575643422 5.33308004,1.28573557 L5.33308004,25.7147114 L1.33331824,25.7147114 C0.150888651,25.7147114 -0.447409053,27.1000914 0.392540927,27.9093013 L7.05881061,35.6237147 C7.57940788,36.1254284 8.42310108,36.1254284 8.94369836,35.6237147 L15.609968,27.9093013 C16.4449183,27.1016986 15.850787,25.7147114 14.6658576,25.7147114 Z"
        id="Path"
        fill={color2}
      />
    </Svg>
  );
};

SortAmountSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default SortAmountSvg;