import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {MCView} from '../styled/View';
import {H4} from '../styled/Text';
import {dySize} from 'utils/responsive';

const TagView = styled(H4)`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${dySize(8)}px;
  height: ${dySize(30)}px;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.card_border};
  overflow: hidden;
`;

export default class MCTagsView extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    more: PropTypes.node,
    style: PropTypes.object,
  };

  static defaultProps = {
    more: null,
    style: {},
  };

  render() {
    const {tags, more, style} = this.props;
    return (
      <MCView row wrap style={{width: '100%'}}>
        {!tags.length ? (
          <H4>No tags</H4>
        ) : (
          tags.map((tag, index) => (
            <TagView key={index} ph={5} mb={5} mr={5} style={style}>
              {tag}
            </TagView>
          ))
        )}
        {more}
      </MCView>
    );
  }
}
