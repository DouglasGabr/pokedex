import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import client from './PokemonApiClient';
import PokemonsList from './PokemonsList';

import PokemonStats from './PokemonStats';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { capturedPokemonIds: [] };
  }

  onPokemonCaptured = id => {
    let capturedPokemons = [...this.state.capturedPokemonIds];
    const pokemonIndex = capturedPokemons.indexOf(id);
    if (pokemonIndex >= 0) {
      capturedPokemons.splice(pokemonIndex, 1);
    } else {
      capturedPokemons.push(id);
    }
    this.setState({ capturedPokemonIds: capturedPokemons });
  }

  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div>
            <AppNavbar />
            <main role="main" className="container my-3">
              <Switch>
                <Route path="/pokemons/captured" component={() => <PokemonsList listCaptured={true} capturedPokemons={this.state.capturedPokemonIds} onPokemonCaptured={this.onPokemonCaptured} />} />
                <Route path="/pokemons/:pokemonId" component={({ match }) => {
                  const isCaptured = this.state.capturedPokemonIds.indexOf(match.params.id) >= 0;
                  return <PokemonStats id={match.params.pokemonId} isCaptured={isCaptured} />
                }} />
                <Route path="/pokemons" component={() => <PokemonsList listCaptured={false} capturedPokemons={this.state.capturedPokemonIds} onPokemonCaptured={this.onPokemonCaptured} />} />
                <Route path="/" render={() => <Redirect to="/pokemons" />} />
              </Switch>
            </main>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
