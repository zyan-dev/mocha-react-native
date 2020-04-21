import React from 'react';
import {YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';
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
let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

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

export default codePush(codePushOptions)(MochaApp);
