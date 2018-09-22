import React, { Component } from "react";
import client from './PokemonApiClient';
import gql from "graphql-tag";
import {
  Card, CardText, CardBody, CardLink, CardTitle
} from 'reactstrap';

class PokemonStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {}
    };
    clieApolloClientnt.query({
      query: gql`
              {
                pokemon(id: "${props.id}") {
                  id
                  number
                  name
                  classification
                  weight {
                    minimum
                    maximum
                  }
                  height {
                    minimum
                    maximum
                  }
                  types
                  resistant
                  attacks {
                    fast {
                      name
                      type
                      damage
                    }
                    special {
                      name
                      type
                      damage
                    }
                  }
                  weaknesses
                  fleeRate
                  maxCP
                  evolutions {
                    id
                    name
                    image
                  }
                  evolutionRequirements {
                    amount
                    name
                  }
                  maxHP
                  image
                }
              }
            `
    })
      .then(result => {this.setState({ pokemon: result.data.pokemon }); console.log(result)});
  }

  render() {

    let pokemonCard = null;
    if (this.state.pokemon.id) {
      pokemonCard = (
        <Card>
          <CardBody>
            <CardTitle tag="h2">{this.state.pokemon.name}</CardTitle>
          </CardBody>
          <img width="50%" src={this.state.pokemon.image} alt={this.state.pokemon.name} style={{alignSelf: 'center'}} />
          <CardBody>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
      );
    }

    return (
      <div>
        {pokemonCard}
      </div>
    );
  }
}

export default PokemonStats;