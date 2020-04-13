import React from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {dySize} from 'utils/responsive';
import {MCView} from '../styled/View';
import {H4} from '../styled/Text';
import {SpeedoMeterImage} from '../../assets/images';
import MCImage from './MCImage';

const ScaleView = styled.View`
  position: absolute,
  bottom: 0,
  left: 75
`;

class MCSpeedoMeter extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      rotateDeg: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentWillReceiveProps(props) {
    if (this.state.origin !== props.value) {
      this.animate();
    }
  }

  animate() {
    Animated.spring(this.state.rotateDeg, {
      toValue: 1,
      tension: 150,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const {width, value, theme} = this.props;
    const {rotateDeg} = this.state;
    const scale = dySize(width / 260);
    const rotate = rotateDeg.interpolate({
      inputRange: [0, 1],
      outputRange: [`${40}deg`, `${value + 40}deg`],
    });
    return (
      <MCView width={width} align="center" style={{overflow: 'visible'}}>
        <MCView
          style={{
            position: 'absolute',
            left: dySize(-5),
            top: 90 * scale,
          }}>
          <H4>0</H4>
        </MCView>
        <H4
          style={{
            position: 'absolute',
            left: dySize(width - 15),
            top: 90 * scale,
          }}>
          100
        </H4>
        <MCImage
          width={width}
          height={144 * scale}
          image={SpeedoMeterImage}
          resizeMode="contain"
        />
        <MCView
          as={Animated.View}
          row
          width={width * 0.95 + 100}
          height={20}
          overflow="visible"
          align="center"
          style={{
            marginTop: dySize(-10),
            transform: [{rotate}, {perspective: 1000}],
          }}>
          <H4
            align="center"
            style={{
              width: dySize(50),
              transform: [{rotate: '-90deg'}],
            }}>
            {value}
          </H4>
          <MCView
            br={1}
            width={width * 0.45}
            height={2}
            background={theme.colors.text}
          />
          <MCView
            br={(width * 0.05) / 2}
            width={width * 0.05}
            height={width * 0.05}
            background={theme.colors.text}
          />
          <MCView br={1} width={width * 0.45} height={2} />
          <H4
            align="center"
            style={{
              width: dySize(50),
              transform: [{rotate: '-90deg'}],
            }}>
            {''}
          </H4>
        </MCView>
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default connect(
  mapStateToProps,
  undefined,
)(MCSpeedoMeter);
