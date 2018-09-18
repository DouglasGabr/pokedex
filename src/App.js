import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { BrowserRouter as Router, Route } from "react-router-dom";

const one = () => <div><h2>AAAAAAAAAA</h2></div>;
const two = () => <div><h2>BBBBBBBBBB</h2></div>;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppNavbar />
          <main role="main" className="container">
            <Route exact path="/pokemons" component={one} />
            <Route exact path="/pokemons/captured" component={two} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
