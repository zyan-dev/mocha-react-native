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
  background-color: ${props => props.theme.colors.card};
  overflow: hidden;
`;

export default class MCTagsView extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    more: PropTypes.node,
  };

  static defaultProps = {
    more: null,
  };

  render() {
    const {tags, more} = this.props;
    return (
      <MCView row wrap style={{width: '100%'}}>
        {!tags.length ? (
          <H4>No tags</H4>
        ) : (
          tags.map((tag, index) => (
            <TagView key={index} ph={5} mb={5} mr={5}>
              {tag}
            </TagView>
          ))
        )}
        {more}
      </MCView>
    );
  }
}
