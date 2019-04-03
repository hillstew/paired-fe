import React, { Component } from 'react';
import './styles/main.scss';
import Sidebar from './containers/Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        App is running
      </div>
    );
  }
}

export default App;
