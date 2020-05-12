import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {MCView} from '../styled/View';
import {H4, H6} from '../styled/Text';
import {dySize} from 'utils/responsive';
import {MCImage} from 'components/common';

const TagView = styled(H4)`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${dySize(8)}px;
  height: ${dySize(30)}px;
  width: ${dySize(120)}px;
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
    const {t, tags, impact, collaborators} = this.props;

    return (
      <MCView column align="center">
        {!tags.length ? (
          <H4>No tags</H4>
        ) : (
          tags.map((tag, index) => (
            <MCView
              style={{
                postion: 'relative',
              }}>
              <TagView
                key={index}
                ph={5}
                mb={25}
                align="center"
                type={impact}
                numberOfLines={1}>
                {impact
                  ? t(`resource_book_impact_${tag}`)
                  : tag.indexOf('resource_manual_') > -1
                  ? t(tag.slice('resource_manual_'.length))
                  : t(`resource_book_skills_${tag}`)}
              </TagView>
              {collaborators && (
                <MCView
                  row
                  align="flex-start"
                  absolute
                  style={{
                    top: 28,
                    left: 50,
                  }}>
                  <H6 ml={30}>+12</H6>
                  <MCView
                    row
                    align="center"
                    style={{flex: 1}}
                    ml={15}
                    overflow="visible">
                    {collaborators.map(user => (
                      <MCImage
                        key={user._id}
                        image={{uri: user.avatar}}
                        round
                        width={20}
                        height={20}
                        style={{marginLeft: dySize(-15)}}
                      />
                    ))}
                  </MCView>
                </MCView>
              )}
            </MCView>
          ))
        )}
      </MCView>
    );
  }
}
