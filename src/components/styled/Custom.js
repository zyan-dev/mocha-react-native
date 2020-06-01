import {Image} from 'react-native';
import styled from 'styled-components';
import {dySize} from 'utils/responsive';

export const WideOvalGreenImage = styled(Image)`
  position: absolute;
  top: ${dySize(300)}px;
  right: 0px;
  height: ${dySize(124)}px;
  width: ${dySize(76)}px;
  opacity: ${props => props.opacity || 0.1};
`;

export const WideOvalYellowImage = styled(Image)`
  position: absolute;
  top: ${dySize(150)}px;
  left: 0px;
  height: ${dySize(232)}px;
  width: ${dySize(161)}px;
  opacity: ${props => props.opacity || 0.1};
`;
