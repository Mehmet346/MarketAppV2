
import React from 'react';
import Route from './src/Route'
import { PracticeProvider } from './src/screens/Global/PracticeContext';
export default  class App extends React.Component{
  render() {
    return (
      <PracticeProvider>
        <Route/>
      </PracticeProvider>
    )
  }
}
