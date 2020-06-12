import {Image, View} from 'react-native';
import styled from 'styled-components';
import {dySize} from 'utils/responsive';

export const WideOvalGreenImage = styled(View)`
  position: absolute;
  top: ${dySize(300)}px;
  right: -70px;
  height: ${dySize(120)}px;
  width: ${dySize(120)}px;
  border: 15px solid #2bc675;
  border-radius: ${dySize(60)}px;
  opacity: ${props => props.opacity || 0.1};
`;

export const WideOvalYellowImage = styled(View)`
  position: absolute;
  top: ${dySize(150)}px;
  left: -100px;
  height: ${dySize(220)}px;
  width: ${dySize(220)}px;
  border: 15px solid #f9d861;
  border-radius: ${dySize(110)}px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalYellowA = styled.View`
  position: absolute;
  top: ${dySize(-20)}px;
  left: ${dySize(-20)}px;
  height: ${dySize(100)}px;
  width: ${dySize(100)}px;
  border: 8px solid #f9d861;
  border-radius: ${dySize(50)}px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalYellowB = styled.View`
  position: absolute;
  bottom: ${dySize(100)}px;
  right: -120px;
  height: ${dySize(200)}px;
  width: ${dySize(200)}px;
  border: 15px solid #f9d861;
  border-radius: ${dySize(100)}px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalGreenA = styled.View`
  position: absolute;
  top: ${dySize(-40)}px;
  right: ${dySize(-40)}px;
  height: ${dySize(140)}px;
  width: ${dySize(140)}px;
  border: 15px solid #2bc675;
  border-radius: ${dySize(70)}px;
  opacity: ${props => props.opacity || 0.1};
`;

export const CornerOvalGreenB = styled.View`
  position: absolute;
  bottom: ${dySize(40)}px;
  left: ${dySize(-20)}px;
  height: ${dySize(120)}px;
  width: ${dySize(120)}px;
  border: 15px solid #2bc675;
  border-radius: ${dySize(60)}px;
  opacity: ${props => props.opacity || 0.1};
`;

export const OvalGreenImage = styled.View`
  position: absolute;
  top: ${dySize(-20)}px;
  left: ${dySize(-80)}px;
  height: ${dySize(120)}px;
  width: ${dySize(120)}px;
  border: 15px solid #2bc675;
  border-radius: ${dySize(60)}px;
  opacity: ${props => props.opacity || 0.2};
`;

export const OvalYellowImage = styled.View`
  position: absolute;
  top: ${dySize(100)}px;
  right: ${dySize(-150)}px;
  height: ${dySize(200)}px;
  width: ${dySize(200)}px;
  border: 15px solid #f9d861;
  border-radius: ${dySize(100)}px;
  opacity: ${props => props.opacity || 0.2};
`;
