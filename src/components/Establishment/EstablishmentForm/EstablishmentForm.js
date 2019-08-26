import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import States from '../../UI/States/States';
import Autocomplete from 'react-google-autocomplete';

const establishmentForm = (props) => {
    return(
        <Form onSubmit={props.submit}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Autocomplete
                        name="name"
                        className="form-control"
                        onPlaceSelected={(place) => {
                            props.selected(place)
                        }}
                        onChange={props.changed}
                        types={['establishment']}
                        fields={['address_components', 'name', 'place_id', 'formatted_address']}
                        componentRestrictions={{country: "us"}}
                        value={props.establishment.name}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" value={props.establishment.website} name="website" onChange={props.changed}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={props.establishment.phone} name="phone" onChange={props.changed}/>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={props.establishment.streetAddress} name="streetAddress" onChange={props.changed}/>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={props.establishment.city} name="city" onChange={props.changed}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" value={props.establishment.state} name="state" onChange={props.changed}>
                        <option>Choose a state...</option>
                        <States/>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control value={props.establishment.zipcode} name="zipcode" onChange={props.changed}/>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridUid">
                <Form.Label>UID</Form.Label>
                <Form.Control value={props.establishment.uid} name="uid" onChange={props.changed}/>
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-5">
                Submit
            </Button>
        </Form>
    );
};

export default establishmentForm;