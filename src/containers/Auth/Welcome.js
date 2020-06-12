import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {BookLightSvg, PeopleArrowSvg} from 'assets/svgs';
import {
  CornerOvalYellowA,
  CornerOvalYellowB,
  CornerOvalGreenA,
  CornerOvalGreenB,
} from 'components/styled/Custom';

class FeedWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  render() {
    const {index} = this.state;
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <CornerOvalYellowA />
        <CornerOvalYellowB />
        <CornerOvalGreenA />
        <CornerOvalGreenB />
        <MCHeader hasBack={false} title={t('auth_welcome_community')} />
        <Swiper
          style={{backgroundColor: 'transparent'}}
          loop={false}
          showsButtons={false}
          index={index}
          onIndexChanged={index => this.setState({index})}
          paginationStyle={{marginBottom: dySize(120)}}
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
          <MCView ph={30} align="center">
            <MCView mt={70}>
              <PeopleArrowSvg size={40} color={theme.colors.text} />
            </MCView>
            <MCView
              bordered
              mt={20}
              br={20}
              ph={20}
              height={50}
              style={{borderColor: theme.colors.outline}}
              align="center"
              justify="center">
              <H3 weight="bold" color={theme.colors.outline}>
                {t('button_peer_coaching')}
              </H3>
            </MCView>
            <H4 weight="italic" align="center">
              {t('auth_peer_button_description')}
            </H4>
          </MCView>
          <MCView ph={30} align="center">
            <MCView mt={70}>
              <MCIcon type="FontAwesome5Pro" name="mountain" size={40} />
            </MCView>
            <MCView
              bordered
              mt={20}
              br={20}
              ph={20}
              height={50}
              style={{borderColor: theme.colors.outline}}
              align="center"
              justify="center">
              <H3 weight="bold" color={theme.colors.outline}>
                {t('button_community_challenges')}
              </H3>
            </MCView>
            <H4 weight="italic" align="center">
              {t('auth_challenge_button_description')}
            </H4>
          </MCView>
          <MCView ph={30} align="center">
            <MCView mt={70}>
              <BookLightSvg size={40} theme={theme} color={theme.colors.text} />
            </MCView>
            <MCView
              bordered
              mt={20}
              br={20}
              ph={20}
              height={50}
              style={{borderColor: theme.colors.outline}}
              align="center"
              justify="center">
              <H3 weight="bold" color={theme.colors.outline}>
                {t('button_community_resources')}
              </H3>
            </MCView>
            <H4 weight="italic" align="center">
              {t('auth_resource_button_description')}
            </H4>
          </MCView>
        </Swiper>
        {index === 2 ? (
          <MCButton
            br={20}
            height={50}
            align="center"
            background={theme.colors.outline}
            pl={20}
            pr={20}
            mb={60}
            onPress={() => NavigationService.navigate('mainStack')}>
            <H3 color={theme.colors.background}>
              {t('welcome_nextButtonText')}
            </H3>
          </MCButton>
        ) : (
          <MCView height={110} />
        )}
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
  )(FeedWelcome),
);
