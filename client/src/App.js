import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Map from './Map'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='App'>
          <div className='App-header'>
            <b>Simulation demo</b>
          </div>
          <Map />
        </div>
      </MuiThemeProvider>
    );
  }
}
