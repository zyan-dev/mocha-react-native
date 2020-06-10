import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {H4} from 'components/styled/Text';
import {MCHeader, MCCheckBox} from 'components/common';
import AuthenticityScreen from '../Auth/OurValues/Authenticity';
import BelongingScreen from '../Auth/OurValues/Belonging';
import CoachingScreen from '../Auth/OurValues/Coaching';
import DeterminationScreen from '../Auth/OurValues/Determination';
import {
  CornerOvalYellowA,
  CornerOvalYellowB,
  CornerOvalGreenA,
  CornerOvalGreenB,
} from 'components/styled/Custom';
import {dySize} from 'utils/responsive';

const ServiceRules = ['authenticity', 'belonging', 'coaching', 'determination'];

class CommunityGuideLinesScreen extends React.PureComponent {
  state = {
    index: 0,
  };
  render() {
    const {index} = this.state;
    const {t, theme, profile} = this.props;
    return (
      <MCRootView justify="flex-start">
        <CornerOvalYellowA />
        <CornerOvalYellowB />
        <CornerOvalGreenA />
        <CornerOvalGreenB />
        <MCHeader
          title={
            index === 4
              ? t('title_our_community_guidelines')
              : t('title_our_values')
          }
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
          <MCContent
            style={{marginBottom: dySize(140)}}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: 30,
            }}>
            {ServiceRules.map(rule => {
              return (
                <MCView width={340} row align="center">
                  <MCCheckBox
                    width={320}
                    hasLeftText
                    bigText={false}
                    iconColor={theme.colors.outline}
                    label={t(`auth_rule_${rule}`)}
                    checked={true}
                    onChange={checked => {}}
                    round
                  />
                </MCView>
              );
            })}
            <H4 weight="bold" mt={30}>
              {t('label_agreed_on')}
            </H4>
            <H4>{moment(profile.created).format('MMM Do, YYYY')}</H4>
          </MCContent>
        </Swiper>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(CommunityGuideLinesScreen),
);
