import styled from 'styled-components';
import Ripple from 'react-native-material-ripple';
import {dySize} from 'utils/responsive';

export const MCButton = styled(Ripple)`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => dySize(props.br || 8)}px;
  border-width: ${props => (props.bordered ? 1 : 0)}
  padding-vertical: ${props => dySize(props.pv || 5)}px;
  padding-horizontal: ${props => dySize(props.ph || 10)}px;
  width: ${props => dySize(props.width) || 'auto'};
  height: ${props => dySize(props.height) || 'auto'};
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  margin-top: ${props => dySize(props.mt || 0)}px;
  margin-bottom: ${props => dySize(props.mb || 0)}px;
  margin-left: ${props => dySize(props.ml || 0)}px;
  margin-right: ${props => dySize(props.mr || 0)}px;
`;
