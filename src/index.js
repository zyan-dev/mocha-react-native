import React from 'react';
import {YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from 'Redux/store';
import AppWithNav from './navigation/AppWithNav';

import './i18next';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
console.disableYellowBox = true;

class MochaApp extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppWithNav />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default MochaApp;
