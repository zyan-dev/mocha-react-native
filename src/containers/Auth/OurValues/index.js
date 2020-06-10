import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import NavigationService from 'navigation/NavigationService';
import AuthenticityScreen from './Authenticity';
import BelongingScreen from './Belonging';
import CoachingScreen from './Coaching';
import DeterminationScreen from './Determination';
import {
  CornerOvalYellowA,
  CornerOvalYellowB,
  CornerOvalGreenA,
  CornerOvalGreenB,
} from 'components/styled/Custom';
import {dySize} from 'utils/responsive';

class OurValuesScreen extends React.PureComponent {
  state = {
    index: 0,
  };
  render() {
    const {index} = this.state;
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <CornerOvalYellowA />
        <CornerOvalYellowB />
        <CornerOvalGreenA />
        <CornerOvalGreenB />
        <MCHeader
          hasRight={index === 3}
          title={t('title_our_values')}
          rightIcon="arrow-right"
          onPressRight={() => {
            NavigationService.navigate('Auth_OurCommunityRule');
          }}
        />
        <Swiper
          style={{backgroundColor: 'transparent'}}
          loop={false}
          showsButtons={false}
          index={index}
          onIndexChanged={index => this.setState({index})}
          paginationStyle={{marginBottom: dySize(80)}}
          dot={
            <MCView
              width={16}
              height={16}
              mr={5}
              bordered
              br={10}
              style={{borderColor: theme.colors.outline}}
            />
          }
          activeDot={
            <MCView
              width={16}
              height={16}
              mr={5}
              bordered
              br={10}
              background={theme.colors.outline}
              style={{borderColor: theme.colors.outline}}
            />
          }>
          <AuthenticityScreen />
          <BelongingScreen />
          <CoachingScreen />
          <DeterminationScreen />
        </Swiper>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(OurValuesScreen),
);
