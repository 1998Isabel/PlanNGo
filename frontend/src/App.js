import React, { Component } from 'react';
import './App.css';
import Header from './containers/Header'
import Main from './containers/Main'

class App extends Component {
  render() {
    return (
      <div className="grid-container">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
