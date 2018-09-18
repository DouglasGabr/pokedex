import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const createPokemonListItem = ({ id, name, image }, onClick) => {
  return (
    <ListGroupItem onClick={() => onClick(id)} key={id}>
      <span>{name}</span>
      <img alt={name} className="float-right" height='40px' src={image} />
    </ListGroupItem>
  );
}

const PokemonsList = ({ pokemons, onClick }) => {
  return (
    <ListGroup>
      {pokemons.map(p => createPokemonListItem(p, onClick))}
    </ListGroup>
  );
};

export default PokemonsList;