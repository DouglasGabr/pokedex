import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Query } from 'react-apollo';
import ReactLoading from 'react-loading';
import gql from "graphql-tag";

const QUERY_POKEMONS = gql`
{
  pokemons(first: -1) {
    id
    name
    image
  }
}
`;

const PokemonsList = ({ listCaptured, capturedPokemons = [], history, onPokemonCaptured }) => {
  return (
    <Query query={QUERY_POKEMONS}>
      {
        ({ loading, error, data }) => {
          if (loading) return <ReactLoading className="mx-auto mt-5" width={125} type="spinningBubbles" color="green" />;
          if (error) return `Error! ${error.message}`;
          return <ListGroup>
            {data.pokemons.filter(p => {
              if (listCaptured) {
                return capturedPokemons.includes(p.id);
              }
              return true;
            }).map(p => {
              const { id, name, image } = p;
              return (
                <ListGroupItem style={{ cursor: 'pointer' }} onClick={() => history.push('/pokemons/' + id)} key={id}>
                  <span>{name}</span>
                  <FormControlLabel
                    className="float-right ml-3"
                    control={
                      <Switch
                        color="primary"
                        checked={capturedPokemons.includes(id)}
                        onClick={event => {
                          event.stopPropagation();
                          onPokemonCaptured(id);
                        }}
                      />
                    }
                    label="Captured"
                  />
                  <img alt={name} className="float-right" height='40px' src={image} />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        }}
    </Query>
  );
};

export default withRouter(PokemonsList);