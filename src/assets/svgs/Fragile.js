import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const FragileSvg = ({size}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 45"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M19.3101842,42.1875 L14.4443912,42.1875 L14.4443912,30.7880859 C21.3684417,30.0234375 26.5953325,23.9677734 25.9453564,16.9365234 L24.5009652,1.28320313 C24.4377731,0.553710938 23.8239068,0 23.0836563,0 L2.91634372,0 C2.17609322,0 1.56222694,0.553710938 1.49903483,1.28320312 L0.0546435959,16.9365234 C-0.595332458,23.9677734 4.63155831,30.0234375 11.5556088,30.7880859 L11.5556088,42.1875 L6.68981581,42.1875 C4.47809174,42.1875 3.69270401,45 4.88432677,45 L21.1156732,45 C22.2982685,45 21.5219083,42.1875 19.3101842,42.1875 Z M3.22267499,16.9746767 L4.53776146,2.5862069 L11.0051045,2.5862069 L14.1667165,7.734375 C6.71756231,12.0993175 8.69019202,10.9464799 6.39329442,12.2929239 C8.83431108,14.1409842 7.51922461,13.1465517 16.6167406,20.0283764 C16.9139862,20.2483836 17.3373359,20.230783 17.6075592,19.9667744 C17.9048047,19.6851652 17.9048047,19.21875 17.6075592,18.9283405 L11.2573129,12.7153376 C17.7516782,8.90481322 16.5086513,9.63523707 18.1209833,8.69360632 L14.3738876,2.5862069 L21.9941832,2.5862069 L23.3092697,16.9746767 C23.7686492,22.0084411 20.0035386,27.9310345 13.2659723,27.9310345 C6.52840604,27.9310345 2.75428803,22.0260417 3.22267499,16.9746767 Z"
        id="Shape"
        fill="#953333"
      />
    </Svg>
  );
};

FragileSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default FragileSvg;
