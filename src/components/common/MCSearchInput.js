import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Icon} from 'native-base';
import {MCView} from '../styled/View';
import {dySize} from 'utils/responsive';
import MCEditableText from './MCEditableText';

const Wrapper = styled(MCView)`
  display: flex;
  flex-direction: row;
  width: ${props => dySize(props.width) || dySize(350)};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.text};
  background-color: rgba(0, 0, 0, 0.3);
`;

const SearchIcon = styled(Icon)`
  margin-horizontal: 10px;
  font-size: 24px;
  color: ${props => props.theme.colors.text};
`;

export default class MCSearchInput extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const {width, onChange, text} = this.props;
    return (
      <Wrapper width={width}>
        <SearchIcon name="ios-search" />
        <MCEditableText
          bordered={false}
          onChange={onChange}
          text={text}
          style={{flex: 1}}
        />
      </Wrapper>
    );
  }
}
