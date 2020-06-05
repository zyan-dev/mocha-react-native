import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCView, NativeCard, DividerLine} from 'components/styled/View';
import {MCTagsView, MCReadMoreText, MCImage, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';

class PostItem extends React.PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    editable: PropTypes.bool,
    onPressEdit: PropTypes.func,
    onPressRemove: PropTypes.func,
    onPressDetail: PropTypes.func,
  };

  static defaultProps = {
    editable: true,
    onPressEdit: () => undefined,
    onPressRemove: () => undefined,
    onPressDetail: () => undefined,
  };

  _renderAttachItem = item => {
    return (
      <MCImage
        image={{uri: item}}
        width={100}
        height={100}
        br={10}
        style={{marginRight: dySize(10)}}
      />
    );
  };

  render() {
    const {
      t,
      theme,
      post,
      editable,
      profile,
      onPressEdit,
      onPressRemove,
      onPressDetail,
    } = this.props;
    const isOwn = post.ownerId === profile._id;
    return (
      <NativeCard width={340} mt={15} align="flex-start">
        <MCButton pl={1} pr={1} onPress={() => onPressDetail()}>
          <MCView row mb={15}>
            {!isOwn && (
              <MCView width={60}>
                <MCImage
                  image={{uri: post.ownerAvatar}}
                  width={40}
                  height={40}
                  round
                  type="avatar"
                />
              </MCView>
            )}
            <MCView style={{flex: 1}}>
              <MCView row mr={50}>
                <H3 weight="bold" style={{flex: 1}} numberOfLines={1}>
                  {post.title}
                </H3>
              </MCView>
              <H4 numberOfLines={3}>{post.content}</H4>
            </MCView>
          </MCView>
          {post.attachments.length > 0 && (
            <MCView>
              <H4>Attachments: </H4>
              <MCView height={120} row>
                {post.attachments.map(attachment => {
                  return this._renderAttachItem(attachment);
                })}
              </MCView>
            </MCView>
          )}

          <DividerLine width={320} />
          <H4 underline mt={10}>
            Skills
          </H4>
          <MCTagsView
            tags={_.get(post, ['skills'], []).slice(0, 3)}
            more={
              post.skills.length > 3 ? (
                <H4 color={theme.colors.border}>
                  {t('more_skills', {num: post.skills.length - 3})}
                </H4>
              ) : null
            }
          />
        </MCButton>
        {editable && (
          <MCView row style={{position: 'absolute', right: 0, top: dySize(15)}}>
            <MCButton onPress={() => onPressEdit()} pt={1} pb={1}>
              <MCIcon name="ios-create" padding={1} />
            </MCButton>
            <MCButton onPress={() => onPressRemove()} pt={1} pb={1}>
              <MCIcon name="ios-trash" padding={1} />
            </MCButton>
          </MCView>
        )}
      </NativeCard>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PostItem),
);
