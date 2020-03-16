import React from 'react';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styled from 'styled-components';
import {MCCard, MCView} from '../styled/View';
import {H4, MCIcon} from '../styled/Text';
import {MCButton} from '../styled/Button';
import {dySize} from 'utils/responsive';
import {withTranslation} from 'react-i18next';

const MarkerWrapper = styled.View`
  width: ${dySize(24)}px;
  height: ${dySize(24)}px;
  background-color: green;
  border-radius: ${dySize(12)}px;
  border-width: 8px;
  border-color: ${props => props.theme.colors.text};
`;

const MarkerTextView = styled.View`
  text-align: center;
  position: absolute;
  margin-top: -45px;
  width: 50px;
`;

const MarkerContainer = styled.View`
  align-items: center;
  position: relative;
`;

class MCTimeSlider extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    values: PropTypes.array.isRequired,
    range: PropTypes.object.isRequired, // {start: 0, end: 10}
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    width: 320,
    animationIn: 'slideInLeft',
    animationOut: 'slideOutRight',
  };

  multiSliderValuesChange = values => {
    this.props.onChange({
      start: values[0],
      end: values[1],
    });
  };

  render() {
    const {
      width,
      range: {start, end},
      values,
    } = this.props;
    const offset = end - start;
    return (
      <MCView
        overflow="visible"
        width={width}
        height={80}
        mt={50}
        justify="center">
        <MCView height={24} width={width} row justify="space-between">
          {values.map(value => (
            <MCView width={2} height={10} style={{backgroundColor: 'white'}} />
          ))}
        </MCView>
        <MultiSlider
          isMarkersSeparated={true}
          customMarkerLeft={e => {
            return (
              <MarkerContainer>
                <MarkerTextView
                  style={{
                    right: e.currentValue !== 0 && offset < 2 ? 10 : null,
                  }}>
                  <H4 align="center">{values[e.currentValue]}</H4>
                </MarkerTextView>
                <MarkerWrapper />
              </MarkerContainer>
            );
          }}
          customMarkerRight={e => {
            return (
              <MarkerContainer>
                <MarkerTextView
                  style={{
                    left:
                      e.currentValue !== values.length - 1 && offset < 2
                        ? 10
                        : null,
                  }}>
                  <H4 align="center">{values[e.currentValue]}</H4>
                </MarkerTextView>
                <MarkerWrapper />
              </MarkerContainer>
            );
          }}
          min={0}
          max={values.length - 1}
          step={1}
          sliderLength={dySize(width)}
          values={[start, end]}
          onValuesChange={this.multiSliderValuesChange}
          snapped
          containerStyle={{marginTop: dySize(-36)}}
        />
        <MCView
          row
          justify="space-between"
          width={width + 30}
          ml={-15}
          mt={-20}>
          <H4>{values[0]}</H4>
          <H4>{values[values.length - 1]}</H4>
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(MCTimeSlider);
