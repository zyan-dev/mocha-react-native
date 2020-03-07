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
  };
  static defaultProps = {
    round: false,
    width: 100,
    height: 100,
    image: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: props.image !== null,
    };
  }

  render() {
    const {loading} = this.state;
    const {round, width, height, type, image} = this.props;
    const defaultImage = type === 'avatar' ? DefaultAvatar : DefaultPicture;
    const imageStyle = {
      width: dySize(width),
      height: dySize(height),
    };
    return (
      <MCView
        width={width}
        height={height}
        justify="center"
        align="center"
        style={{position: 'relative'}}
        br={round ? width / 2 : 0}>
        <ProgressWrapper style={{width, height}}>
          {loading ? (
            <Progress.Circle size={30} indeterminate />
          ) : (
            <FastImage source={defaultImage} style={imageStyle} />
          )}
        </ProgressWrapper>
        <FastImage
          style={imageStyle}
          onLoadEnd={() => this.setState({loading: false})}
          source={image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </MCView>
    );
  }
}
