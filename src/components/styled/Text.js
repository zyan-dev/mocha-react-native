import styled from 'styled-components';
import {dySize} from 'utils/responsive';
import {FontFamilies} from 'utils/constants';
import {Icon} from 'native-base';

export const MCText = styled.Text`
  font-family: ${(props) =>
    props.weight ? FontFamilies[props.weight] : 'Raleway-Regular'};
  color: ${(props) => props.color || props.theme.colors.text};
  text-align: ${(props) => props.align || 'left'};
  padding-horizontal: ${(props) => dySize(props.ph || 0)}px;
  padding-vertical: ${(props) => dySize(props.pv || 5)}px;
  text-decoration: ${(props) => props.underline && 'underline'};
  text-decoration-color: ${(props) =>
    props.underColor || props.theme.colors.text};
  background-color: ${(props) => props.bgColor || 'transparent'};
  margin-bottom: ${(props) => dySize(props.mb || 0)}px;
  margin-top: ${(props) => dySize(props.mt || 0)}px;
  margin-right: ${(props) => dySize(props.mr || 0)}px;
  margin-left: ${(props) => dySize(props.ml || 0)}px;
  width: ${(props) => (props.width ? `${dySize(props.width)}px` : 'auto')};
`;

export const MCIcon = styled(Icon)`
  font-size: ${(props) => dySize(props.size || 20)}px;
  color: ${(props) => props.color || props.theme.colors.text};
  padding: ${(props) => dySize(props.padding || 5)}px;
  margin: ${(props) => dySize(props.margin || 0)}px;
  text-align: ${(props) => props.align || 'left'};
`;

export const H1 = styled(MCText)`
  font-size: ${(props) => dySize(props.theme.base.FONT_SIZE_MASSIVE)};
`;
export const H2 = styled(MCText)`
  font-size: ${(props) => dySize(props.theme.base.FONT_SIZE_EXTRA_LARGE)};
`;
export const H3 = styled(MCText)`
  font-size: ${(props) => dySize(props.theme.base.FONT_SIZE_LARGE)};
`;
export const H4 = styled(MCText)`
  font-size: ${(props) => dySize(props.theme.base.FONT_SIZE_MEDIUM)};
`;
export const H5 = styled(MCText)`
  font-size: ${(props) => dySize(props.theme.base.FONT_SIZE_SMALL)};
`;
export const H6 = styled(MCText)`
  font-size: ${(props) => dySize(props.theme.base.FONT_SIZE_TINY)};
`;

export const MCEmptyText = styled(H4)`
  color: ${(props) => props.theme.colors.border};
  text-align: center;
`;

export const MCTextInput = styled.TextInput`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.br || 4}px;
  border-top-width: ${(props) => (props.underline ? 0 : 1)}px;
  border-left-width: ${(props) => (props.underline ? 0 : 1)}px;
  border-right-width: ${(props) => (props.underline ? 0 : 1)}px;
  padding: 10px 5px;
  min-height: ${(props) => (props.multiline ? dySize(80) : 'auto')};
  max-height: ${(props) => props.maxHeight || 120}px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) =>
    props.font || dySize(props.theme.base.FONT_SIZE_MEDIUM)};
`;
