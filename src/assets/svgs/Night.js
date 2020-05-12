import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';
import PropTypes from 'prop-types';

const NightSvg = ({size, color}) => {
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
        d="M503.686,326.871c-7.932-6.33-19.109-6.452-27.18-0.29c-35.597,27.194-78.143,41.567-123.041,41.567
				c-12.218,0-24.465-1.1-36.401-3.268c-4.761-0.868-9.317,2.291-10.181,7.051c-0.865,4.758,2.292,9.317,7.051,10.181
				c12.966,2.356,26.266,3.55,39.53,3.55c48.774,0,94.997-15.617,133.671-45.162c1.67-1.276,3.982-1.25,5.624,0.059
				c1.641,1.31,2.176,3.559,1.303,5.469c-19.069,41.693-49.47,77.047-87.915,102.238c-39.456,25.851-85.352,39.517-132.724,39.517
				c-133.718,0-242.506-108.788-242.506-242.506c0-47.375,13.665-93.27,39.517-132.723c25.191-38.447,60.544-68.847,102.242-87.917
				c1.908-0.874,4.152-0.337,5.462,1.305c1.309,1.641,1.336,3.953,0.061,5.621c-29.546,38.68-45.163,84.903-45.163,133.673
				c0,47.23,14.783,92.296,42.752,130.328c27.397,37.254,64.95,64.578,108.6,79.017c4.595,1.516,9.545-0.974,11.065-5.564
				c1.518-4.592-0.973-9.547-5.564-11.065c-83.343-27.567-139.338-105.013-139.338-192.715c0-44.895,14.374-87.442,41.567-123.042
				c6.163-8.068,6.042-19.244-0.292-27.179c-6.337-7.94-17.215-10.527-26.439-6.304c-44.699,20.442-82.6,53.032-109.603,94.242
				c-27.727,42.313-42.382,91.528-42.382,142.323c0,143.376,116.646,260.021,260.021,260.021
				c50.792,0,100.007-14.655,142.324-42.382c41.209-27.003,73.8-64.903,94.245-109.603
        C514.213,344.081,511.622,333.208,503.686,326.871z"
        fill={color}
      />
      <Path
        d="M251.454,164.085c20.691,0,37.526,16.834,37.526,37.525c0,4.836,3.921,8.757,8.757,8.757s8.757-3.921,8.757-8.757
				c0-20.691,16.834-37.525,37.525-37.525c4.836,0,8.757-3.921,8.757-8.757c0-4.836-3.921-8.757-8.757-8.757
				c-20.691,0-37.525-16.835-37.525-37.526c0-4.836-3.921-8.757-8.757-8.757s-8.757,3.921-8.757,8.757
				c0,20.691-16.835,37.526-37.526,37.526c-4.836,0-8.757,3.921-8.757,8.757C242.697,160.164,246.618,164.085,251.454,164.085z
				 M297.737,138.804c4.267,6.614,9.909,12.256,16.523,16.524c-6.614,4.267-12.255,9.909-16.523,16.523
        c-4.267-6.614-9.91-12.255-16.524-16.523C287.827,151.061,293.47,145.418,297.737,138.804z"
        fill={color}
      />
      <Path
        d="M375.404,276.696c15.022,0,27.244-12.221,27.244-27.242c0-15.022-12.222-27.244-27.244-27.244
				s-27.243,12.222-27.243,27.244C348.163,264.475,360.383,276.696,375.404,276.696z M375.404,239.726
				c5.364,0,9.729,4.364,9.729,9.729c0,5.363-4.364,9.727-9.729,9.727s-9.728-4.363-9.728-9.727
        C365.677,244.09,370.04,239.726,375.404,239.726z"
        fill={color}
      />
      <Path
        d="M40.451,436.768c-15.022,0-27.243,12.221-27.243,27.243c0,15.022,12.221,27.244,27.243,27.244
				c15.022,0,27.243-12.222,27.243-27.244C67.694,448.989,55.473,436.768,40.451,436.768z M40.451,473.739
				c-5.364,0-9.728-4.364-9.728-9.729c0-5.365,4.364-9.727,9.728-9.727s9.728,4.363,9.728,9.728
        C50.179,469.375,45.816,473.739,40.451,473.739z"
        fill={color}
      />
      <Circle cx="297.736" cy="260.44" r="10.979" fill={color} />
      <Circle cx="10.979" cy="392.27" r="10.979" fill={color} />
      <Circle cx="368.144" cy="90.735" r="10.979" fill={color} />
    </Svg>
  );
};

NightSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default NightSvg;