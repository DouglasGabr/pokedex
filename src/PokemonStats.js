import React from "react";
import gql from "graphql-tag";
import ReactLoading from 'react-loading';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge,
  Row,
  Col,
  Table
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

const POKEMON_QUERY = gql`
query pokemon($id: String!) {
  pokemon(id: $id) {
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
}`;

const Evolutions = withRouter(({ evolutions, history }) => (
  <CardBody>
    <h3>Evolutions</h3>
    <Row>
      {evolutions.map(e => (
        <Col md="6" key={e.id}>
          <Card style={{ cursor: 'pointer' }} onClick={() => history.push('/pokemons/stats/' + e.id)} className="h-100">
            <CardBody>
              <CardTitle>{e.name}</CardTitle>
            </CardBody>
            <img className="my-3" width="75%" src={e.image} alt={e.name} style={{ alignSelf: 'center' }} />
          </Card>
        </Col>
      ))}
    </Row>
  </CardBody>
));

const Attacks = ({ attacks }) => (
  <CardBody>
    <h3>Attacks</h3>
    <Row>
      <Col md="6">
        <h5>Fast Attacks<small className="float-right">Damage</small></h5>
        <ListGroup>
          {attacks.fast.map((fa, idx) => (
            <ListGroupItem key={idx}>
              <span className="float-right">{fa.damage}</span>
              <span>{fa.name}</span><br />
              <Badge pill>{fa.type}</Badge>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
      <Col className="mt-md-0 mt-3" md="6">
        <h5>Special Attacks<small className="float-right">Damage</small></h5>
        <ListGroup>
          {attacks.special.map((sa, idx) => (
            <ListGroupItem key={idx}>
              <span className="float-right">{sa.damage}</span>
              <span>{sa.name}</span><br />
              <Badge pill>{sa.type}</Badge>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    </Row>
  </CardBody>
);

const StatsRow = ({ title, value }) => (
  <tr>
    <th>{title}</th>
    <td>{value}</td>
  </tr>
);

const Stats = ({ pokemon }) => {

  let evoReq = null;
  if (pokemon.evolutionRequirements !== null) {
    evoReq = <StatsRow title="Evolution Requirements" value={`${pokemon.evolutionRequirements.amount} ${pokemon.evolutionRequirements.name}`} />
  }

  return (
    <CardBody>
      <h3>Stats</h3>
      <Table>
        <tbody>
          <StatsRow title="Max Combat Points" value={pokemon.maxCP} />
          <StatsRow title="Max Health Points" value={pokemon.maxHP} />
          <StatsRow title="Types" value={pokemon.types.join(', ')} />
          <StatsRow title="Resistant" value={pokemon.resistant.join(', ')} />
          <StatsRow title="Weaknesses" value={pokemon.weaknesses.join(', ')} />
          <StatsRow title="Height" value={`${pokemon.height.minimum} - ${pokemon.height.maximum}`} />
          <StatsRow title="Weight" value={`${pokemon.weight.minimum} - ${pokemon.weight.maximum}`} />
          <StatsRow title="Flee Rate" value={pokemon.fleeRate} />
          {evoReq}
        </tbody>
      </Table>
    </CardBody>
  );
}

const PokemonStats = ({ id, isCaptured = false }) => {
  return (
    <Query
      query={POKEMON_QUERY}
      variables={{ id }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <ReactLoading className="mx-auto mt-5" width={125} type="spinningBubbles" color="green" />
          );
        }
        if (error) return `Error!: ${error}`;

        const pokemon = data.pokemon;
        let evolutions = null;
        if (pokemon.evolutions !== null) {
          evolutions = <Evolutions evolutions={pokemon.evolutions} />;
        }

        return (
          <Card>
            <CardBody>
              <CardTitle tag="h2">{pokemon.name} <Badge style={{ fontSize: '1rem' }} pill>{pokemon.classification}</Badge>
                <br />
                {isCaptured ? <Badge color="success" pill>Captured</Badge> : null}
              </CardTitle>
            </CardBody>
            <img className="my-3" width="50%" src={pokemon.image} alt={pokemon.name} style={{ alignSelf: 'center' }} />
            <Stats pokemon={pokemon} />
            <Attacks attacks={pokemon.attacks} />
            {evolutions}
          </Card>
        );
      }}
    </Query>
  );
}

export default PokemonStats;