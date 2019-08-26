import React from 'react';
import {Table} from "react-bootstrap";

const establishmentShow = (props) => {
    return (
        <Table striped bordered hover size="sm">
            <tbody>
            <tr>
                <th>UID</th>
                <td>{props.establishment.uid}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{props.establishment.name}</td>
            </tr>
            <tr>
                <th>Street Address</th>
                <td>{props.establishment.streetAddress}</td>
            </tr>
            <tr>
                <th>City</th>
                <td>{props.establishment.city}</td>
            </tr>
            <tr>
                <th>State</th>
                <td>{props.establishment.state}</td>
            </tr>
            <tr>
                <th>Zipcode</th>
                <td>{props.establishment.zipcode}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{props.establishment.phone}</td>
            </tr>
            <tr>
                <th>Website</th>
                <td>{props.establishment.website}</td>
            </tr>
            </tbody>
        </Table>
    );
};

export default establishmentShow;