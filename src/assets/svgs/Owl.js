import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';
import PropTypes from 'prop-types';

const OwlSvg = ({size, color}) => {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.219 511.219"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="m255.61 0c-89.878 0-162.998 73.121-162.998 162.998 0 2.965.085 5.911.242 8.838-.149.85-.242 1.719-.242 2.611v138.623c0 52.725 20.667 102.429 58.193 139.956 37.526 37.526 87.23 58.193 139.956 58.193h100.847c14.888 0 27-12.112 27-27v-.627-309.145-11.449c0-89.877-73.12-162.998-162.998-162.998zm15.666 325.24c48.361-4.633 90.622-30.48 117.332-68.109v213.93c-63.191-22.426-109.06-79.328-117.332-145.821zm-147.821-177.176c2.345-14.148 9.647-27.113 20.596-36.531 11.136-9.579 25.371-14.853 40.084-14.853 22.726 0 43.66 12.815 54.256 32.549l-18.825 32.445c-9.884 17.036-10.632 37.775-1.999 55.477l23.852 48.915c2.514 5.155 7.747 8.426 13.482 8.426s10.969-3.27 13.482-8.426l23.853-48.915c8.632-17.703 7.885-38.442-1.999-55.477l-18.09-31.178c10.37-20.451 31.707-33.817 54.917-33.817 30.149 0 55.657 21.547 60.653 51.234.016.093.043.181.06.274.542 4.865.829 9.805.829 14.811 0 73.336-59.663 132.998-132.998 132.998s-132.998-59.663-132.998-132.998c.002-5.049.294-10.03.845-14.934zm122.061 28.666 9.386-16.178 9.387 16.178c4.859 8.374 5.227 18.57.983 27.272l-10.37 21.266-10.369-21.266c-4.245-8.703-3.876-18.897.983-27.272zm10.094-146.73c37.015 0 70.541 15.205 94.676 39.691-7.529-1.976-15.329-3.012-23.221-3.012-18.885 0-37.018 5.71-52.438 16.513-7.224 5.061-13.611 11.059-19.027 17.821-5.415-6.762-11.803-12.76-19.026-17.821-15.421-10.803-33.554-16.513-52.438-16.513-7.885 0-15.675 1.034-23.195 3.005 24.133-24.482 57.657-39.684 94.669-39.684zm-83.592 401.813c-31.86-31.86-49.406-74.031-49.406-118.743v-55.939c26.921 37.925 69.64 63.879 118.479 68.211 6.934 65.056 44.636 122.624 99.39 155.877h-49.72c-44.712 0-86.883-17.546-118.743-49.406z"
        fill={color}
      />
      <Path
        d="m308.14 158.392c1.278 6.157 6.269 10.959 12.505 11.905 6.185.938 12.495-2.257 15.425-7.775 2.945-5.546 2.091-12.462-2.11-17.131-4.184-4.65-11.086-6.181-16.85-3.779-6.48 2.701-10.422 9.851-8.97 16.78z"
        fill={color}
      />
      <Path
        d="m168.14 158.392c1.277 6.154 6.267 10.958 12.501 11.905 6.177.939 12.498-2.252 15.429-7.765 2.947-5.544 2.088-12.476-2.11-17.141-4.18-4.645-11.089-6.179-16.85-3.779-6.48 2.701-10.422 9.851-8.97 16.78z"
        fill={color}
      />
    </Svg>
  );
};

OwlSvg.propTypes = {
  size: PropTypes.number.isRequired,
};

export default OwlSvg;