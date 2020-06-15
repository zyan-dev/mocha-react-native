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
  color: #000000;
  background-color: ${props => (props.type ? '#C1F1D8' : '#FFE482')};
  overflow: hidden;
  text-align: ${props => props.align || 'left'};
`;

export default class MCBookTagsView extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.array.isRequired,
  };

  render() {
    const {t, tags, impact, users, theme} = this.props;

    return (
      <MCView column align="center">
        {!tags.length ? (
          <H4>No tags</H4>
        ) : (
          tags.map((tag, index) => (
            <MCView
              mr={10}
              mb={10}
              style={{
                postion: 'relative',
              }}>
              <TagView
                width={160}
                align="center"
                justify="center"
                align="center"
                key={index}
                ph={5}
                type={impact}>
                {impact
                  ? t(`resource_book_impact_${tag}`)
                  : tag.indexOf('resource_manual_') > -1
                  ? t(tag.slice('resource_manual_'.length))
                  : t(`skill_${tag}`)}
              </TagView>

              {users && (
                <MCView row justify="flex-end" mt={-10} mb={20} width={160}>
                  {users.slice(0, 3).map((avatar, index) => (
                    <>
                      <MCView ml={-14}>
                        <MCImage
                          key={index}
                          image={{uri: avatar}}
                          round
                          width={28}
                          height={28}
                          type="avatar"
                        />
                      </MCView>
                      {users.length > 3 && index == 2 && (
                        <MCView
                          width={28}
                          height={28}
                          bordered
                          br={14}
                          background={theme.colors.text}
                          align="center"
                          justify="center"
                          ml={-14}
                          style={{opacity: 0.8}}>
                          <H4 weight="bold" color={theme.colors.background}>
                            +{users.length - 3}
                          </H4>
                        </MCView>
                      )}
                    </>
                  ))}
                </MCView>
              )}
            </MCView>
          ))
        )}
      </MCView>
    );
  }
}
