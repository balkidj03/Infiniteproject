import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {Provider} from 'react-redux';
import {AppNavigator, useServer} from './src/navigation';
import {store} from './src/store';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/lib';

const App = () => {
  const {isConnected} = useNetInfo();
  const {serverRunning} = useServer();

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <AppNavigator
          isConnected={isConnected}
          isServerRunning={serverRunning}
        />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
