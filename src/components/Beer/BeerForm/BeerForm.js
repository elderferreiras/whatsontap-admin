import React from 'react';
import {Col, Form} from "react-bootstrap";
import {API, graphqlOperation} from "aws-amplify";
import {getBeer} from "../../../graphql/queries";

const beerForm = (props) => {
    if (props.beerId) {
        API.graphql(graphqlOperation(getBeer, {id: props.beerId})).then(res => {
            console.log(res);
            const beer = res.data.getBeer;
            for (let i in beer) {
                if (beer.hasOwnProperty(i)) {
                    const el = document.querySelector(".form-control[name=" + i + "]");

                    if (el) {
                        el.value = beer[i];
                    }
                }
            }
        });
    }

    return (
        <Form id="beer-form">
            <input type="hidden" name="id" className="form-control"/>

            <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" placeholder="Enter beer name"/>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridAbv">
                    <Form.Label>ABV</Form.Label>
                    <Form.Control name="abv" type="number" placeholder="Enter ABV"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridIbu">
                    <Form.Label>IBU</Form.Label>
                    <Form.Control name="ibu" type="number" placeholder="Enter IBU"/>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" as="textarea" rows="3"/>
            </Form.Group>
        </Form>
    );
};

export default beerForm;