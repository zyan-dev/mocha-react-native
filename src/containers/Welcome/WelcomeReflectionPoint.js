import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Icon} from 'native-base';
import {MCRootView, MCView} from 'components/styled/View';
import {H2, H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

class WelcomeReflectionPoint extends React.PureComponent {
  turnOffPoints = () => {};

  render() {
    const {t, theme} = this.props;
    return (
      <MCRootView>
        <MCView ph={20} pv={20} justify="center" align="center">
          <MCView row align="center" mt={40}>
            <H2>{t('welcome_reflectionpoints_title')}</H2>
            <Icon
              type="MaterialCommunityIcons"
              name="star-four-points-outline"
              size={36}
              style={{color: theme.colors.text}}
            />
          </MCView>
          <H3 mt={30} align="center">
            {t('welcome_reflectionpoints_displayText')}
          </H3>
          <MCButton
            mt={20}
            width={240}
            bordered
            align="center"
            onPress={() => NavigationService.navigate('WelcomeToTab')}>
            <H3>{t('welcome_reflectionpoints_buttons_continue')}</H3>
          </MCButton>
          <MCButton
            mt={20}
            width={240}
            bordered
            align="center"
            onPress={() => this.turnOffPoints()}>
            <H3>{t('welcome_reflectionpoints_buttons_turnoffpoints')}</H3>
          </MCButton>
        </MCView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(mapStateToProps, undefined)(WelcomeReflectionPoint),
);
