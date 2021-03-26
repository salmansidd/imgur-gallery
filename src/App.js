import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from 'redux/store';
import AppRouter from 'components/AppRouter';

class App extends Component {
  render() {
    return (
      <div data-testid='imgur-app'>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
