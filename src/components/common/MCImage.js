import React from 'react';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import {DefaultAvatar, DefaultPicture} from 'assets/images';
import {MCView} from '../styled/View';
import {dySize} from 'utils/responsive';

const ProgressWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export default class MCImage extends React.PureComponent {
  static propTypes = {
    round: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    image: PropTypes.object,
    type: PropTypes.string,
    style: PropTypes.object,
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
    br: PropTypes.number,
  };
  static defaultProps = {
    round: false,
    width: 100,
    height: 100,
    image: null,
    style: {},
    resizeMode: 'cover',
    br: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: props.image !== null,
      loadError: false,
    };
  }

  render() {
    const {loading, loadError} = this.state;
    const {
      round,
      width,
      height,
      type,
      image,
      resizeMode,
      br,
      style,
    } = this.props;
    const defaultImage = type === 'avatar' ? DefaultAvatar : DefaultPicture;
    const imageStyle = {
      width: dySize(width),
      height: dySize(height),
      borderRadius: round ? dySize(width) / 2 : 0,
      overflow: 'hidden',
    };
    return (
      <MCView
        width={width}
        height={height}
        justify="center"
        align="center"
        style={{position: 'relative', overflow: 'hidden', ...style}}
        br={round ? width / 2 : br}>
        <ProgressWrapper style={imageStyle}>
          {loading && <Progress.Circle size={30} indeterminate />}
          {loadError && <FastImage source={defaultImage} style={imageStyle} />}
        </ProgressWrapper>
        <FastImage
          style={imageStyle}
          onLoadEnd={() => this.setState({loading: false})}
          onError={() => this.setState({loadError: true})}
          source={image}
          resizeMode={FastImage.resizeMode[resizeMode]}
        />
      </MCView>
    );
  }
}
