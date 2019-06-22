import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import './assets/css/home.css';
import Header from './containers/Header'
import Main from './containers/Main'
import Home from './components/Home'
import Login from './components/Login'
import NewProject from './containers/NewProject'
class App extends Component {
  render() {

    const mainPage = () => {
      return(
        <div className="grid-container">
          <Header />
          <Main />
        </div>
      )
    }

    return (
      <div>
        <Route exact path="/"      component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/NewProject" component={NewProject} />
        <Route path="/main" component={mainPage}/>
      </div>
    );
  }
}

export default App;
