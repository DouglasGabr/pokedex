import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from "react-router-dom";

const PokemonsList = ({ pokemons, history }) => {
  return (
    <ListGroup>
      {pokemons.map(p => {
        const { id, name, image } = p;
        return (
          <ListGroupItem onClick={() => history.push('/pokemons/stats/' + id)} key={id}>
            <span>{name}</span>
            <img alt={name} className="float-right" height='40px' src={image} />
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default withRouter(PokemonsList);