import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const ToolsSvg = ({size, color}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M29.3626231,23.1832829 L22.5016769,16.3226247 C21.1482366,14.9692413 19.1268648,14.7055952 17.4980492,15.5082511 L11.2523032,9.26276731 L11.2523032,5.62445074 L3.75272076,0 L0.0029295244,3.74963382 L5.62761637,11.2489015 L9.26608568,11.2489015 L15.5118317,17.4943853 C14.7150011,19.1231325 14.9727992,21.1444195 16.3262395,22.4978029 L23.1871856,29.3584611 C24.0426068,30.2138463 25.4253423,30.2138463 26.2749043,29.3584611 L29.3626231,26.270872 C30.2121851,25.4154868 30.2121851,24.0328093 29.3626231,23.1832829 L29.3626231,23.1832829 Z M19.4373944,13.1823064 C21.0955052,13.1823064 22.6540122,13.8267747 23.8258219,14.9985353 L24.9624774,16.1351431 C25.8882071,15.7308857 26.7670644,15.1684406 27.5287408,14.4067962 C29.7024479,12.2331804 30.440688,9.17488527 29.7493203,6.39781271 C29.6204212,5.87052046 28.9583487,5.68889757 28.5716515,6.07557856 L24.2125192,10.4345279 L20.234225,9.77248316 L19.5721525,5.79435602 L23.9312848,1.4354067 C24.317982,1.04872571 24.1304925,0.386680988 23.597319,0.251928523 C20.8201299,-0.433551411 17.7617064,0.304657748 15.5938584,2.4724148 C13.9240295,4.14217362 13.1389169,6.34508349 13.1799303,8.54213456 L17.9902093,13.3522117 C18.4647923,13.2408944 18.9569524,13.1823064 19.4373944,13.1823064 Z M13.3498427,17.9865248 L10.027762,14.6645835 L1.09857165,23.5992579 C-0.36619055,25.0639586 -0.36619055,27.4367738 1.09857165,28.9014745 C2.56333385,30.3661752 4.93624861,30.3661752 6.40101082,28.9014745 L13.6427951,21.6599941 C13.1975074,20.4940924 13.0627493,19.2227322 13.3498427,17.9865248 L13.3498427,17.9865248 Z M3.75272076,27.6535495 C2.97932632,27.6535495 2.34654904,27.0207988 2.34654904,26.2474368 C2.34654904,25.468216 2.97346727,24.8413241 3.75272076,24.8413241 C4.53197425,24.8413241 5.15889247,25.468216 5.15889247,26.2474368 C5.15889247,27.0207988 4.53197425,27.6535495 3.75272076,27.6535495 Z"
        id="Shape"
        fill={color}
      />
    </Svg>
  );
};

ToolsSvg.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ToolsSvg;
