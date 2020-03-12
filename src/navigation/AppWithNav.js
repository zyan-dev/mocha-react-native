import React from 'react';
import {AppState} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {Container} from 'native-base';
import {ThemeProvider} from 'styled-components';
import {routerActions} from 'Redux/actions';
import RootNavigator from './RootNavigation';

class AppWithNav extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  // Adds listener to app state changes and hides splash screen after 1 second.
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    // this.props.resetAllReducer();
  }

  // Removes listener to app state changes
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  // Updates lock status based on app state changes
  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/active/) && nextAppState === 'inactive') {
      console.log('App has come to the foreground!');
    }
    this.setState({appState: nextAppState});
  };

  render() {
    const {theme} = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <RootNavigator />
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  resetAllReducer: routerActions.resetAllReducer,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNav);
