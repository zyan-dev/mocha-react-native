import React, {Component, Fragment} from 'react';
import {Animated} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import Svg, {Path, Text, G} from 'react-native-svg';
import * as d3 from 'd3-shape';
import styled from 'styled-components';
import {reflectionActions} from 'Redux/actions';
import {EMOTIONS} from 'utils/constants';
import {hslToRgb} from 'services/operators';
import {MCButton} from 'components/styled/Button';
import {H3, H4} from 'components/styled/Text';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import NavigationService from 'navigation/NavigationService';

const PieChartWrapper = styled(Animated.View)`
  align-self: stretch;
  aspect-ratio: 1;
`;

const Panel = styled(Svg)`
  flex: 1;
  align-self: stretch;
`;

const innerRadiuses = [7, 36, 67];
const lightness = [0.7, 0.75, 0.8];
const ANGLE_INTERVAL = 360 / EMOTIONS[2].length;

class EmotionPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAngle: new Animated.Value(0),
      scale: 1.5,
      selectedValue: '',
    };
  }

  currentAngle = 0;
  animating = false;
  chartData = EMOTIONS.map((EMOTIONSET, index) => ({
    innerRadius: innerRadiuses[index],
    items: EMOTIONSET.map((EMOTION, emotionIndex) => ({
      emotion: EMOTION,
      label: this.props.t(`mocha_emotion_${EMOTION}`),
      value: EMOTIONS[index + 1]
        ? EMOTIONS[index + 1].filter(item => item.startsWith(EMOTION)).length
        : 1,
      stroke: 'black',
      fill: `rgb(${hslToRgb(
        (EMOTIONSET.length - emotionIndex - 1) / EMOTIONSET.length,
        1,
        lightness[index],
      ).join(', ')})`,
    })),
  }));

  componentDidMount() {
    const {emotion} = this.props.route.params;
    const index = EMOTIONS[2].indexOf(emotion);
    this.onAngleChange(-ANGLE_INTERVAL * (index + 1));
  }

  onAngleChange = offset => {
    if (!this.panel || this.animating) return;
    this.animating = true;
    Animated.timing(
      this.state.currentAngle, // The value to drive
      {
        toValue: (this.currentAngle + offset) / 360,
        tension: 150,
        friction: 5,
        useNativeDriver: true,
        duration: 200,
      },
    ).start(() => {
      this.currentAngle += offset;
      let angle = this.currentAngle % 360;
      if (angle < 0) angle += 360;
      const index = EMOTIONS[2].length - 1 - angle / ANGLE_INTERVAL;
      const selectedValue = EMOTIONS[2][Math.round(index)];
      this.setState({selectedValue});
      this.animating = false;
      this.forceUpdate();
    });
  };

  onScale = value => {
    this.setState({scale: value});
  };

  onUpdatePanel = () => {
    const {scale} = this.state;
    this.panel.setNativeProps({
      transform: [
        {scale: scale},
        {rotate: (this.currentAngle * Math.PI) / 180},
      ],
    });
  };

  onPressRight = () => {
    this.props.updateSelectedReflection({emotion: this.state.selectedValue});
    NavigationService.goBack();
  };

  onPressCategory = label => {
    // const emotionCategories = EMOTIONS[0].map(i =>
    //   this.props.t(`mocha_emotion_${i}`),
    // );
    const isCategory = EMOTIONS[0].indexOf(label) > -1;
    if (!isCategory) return;
    const count = EMOTIONS[2].filter(i => i.indexOf(`${label}_`) > -1).length;
    const firstIndex = EMOTIONS[2].findIndex(i => i.indexOf(`${label}_`) > -1);
    const focusIndex = firstIndex + Math.floor(count / 2);
    const currentSelectedIndex = EMOTIONS[2].indexOf(this.state.selectedValue);
    console.log({focusIndex});
    this.onAngleChange(
      -ANGLE_INTERVAL * (focusIndex - currentSelectedIndex + 1),
    );
  };

  render() {
    const {t} = this.props;
    const {currentAngle, selectedValue, scale} = this.state;
    const rotate = currentAngle.interpolate({
      inputRange: [-10000, 10000],
      outputRange: [`${-3600000}deg`, `${3600000}deg`],
    });
    let shapes = [];
    this.chartData.forEach(({innerRadius, items}, index) => {
      const angles = d3
        .pie()
        .sort(null)
        .value(item => item.value)(items);
      const outerRadius =
        (this.chartData.length - 1 === index
          ? 100
          : this.chartData[index + 1].innerRadius) || innerRadius;
      const path = d3
        .arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);
      shapes.push(
        ...angles.map(angle => ({
          ...angle,
          path: path(angle),
          innerRadius,
          outerRadius,
        })),
      );
    });
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('edit_emotion_headerTitle')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressRight()}
        />
        <MCView height={25} align="center">
          <MCIcon type="FontAwesome5Pro" name="arrow-alt-down" />
        </MCView>
        <MCView style={{flex: 1, paddingTop: 120}} width={375} align="center">
          <PieChartWrapper
            style={{
              transform: [{rotate}, {perspective: 1000}],
            }}>
            <Panel
              style={{
                transform: [
                  {scale: scale},
                  {rotate: ANGLE_INTERVAL / 2 + 'deg'},
                ],
              }}
              viewBox="-100 -100 200 200"
              ref={ref => {
                this.panel = ref;
              }}>
              {shapes.map(
                (
                  {
                    path,
                    data: {stroke, fill, label, emotion},
                    startAngle,
                    endAngle,
                    innerRadius,
                    outerRadius,
                  },
                  index,
                ) => {
                  const rotation =
                    ((startAngle + endAngle - Math.PI) * 90) / Math.PI;
                  const cx = (innerRadius + outerRadius) / 2;
                  const cy = 2;
                  let angel = this.currentAngle % 360;
                  if (angel < 0) angel += 360;
                  if (label === 'Hateful')
                    console.log({
                      Angel: this.currentAngle % 360,
                    });
                  return (
                    <Text
                      key={index}
                      onPress={() => this.onPressCategory(emotion)}>
                      <Path
                        d={path}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={0.5}
                      />
                      <G rotation={rotation} color="0xaarrggbb">
                        <Text
                          x={cx}
                          y={cy}
                          fontSize={4}
                          textAnchor="middle"
                          originX={cx}
                          originY={0}
                          fill="black"
                          rotation={
                            Math.abs(angel + rotation + 90) % 360 < 180
                              ? 0
                              : 180
                          }>
                          {label}
                        </Text>
                      </G>
                    </Text>
                  );
                },
              )}
            </Panel>
          </PieChartWrapper>
        </MCView>
        <MCView
          row
          justify="space-between"
          align="center"
          width={375}
          height={70}>
          <MCButton onPress={() => this.onAngleChange(-ANGLE_INTERVAL)}>
            <MCIcon name="md-undo" size={40} />
          </MCButton>
          <H3 weight="bold">{t(`mocha_emotion_${selectedValue}`)}</H3>
          <MCButton onPress={() => this.onAngleChange(ANGLE_INTERVAL)}>
            <MCIcon name="md-redo" size={40} />
          </MCButton>
        </MCView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EmotionPicker),
);
