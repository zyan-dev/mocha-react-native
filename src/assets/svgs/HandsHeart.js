import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const HandsheartSvg = ({size, theme}) => {
  let color1 = '#FFFFFF';
  let color2 = '#DB0000';
  if (theme.colors.theme_name === 'Stone') color1 = '#222222';
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29 21"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M27.0999997,3 C26.326801,3 25.6999997,3.57563159 25.6999997,4.28570915 L25.6999997,10.2481853 L21.7712498,14.579418 C21.645084,14.7176081 21.4617056,14.8010058 21.2655508,14.8094023 C21.069396,14.8177987 20.8783655,14.7504276 20.7387498,14.6236143 L20.1787499,14.1093306 C19.9325801,13.8833359 19.9046202,13.5255648 20.1131249,13.2696018 L21.7799998,11.2285386 C22.0801029,10.8610669 22.1439388,10.3744761 21.9474612,9.95206038 C21.7509835,9.52964464 21.3240419,9.2355789 20.8274612,9.18063488 C20.3308804,9.12569086 19.840103,9.31821587 19.5399999,9.68568758 L17.0199999,12.7713895 C16.2935614,13.6618668 15.90063,14.7444288 15.9,15.8570915 L15.9,20.3570735 C15.9,20.7121123 16.2134006,20.9999407 16.5999999,20.9999407 L22.3618748,20.9999407 C22.6741884,21.0017274 22.9488162,20.8105107 23.0312498,20.5338585 C23.1168937,20.2178814 23.2717058,19.9212304 23.4862498,19.661987 L28.0406246,14.2660264 C28.3382059,13.923733 28.5001982,13.4986821 28.4999998,13.0606741 L28.4999998,4.28570915 C28.4999998,3.57563159 27.8731983,3 27.0999997,3 L27.0999997,3 Z M9.46000013,9.68649115 C9.15989705,9.31901943 8.66911957,9.12649443 8.17253882,9.18143845 C7.67595807,9.23638247 7.24901649,9.53044821 7.05253884,9.95286395 C6.85606119,10.3752797 6.91989709,10.8618704 7.22000019,11.2293421 L8.88687515,13.2704054 C9.09537979,13.5263684 9.0674199,13.8841394 8.82125015,14.1101342 L8.26125016,14.6244179 C8.12266437,14.7530935 7.93115097,14.8217464 7.73429118,14.8133198 C7.5374314,14.8048932 7.35370197,14.720178 7.22875019,14.5802216 L3.30000029,10.2489889 L3.30000029,4.28570915 C3.30000029,3.57563159 2.67319896,3 1.90000033,3 C1.1268017,3 0.500000182,3.57563159 0.500000182,4.28570915 L0.500000182,13.0606741 C0.49980183,13.4986821 0.661794106,13.923733 0.959375352,14.2660264 L5.51375023,19.661987 C5.72829424,19.9212304 5.88310629,20.2178814 5.96875022,20.5338585 C6.04997408,20.8112601 6.32535243,21.0029994 6.6381252,20.9999645 L12.4000001,20.9999645 C12.7865994,20.9999645 13.1,20.7121123 13.1,20.3570735 L13.1,15.8570915 C13.09937,14.7444288 12.7064386,13.6618668 11.9800001,12.7713895 L9.46000013,9.68649115 Z"
        id="Shape"
        fill={color1}
        opacity="0.721684338"
      />
      <Path
        d="M9.50965179,5.85592704 C8.083177,4.42976385 8.16894605,2.06714411 9.7624448,0.752668398 C11.1528063,-0.394276095 13.2248061,-0.188083827 14.4977994,1.08773083 L14.9988713,1.58602882 L15.4999431,1.08343516 C16.7729364,-0.188083827 18.8449362,-0.394276095 20.2352977,0.752668398 C21.8333106,2.06714411 21.9145655,4.42976385 20.4926049,5.85592704 L15.5766838,10.7615848 C15.4279274,10.9136374 15.2194405,11 15.0011283,11 C14.7828162,11 14.5743293,10.9136374 14.4255728,10.7615848 L9.50965179,5.85592704 Z"
        id="Path"
        fill={color2}
      />
    </Svg>
  );
};

HandsheartSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default HandsheartSvg;
