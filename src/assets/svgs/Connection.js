import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const ConnectionSvg = ({size, color}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 30"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M6,7.5 C8.209139,7.5 10,5.82106781 10,3.75 C10,1.67893219 8.209139,0 6,0 C3.790861,0 2,1.67893219 2,3.75 C2,5.82106781 3.790861,7.5 6,7.5 Z M8,9.375 L4,9.375 C1.790861,9.375 0,11.0539322 0,13.125 L0,18.75 C0,19.7855339 0.8954305,20.625 2,20.625 L2,28.125 C2,29.1605339 2.8954305,30 4,30 L8,30 C9.1045695,30 10,29.1605339 10,28.125 L10,22.4771484 L6.8525,19.6921875 C6.30809051,19.201965 6.00037012,18.5248667 6.00037012,17.8171875 C6.00037012,17.1095083 6.30809051,16.43241 6.8525,15.9421875 L11.360625,11.953125 C11.46375,11.8623047 11.59625,11.8177734 11.71125,11.7439453 C11.1093865,10.3155299 9.63820807,9.37645509 8,9.375 Z M30,7.5 C32.209139,7.5 34,5.82106781 34,3.75 C34,1.67893219 32.209139,0 30,0 C27.790861,0 26,1.67893219 26,3.75 C26,5.82106781 27.790861,7.5 30,7.5 Z M32,9.375 L28,9.375 C26.361947,9.37635998 24.8908129,10.3151742 24.28875,11.7433594 C24.40375,11.8177734 24.53875,11.8605469 24.64,11.9537109 L29.1475,15.9416016 C29.6919095,16.431824 29.9996299,17.1089224 29.9996299,17.8166016 C29.9996299,18.5242807 29.6919095,19.2013791 29.1475,19.6916016 L26,22.4777344 L26,28.125 C26,29.1605339 26.8954305,30 28,30 L32,30 C33.1045695,30 34,29.1605339 34,28.125 L34,20.625 C35.1045695,20.625 36,19.7855339 36,18.75 L36,13.125 C36,11.0539322 34.209139,9.375 32,9.375 Z"
        id="Shape"
        opacity="0.4"
        fill={color}
      />
      <Path
        d="M27.7759871,18.5451219 L23.2682461,22.7931411 C23.0505838,23.0003212 22.7300293,23.0576681 22.4538624,22.9388335 C22.1776954,22.819999 21.9993149,22.5479606 22.0006783,22.2477072 L22.0006783,19.9923316 L14.0002506,19.9923316 L14.0002506,22.2477072 C14.001614,22.5479606 13.8232335,22.819999 13.5470666,22.9388335 C13.2708996,23.0576681 12.9503452,23.0003212 12.7326828,22.7931411 L8.22494181,18.5451219 C7.9250194,18.2433967 7.9250194,17.7566033 8.22494181,17.4548781 L12.7326828,13.2068589 C12.9503452,12.9996788 13.2708996,12.9423319 13.5470666,13.0611665 C13.8232335,13.180001 14.001614,13.4520394 14.0002506,13.7522928 L14.0002506,15.9989315 L22.0006783,15.9989315 L22.0006783,13.7522928 C21.9993149,13.4520394 22.1776954,13.180001 22.4538624,13.0611665 C22.7300293,12.9423319 23.0505838,12.9996788 23.2682461,13.2068589 L27.7759871,17.4567503 C28.074671,17.7582547 28.074671,18.2436175 27.7759871,18.5451219 Z"
        id="Path"
        fill={color}
      />
    </Svg>
  );
};

ConnectionSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ConnectionSvg;
