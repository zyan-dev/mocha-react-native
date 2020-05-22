import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const BoxingSvg = ({size, theme}) => {
  let color1 = '#A0A0A0';
  let color2 = '#A52626';
  // if (theme.colors.theme_name === 'Bright') color1 = '#666666';
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 18"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M13,15 L13,17.8571429 C13,18.4883254 12.4627417,19 11.8,19 L2.2,19 C1.5372583,19 1,18.4883254 1,17.8571429 L1,15 L5.99875,15 L4.48,16.0857143 C4.34915593,16.1813467 4.32250561,16.3590154 4.42,16.4857143 L4.78,16.9428571 C4.87941125,17.0690937 5.06745166,17.0946774 5.2,17 L7,15.7142857 L8.8,17 C8.93254834,17.0946774 9.12058875,17.0690937 9.22,16.9428571 L9.58,16.4857143 C9.67770374,16.3590654 9.65103036,16.1812429 9.52,16.0857143 L8.00125,15 L13,15 Z"
        id="Path"
        fill={color1}
        opacity="0.801971726"
      />
      <Path
        d="M0.599497799,11.0345 C0.200758382,8.82751361 0.000244626081,6.59392599 0,4.3565 C0,2.5085 1.64292751,1 3.64251827,1 L10.9275548,1 C12.9392621,1 14.5700731,2.50432324 14.5700731,4.36 L14.5700731,5.487 C13.4659347,5.487 12.0051331,5.291 10.9275548,6.6245 L10.9275548,6.607 L5.35753729,6.607 C4.51581816,6.60829067 3.70144422,6.33139837 3.06199192,5.8265 C2.94151556,5.73031703 2.76092407,5.73643023 2.64841433,5.8405 L2.21965957,6.236 C2.16002614,6.29087563 2.12779391,6.36614138 2.13067198,6.44379566 C2.13355006,6.52144994 2.17127961,6.59450935 2.23483673,6.6455 C3.09900124,7.34314473 4.20916138,7.72638757 5.35753729,7.7235 L10.3849714,7.7235 C10.3454329,7.90795527 10.3251042,8.09547518 10.3242627,8.2835 C10.3266156,9.70977632 11.489206,10.9072098 13.0257971,11.066 C13.1114175,11.0739388 13.1966673,11.0479822 13.2603405,10.9945871 C13.3240137,10.941192 13.3601261,10.8653766 13.3596946,10.786 L13.3596946,10.226 C13.3602435,10.0848466 13.2490516,9.96444107 13.0978886,9.9425 C12.188729,9.82240827 11.5195744,9.09552016 11.5384355,8.2485 C11.5574069,7.328 12.3921507,6.6 13.3900489,6.6 L14.5700731,6.6 C15.9106911,6.60115772 16.9971635,7.60336202 16.9984186,8.84 C16.9984186,9.323 17.1046587,10.9785 15.5755599,12.3925 L13.3559003,14.44 L13.3559003,15 L8.29811194,15 L9.83479934,13.936 C9.96718876,13.8422803 9.99415383,13.6681649 9.89550798,13.544 L9.53125615,13.096 C9.48295335,13.0365915 9.41104463,12.9973162 9.33134909,12.9868141 C9.25165354,12.9763121 9.17069941,12.9954436 9.10629568,13.04 L7.28503655,14.3 L5.46377741,13.04 C5.32966359,12.9472162 5.13940231,12.9722882 5.03881694,13.096 L4.67456512,13.544 C4.57397975,13.6677118 4.60115994,13.8432162 4.73527376,13.936 L6.27196115,15 L1.21417276,15 L1.21417276,14.44 L0.599497799,11.0345 Z"
        id="Path"
        fill={color2}
      />
    </Svg>
  );
};

BoxingSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default BoxingSvg;
