import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {MCView} from '../styled/View';
import {H4, H5} from '../styled/Text';
import {dySize} from 'utils/responsive';
import {MCImage} from 'components/common';

export default class MCBookTagsView extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.array.isRequired,
  };

  render() {
    const {t, tags, impact, users, theme} = this.props;

    return (
      <MCView row wrap>
        {!tags.length ? (
          <H4>No tags</H4>
        ) : (
          tags.map((tag, index) => (
            <MCView
              mr={5}
              mb={5}
              style={{
                postion: 'relative',
              }}>
              <MCView
                width={110}
                height={60}
                br={5}
                row
                align="center"
                justify="center"
                key={index}
                type={impact}
                background={impact ? '#C1F1D8' : '#FFE482'}>
                {impact ? (
                  <H5 align="center" color="#000000">
                    {' '}
                    {t(`resource_book_impact_${tag}`)}
                  </H5>
                ) : tag.indexOf('resource_manual_') > -1 ? (
                  <H5 align="center" color="#000000">
                    {t(tag.slice('resource_manual_'.length))}
                  </H5>
                ) : (
                  <H5 align="center" color="#000000">
                    {t(`skill_${tag}`)}
                  </H5>
                )}
              </MCView>

              {users && (
                <MCView row justify="flex-end" mt={-10} width={105}>
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
