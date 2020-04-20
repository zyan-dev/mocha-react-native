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
  color: ${props => props.theme.colors.background};
  background-color: #979797;
  overflow: hidden;
`;

export default class MCTagsView extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.array.isRequired,
  };

  render() {
    const {tags} = this.props;
    return (
      <MCView row wrap style={{flex: 1}}>
        {!tags.length ? (
          <H4>No tags</H4>
        ) : (
          tags.map((tag, index) => (
            <TagView key={index} ph={5} mb={5} mr={5}>
              {tag}
            </TagView>
          ))
        )}
      </MCView>
    );
  }
}
