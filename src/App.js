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

  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div>
            <AppNavbar />
            <main role="main" className="container my-3">
              <Route exact path="/" render={() => <Redirect to="/pokemons" />} />
              <Route exact path="/pokemons" component={() => <PokemonsList pokemons={this.state.pokemons} />} />
              <Route exact path="/pokemons/stats/:pokemonId" component={({ match }) => <PokemonStats id={match.params.pokemonId} />} />
              <Route exact path="/pokemons/captured" />
            </main>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
