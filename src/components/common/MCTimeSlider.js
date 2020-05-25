import React from 'react';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styled from 'styled-components';
import {MCView} from '../styled/View';
import {H4} from '../styled/Text';
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
  margin-top: -60px;
  width: 70px;
  height: 50px;
  justify-content: flex-end;
`;

const MarkerBottomView = styled.View`
  position: absolute;
  margin-bottom: -45px;
  width: 50px;
  height: 50px;
`;

const MarkerContainer = styled.View`
  align-items: center;
  position: relative;
`;

const Scale = styled.View`
  width: 2px;
  height: 10px;
  background-color: ${props => props.theme.colors.text};
  margin-top: -8px;
`;

class MCTimeSlider extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    values: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired, // [start, end] or [start]
    onChange: PropTypes.func,
    enabledLeft: PropTypes.bool,
    enabledRight: PropTypes.bool,
    showBottomLabel: PropTypes.bool,
    showLabel: PropTypes.bool,
    mt: PropTypes.number,
  };

  static defaultProps = {
    width: 320,
    animationIn: 'slideInLeft',
    animationOut: 'slideOutRight',
    onChange: () => undefined,
    enabledLeft: true,
    enabledRight: true,
    showBottomLabel: true,
    showLabel: true,
    mt: 50,
  };

  multiSliderValuesChange = values => {
    this.props.onChange(values);
  };

  render() {
    const {
      width,
      value,
      values,
      enabledLeft,
      enabledRight,
      showBottomLabel,
      showLabel,
      mt,
    } = this.props;
    const offset = value.length === 1 ? 10000 : value[1] - value[0];
    return (
      <MCView
        overflow="visible"
        width={width}
        height={80}
        mt={mt}
        justify="center">
        <MCView
          height={25}
          width={width}
          row
          justify="space-between"
          overflow="visible">
          {values.map(value => (
            <Scale key={value} />
          ))}
        </MCView>
        {showBottomLabel && (
          <MCView
            row
            justify="space-between"
            width={width + 30}
            ml={-15}
            mb={-20}>
            <H4>{values[0]}</H4>
            <H4>{values[values.length - 1]}</H4>
          </MCView>
        )}
        <MultiSlider
          isMarkersSeparated={true}
          enabledOne={enabledLeft}
          enabledTwo={enabledRight}
          customMarkerLeft={e => {
            return (
              <MarkerContainer>
                {showLabel && (
                  <MarkerTextView
                    style={{
                      right: e.currentValue !== 0 && offset < 3 ? 10 : null,
                    }}>
                    <H4 align="center">{values[e.currentValue]}</H4>
                  </MarkerTextView>
                )}
                <MarkerWrapper />
                <MarkerBottomView />
              </MarkerContainer>
            );
          }}
          customMarkerRight={e => {
            if (!showLabel) return null;
            return (
              <MarkerContainer>
                {showLabel && (
                  <MarkerTextView
                    style={{
                      left:
                        e.currentValue !== values.length - 1 && offset < 3
                          ? 10
                          : null,
                    }}>
                    <H4 align="center">{values[e.currentValue]}</H4>
                  </MarkerTextView>
                )}
                <MarkerWrapper />
                <MarkerBottomView />
              </MarkerContainer>
            );
          }}
          min={0}
          max={values.length - 1}
          step={1}
          sliderLength={dySize(width)}
          values={value}
          onValuesChange={this.multiSliderValuesChange}
          snapped
          containerStyle={{
            marginTop: showBottomLabel ? dySize(-57) : dySize(-46),
          }}
        />
      </MCView>
    );
  }
}

export default withTranslation()(MCTimeSlider);
