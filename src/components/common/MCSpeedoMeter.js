import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Icon} from 'native-base';
import {dySize} from 'utils/responsive';
import MCEditableText from './MCEditableText';
import {MCView} from '../styled/View';
import {MCButton} from '../styled/Button';
import {MCIcon, H4} from '../styled/Text';
import {SpeedoMeterImage} from '../../assets/images';
import MCImage from './MCImage';

const ScaleView = styled.View`
  position: absolute,
  bottom: 0,
  left: 75
`;

class MCSpeedoMeter extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  static defaultProps = {};

  render() {
    const {width, value, theme} = this.props;
    const scale = dySize(width / 260);
    const radius = 160 * scale;
    console.log({radius});
    return (
      <MCView
        width={width}
        align="center"
        style={{overflow: 'visible'}}
        mb={10}>
        <MCView
          style={{
            position: 'absolute',
            left: dySize(-5),
            top: 80 * scale + 20,
          }}>
          <H4>0</H4>
        </MCView>
        <H4
          style={{
            position: 'absolute',
            left: dySize(width - 10),
            top: 80 * scale + 20,
          }}>
          100
        </H4>
        <MCImage width={width} image={SpeedoMeterImage} resizeMode="contain" />
        <MCView
          row
          width={width * 2.25}
          align="center"
          style={{
            marginTop: dySize(-10),
            transform: [{rotate: `${40 + value}deg`}],
          }}>
          <H4
            align="center"
            style={{
              width: width * 0.8,
              transform: [{rotate: '-90deg'}],
            }}>
            {value}
          </H4>
          <MCView
            br={1}
            width={width * 0.3}
            height={2}
            background={theme.colors.text}
          />
          <MCView
            br={(width * 0.05) / 2}
            width={width * 0.05}
            height={width * 0.05}
            background={theme.colors.text}
          />
          <MCView
            br={1}
            width={width * 0.3}
            height={2}
            background="transparent"
          />
          <MCView width={width * 0.8} />
        </MCView>
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default connect(mapStateToProps, undefined)(MCSpeedoMeter);
