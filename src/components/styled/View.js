import {Container, Content} from 'native-base';
import styled from 'styled-components';
import {dySize} from 'utils/responsive';

export const MCRootView = styled(Container)`
  flex: 1;
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  background-color: ${props =>
    props.background || props.theme.colors.background};
`;

export const MCContent = styled(Content)`
  width: ${props => dySize(props.width || 375)}px;
`;

export const MCView = styled.View`
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  padding-horizontal: ${props => dySize(props.ph || 0)}px;
  padding-vertical: ${props => dySize(props.pv || 0)}px;
  padding: ${props => dySize(props.p || 0)}px;
  margin-horizontal: ${props => dySize(props.mh || 0)}px;
  margin-vertical: ${props => dySize(props.mv || 0)}px;
  margin-bottom: ${props => dySize(props.mb || 0)}px;
  margin-top: ${props => dySize(props.mt || 0)}px;
  margin-right: ${props => dySize(props.mr || 0)}px;
  margin-left: ${props => dySize(props.ml || 0)}px;
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  border: 1px solid ${props => props.theme.colors.border};
  border-width: ${props => (props.bordered ? 1 : 0)}px;
  border-radius: ${props => dySize(props.br || 0)}px;
  width: ${props => (props.width ? `${dySize(props.width)}px` : 'auto')};
  height: ${props => (props.height ? `${dySize(props.height)}px` : 'auto')};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
`;

export const MCCard = styled(MCView)`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => dySize(props.br || 10)}px;
  padding: ${props => dySize(props.p || 10)}px;
`;
