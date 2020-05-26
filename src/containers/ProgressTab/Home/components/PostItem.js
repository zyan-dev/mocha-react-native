import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCView, NativeCard, DividerLine} from 'components/styled/View';
import {MCTagsView, MCReadMoreText, MCImage} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';

class PostItem extends React.PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
  };

  _renderAttachItem = ({item}) => {
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
    const {t, post, editable, profile} = this.props;
    const isOwn = post.ownerId === profile._id;
    return (
      <NativeCard width={340} mt={15} align="flex-start">
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
            <H3 weight="bold">{post.title}</H3>
            <MCReadMoreText>
              <H4>{post.content}</H4>
            </MCReadMoreText>
          </MCView>
        </MCView>
        {post.attachments.length > 0 && (
          <MCView>
            <H4>Attachments: </H4>
            <MCView height={120} justify="center">
              <FlatList
                data={post.attachments}
                horizontal
                renderItem={this._renderAttachItem}
                keyExtractor={item => item}
              />
            </MCView>
          </MCView>
        )}

        <DividerLine width={320} />
        <H4 underline mt={10}>
          Skills
        </H4>
        <MCTagsView tags={post.skills || []} />
      </NativeCard>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PostItem),
);
