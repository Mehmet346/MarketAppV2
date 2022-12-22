
import React from 'react';
import Route from './src/Route'

import { StoreProvider } from './src/screens/utils/Store'
export default class App extends React.Component {
  render() {
    return (
      <StoreProvider>
        <Route />
      </StoreProvider>
    )
  }
}
