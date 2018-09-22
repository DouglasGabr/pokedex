import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PokemonsList = ({ pokemons, history, onPokemonCaptured }) => {
  return (
    <ListGroup>
      {pokemons.map(p => {
        const { id, name, image } = p;
        return (
          <ListGroupItem style={{ cursor: 'pointer' }} onClick={() => history.push('/pokemons/stats/' + id)} key={id}>
            <span>{name}</span>
            <FormControlLabel
              className="float-right ml-3"
              control={
                <Switch
                  color="primary"
                  checked={p.isCaptured}
                  onClick={event => {
                    event.stopPropagation();
                    onPokemonCaptured(p.id);
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
  );
};

export default withRouter(PokemonsList);