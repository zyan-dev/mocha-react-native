import {Container, Content} from 'native-base';
import {Card} from 'native-base';
import styled from 'styled-components';
import {dySize} from 'utils/responsive';

export const MCRootView = styled(Container)`
  flex: 1;
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  background-color: ${props =>
    props.background || props.theme.colors.background};
`;

export const DividerLine = styled.View`
  width: ${props => dySize(props.width || 350)}px;
  height: 0.5px;
  background-color: ${props => props.theme.colors.border};
  margin-top: ${props => props.mt || 0}px;
  margin-bottom: ${props => props.mb || 0}px;
`;

export const MCContent = styled(Content)`
  width: ${props => dySize(props.width || 375)}px;
`;

export const MCView = styled.View`
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  padding-horizontal: ${props => dySize(props.ph || 0)}px;
  padding-vertical: ${props => dySize(props.pv || 0)}px;
  margin-horizontal: ${props => dySize(props.mh || 0)}px;
  margin-vertical: ${props => dySize(props.mv || 0)}px;
  margin-bottom: ${props => dySize(props.mb || 0)}px;
  margin-top: ${props => dySize(props.mt || 0)}px;
  margin-right: ${props => dySize(props.mr || 0)}px;
  margin-left: ${props => dySize(props.ml || 0)}px;
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  border-width: ${props => (props.bordered ? 1 : 0)}px;
  border-radius: ${props => dySize(props.br || 0)}px;
  border-color: ${props =>
    props.error ? props.theme.colors.danger : props.theme.colors.border};
  width: ${props => (props.width ? `${dySize(props.width)}px` : 'auto')};
  height: ${props => (props.height ? `${dySize(props.height)}px` : 'auto')};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  overflow: ${props => props.overflow || 'hidden'};
  background-color: ${props => props.background || 'transparent'};
  position: ${props => (props.absolute ? 'absolute' : 'relative')};
`;

export const MCCard = styled(MCView)`
  border: 1px solid ${props => props.borderColor || props.theme.colors.border};
  border-radius: ${props => dySize(props.br || 10)}px;
  border-width: ${props => (props.shadow ? 0 : 1)};
  background-color: ${props =>
    props.shadow ? props.theme.colors.card_border : 'transparent'};
  padding: ${props => dySize(props.p || 5)}px;
`;

export const ABSView = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  justify-content: center;
  align-items: center;
`;

export const NativeCard = styled(Card)`
  background-color: ${props => props.background || props.theme.colors.card};
  shadow-color: #353535;
  shadow-opacity: 0.2;
  shadow-offset: 2px -2px;
  shadow-radius: 5;
  elevation: 4;
  padding-horizontal: ${props => dySize(props.ph || 10)}px;
  padding-vertical: ${props => dySize(props.pv || 10)}px;
  width: ${props => (props.width ? `${dySize(props.width)}px` : '100%')};
  margin-bottom: ${props => dySize(props.mb || 0)}px;
  margin-top: ${props => dySize(props.mt || 0)}px;
  margin-right: ${props => dySize(props.mr || 0)}px;
  margin-left: ${props => dySize(props.ml || 0)}px;
  border-radius: ${props => dySize(props.br || 10)}px;
  border-color: transparent;
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
`;
