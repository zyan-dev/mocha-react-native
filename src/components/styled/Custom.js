import {Image, View} from 'react-native';
import styled from 'styled-components';
import {dySize} from 'utils/responsive';

export const WideOvalGreenImage = styled(View)`
  position: absolute;
  top: ${dySize(300)}px;
  right: -70px;
  height: ${dySize(120)}px;
  width: ${dySize(120)}px;
  border: 15px solid #00d080;
  border-radius: 60px;
  opacity: ${props => props.opacity || 0.1};
`;

export const WideOvalYellowImage = styled(View)`
  position: absolute;
  top: ${dySize(150)}px;
  left: -100px;
  height: ${dySize(220)}px;
  width: ${dySize(220)}px;
  border: 15px solid #ffcc70;
  border-radius: 110px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalYellowA = styled.View`
  position: absolute;
  top: ${dySize(-20)}px;
  left: ${dySize(-20)}px;
  height: ${dySize(100)}px;
  width: ${dySize(100)}px;
  border: 8px solid #ffcc70;
  border-radius: 50px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalYellowB = styled.View`
  position: absolute;
  bottom: ${dySize(100)}px;
  right: -120px;
  height: ${dySize(200)}px;
  width: ${dySize(200)}px;
  border: 15px solid #ffcc70;
  border-radius: 100px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalGreenA = styled.View`
  position: absolute;
  top: ${dySize(-40)}px;
  right: ${dySize(-40)}px;
  height: ${dySize(140)}px;
  width: ${dySize(140)}px;
  border: 15px solid #00d080;
  border-radius: 70px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalGreenB = styled.View`
  position: absolute;
  bottom: ${dySize(40)}px;
  left: ${dySize(-20)}px;
  height: ${dySize(120)}px;
  width: ${dySize(120)}px;
  border: 15px solid #00d080;
  border-radius: 60px;
  opacity: ${props => props.opacity || 0.1};
`;

export const OvalGreenImage = styled.Image`
  position: absolute;
  top: -20px;
  left: -20px;
  height: 128px;
  width: 62px;
  opacity: 0.2;
`;

export const OvalYellowImage = styled.Image`
  position: absolute;
  top: 100px;
  right: 0px;
  height: 149px;
  width: 33px;
  opacity: 0.2;
`;
