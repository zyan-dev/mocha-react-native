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
  width: ${dySize(100)}px;
  color: ${props => props.theme.colors.text};
  background-color: ${props => (props.type ? '#6f4c4b' : '#3d5164')};
  overflow: hidden;
  text-align: ${props => props.align || 'left'};
`;

export default class MCBookTagsView extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.array.isRequired,
  };

  render() {
    const {tags, impact} = this.props;
    return (
      <MCView column align="center">
        {!tags.length ? (
          <H4>No tags</H4>
        ) : (
          tags.map((tag, index) => (
            <TagView key={index} ph={5} mb={15} align="center" type={impact}>
              {tag}
            </TagView>
          ))
        )}
      </MCView>
    );
  }
}
