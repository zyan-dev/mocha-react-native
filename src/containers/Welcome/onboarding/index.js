import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
import WelcomeOnboardFirst from './First';
import WelcomeOnboardSecond from './Second';
import WelcomeOnboardThrid from './Third';
import {MCView} from '../../../components/styled/View';
import {dySize} from 'utils/responsive';

class WelcomeToMocha extends React.PureComponent {
  render() {
    const {theme} = this.props;
    return (
      <Swiper
        loop={false}
        showsButtons={false}
        paginationStyle={{marginBottom: dySize(110)}}
        dot={<MCView width={8} height={8} mr={5} bordered br={4} />}
        activeDot={
          <MCView
            width={8}
            height={8}
            bordered
            br={4}
            mr={5}
            background={theme.colors.text}
          />
        }>
        <WelcomeOnboardFirst />
        <WelcomeOnboardSecond />
        <WelcomeOnboardThrid />
      </Swiper>
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
  )(WelcomeToMocha),
);
