import React from 'react';
import {Card, Col, Button, Dropdown} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const beer = (props) => {
    const subtitle = [];

    if (props.beer.abv && props.beer.abv.length) {
        subtitle.push(props.beer.abv + '% ABV');
    }

    if (props.beer.ibu && props.beer.ibu.length > 0) {
        subtitle.push(props.beer.ibu + ' IBU');
    }

    const buttonStyle = {padding:0, backgroundColor: 'transparent', borderColor: 'transparent'};

    return (
        <Col lg="12">
            <Card className="mt-3">
                <Card.Header>
                    <Row>
                        <Col md="auto">
                            <span>{props.beer.name}</span>
                        </Col>
                        <Col md="auto" className="float-right">
                            <Button variant="light" onClick={(event) => props.clicked(event, props.beer.id)} style={{...buttonStyle}}>
                                <i className="fas fa-pencil-alt fa-fw"/>
                            </Button>
                            <Button variant="danger" className="ml-2"
                                    onClick={() => props.delete(props.beer.id)} style={{...buttonStyle, color: '#dc3545'}}>
                                <i className="fas fa-trash-alt fa-fw"/>
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>

                    <Card.Subtitle className="mb-2 text-muted">{subtitle.join(' | ')}</Card.Subtitle>

                    <Card.Text>
                        {props.beer.description}
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default beer;