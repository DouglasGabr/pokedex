import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import client from './PokemonApiClient';
import PokemonsList from './PokemonsList';
import gql from "graphql-tag";
import PokemonStats from './PokemonStats';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pokemons: [] };
    client
      .query({
        query: gql`
                {
                  pokemons(first: -1) {
                    id
                    name
                    image
                  }
                }
              `
      })
      .then(result => this.setState({ pokemons: result.data.pokemons.map(p => ({ ...p, isCaptured: false })) }));
  }

  onPokemonCaptured = id => {
    this.setState({
      pokemons: this.state.pokemons.map(p => p.id === id ? { ...p, isCaptured: !p.isCaptured } : p)
    });
  }

  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div>
            <AppNavbar />
            <main role="main" className="container my-3">
              <Route exact path="/" render={() => <Redirect to="/pokemons" />} />
              <Route exact path="/pokemons" component={() => <PokemonsList pokemons={this.state.pokemons} onPokemonCaptured={this.onPokemonCaptured} />} />
              <Route exact path="/pokemons/stats/:pokemonId" component={({ match }) => {
                const pokemon = this.state.pokemons.find(p => p.id === match.params.pokemonId);
                let isCaptured = false;
                if (pokemon) {
                  isCaptured = pokemon.isCaptured;
                }
                return <PokemonStats id={match.params.pokemonId} isCaptured={isCaptured} />
              }} />
              <Route exact path="/pokemons/captured" component={() => <PokemonsList pokemons={this.state.pokemons.filter(p => p.isCaptured)} onPokemonCaptured={this.onPokemonCaptured} />} />
            </main>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
