import React from 'react';
import {Svg, Path, Polygon} from 'react-native-svg';
import PropTypes from 'prop-types';

const ResourceCrownSvg = ({size, theme}) => {
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
      viewBox="0 0 39 42"
      width={(size * 39) / 42}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M17.7910112,20.8338387 C13.268764,18.0017574 5.95078652,17.2195635 2.26988764,17.0037858 C1.0341573,16.93186 0,17.8938685 0,19.1166084 L0,36.5226701 C0,37.6465119 0.885168539,38.5725575 2.01573034,38.6354926 C5.33730337,38.8153073 12.0680899,39.4716309 16.7130337,41.872157 C17.4229213,42.2407771 18.2730337,41.737296 18.2730337,40.9461114 L18.2730337,21.7329121 C18.2817978,21.364292 18.0977528,21.0226441 17.7910112,20.8338387 L17.7910112,20.8338387 Z M36.7301124,17.0037858 C33.0492135,17.2195635 25.7224719,18.0017574 21.2089888,20.8338387 C20.9022472,21.0316348 20.7182022,21.3732827 20.7182022,21.7419028 L20.7182022,40.9461114 C20.7182022,41.7462867 21.5683146,42.2497678 22.2869663,41.872157 C26.9319101,39.4716309 33.6626966,38.8153073 36.9842697,38.6354926 C38.1148315,38.5725575 39,37.6375211 39,36.5226701 L39,19.1166084 C39,17.9028593 37.9658427,16.93186 36.7301124,17.0037858 L36.7301124,17.0037858 Z"
        id="Shape"
        fill={color2}
      />
      <Path
        d="M19.5,17 C23.6447368,17 27,13.9312821 27,10.1405128 L27,9 L12,9 L12,10.1405128 C12,13.9312821 15.3642344,17 19.5,17 Z"
        id="Path"
        fill={color2}
      />
      <Polygon
        id="Path"
        fill={color1}
        points="19.5045872 0 15.7522936 2.09548387 12 0 12 7 27 7 27 0 23.2477064 2.09548387"
      />
    </Svg>
  );
};

ResourceCrownSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ResourceCrownSvg;
