import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const CommentsLightSvg = ({size, color}) => (
  <Svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="comments-alt"
    class="svg-inline--fa fa-comments-alt fa-w-18"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width={size}
    height={size}
    fill={color}
    stroke={color}>
    <Path
      fill={color}
      d="M512 160h-96V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64v160c0 35.3 28.7 64 64 64h32v52c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4l76.9-43.5V384c0 35.3 28.7 64 64 64h96l108.9 61.6c2.2 1.6 4.7 2.4 7.1 2.4 6.2 0 12-4.9 12-12v-52h32c35.3 0 64-28.7 64-64V224c0-35.3-28.7-64-64-64zM64 256c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h288c17.6 0 32 14.4 32 32v160c0 17.6-14.4 32-32 32H215.6l-7.3 4.2-80.3 45.4V256zm480 128c0 17.6-14.4 32-32 32h-64v49.6l-80.2-45.4-7.3-4.2H256c-17.6 0-32-14.4-32-32v-96h128c35.3 0 64-28.7 64-64v-32h96c17.6 0 32 14.4 32 32z"
    />
  </Svg>
);

CommentsLightSvg.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default CommentsLightSvg;
