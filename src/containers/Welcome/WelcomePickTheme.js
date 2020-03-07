import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {H2, H3} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {MCButton} from 'components/styled/Button';
import {colorThemes} from 'theme';
import NavigationService from 'navigation/NavigationService';
import {routerActions} from 'Redux/actions';

class WelcomePickTheme extends React.PureComponent {
  render() {
    const {t, setThemeIndex} = this.props;
    return (
      <MCRootView>
        <MCView p={20} justify="center">
          <H2 mt={40} mb={20}>
            {t('welcome_theme_displayText')}
          </H2>
          <MCView justify="space-between" row wrap width={dySize(250)}>
            {colorThemes.map((theme, index) => {
              return (
                <MCButton
                  bordered
                  align="center"
                  width={dySize(120)}
                  mt={12}
                  onPress={() => setThemeIndex(index)}
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                  }}>
                  <H3 style={{color: theme.text}}>{theme.theme_name}</H3>
                </MCButton>
              );
            })}
          </MCView>
          <MCButton
            mt={20}
            width={240}
            bordered
            align="center"
            onPress={() =>
              NavigationService.navigate('WelcomeReflectionPoint')
            }>
            <H3>{t('button_next')}</H3>
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
  setThemeIndex: routerActions.setThemeIndex,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(WelcomePickTheme),
);
