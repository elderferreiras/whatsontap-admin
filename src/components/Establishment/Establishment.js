import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

class Establishment extends Component {
    render() {
        return (
            <Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/establishments">Establishments</Link>
                    </li>
                    <li className="breadcrumb-item active">Create Establishment</li>
                </ol>
                <h1>Create Establishment</h1>
                <hr/>

                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control type="text" placeholder="Street Address" />
                    </Form.Group>

                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Fragment>
        );
    }
}

export default Establishment;