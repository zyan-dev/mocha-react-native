import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Icon} from 'native-base';
import {dySize} from 'utils/responsive';
import MCEditableText from './MCEditableText';
import {MCView} from '../styled/View';
import {MCButton} from '../styled/Button';
import {MCIcon} from '../styled/Text';

const Wrapper = styled(MCView)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${props => dySize(props.width) || dySize(350)};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.text};
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  margin-bottom: 10px;
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
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    onBlur: () => undefined,
  };

  render() {
    const {width, onChange, onBlur, text} = this.props;
    return (
      <Wrapper width={width}>
        <SearchIcon name="ios-search" />
        <MCEditableText
          bordered={false}
          onChange={onChange}
          text={text}
          onBlur={() => onBlur()}
          style={{flex: 1}}
        />
        <MCButton onPress={() => onChange('')}>
          <MCIcon name="ios-close-circle-outline" size={20} />
        </MCButton>
      </Wrapper>
    );
  }
}
