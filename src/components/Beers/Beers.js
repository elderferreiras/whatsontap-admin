import React from 'react';
import {Container, Row} from "react-bootstrap";
import Beer from '../Beer/Beer';

const beers = (props) => {
    const handlerBeers = () => {
        if (props.beers.length > 0) {
            return props.beers.map(beer =>
                <Beer key={beer.id} beer={beer} delete={props.delete} clicked={props.clicked}/>);
        } else {
            return <p>Establishment has no beers.</p>;
        }
    };

    return (
        <Container style={{margin: 0, padding: 0}}>
            <Row>
                {handlerBeers()}
            </Row>
        </Container>
    );
};

export default beers;