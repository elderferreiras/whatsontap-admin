import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {getEstablishment} from '../../graphql/queries';
import {Table} from 'react-bootstrap';
import {API, graphqlOperation} from "aws-amplify";

class Establishment extends Component {
    state = {
        establishment: {
            id: '',
            name: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            website: '',
            uid: ''
        }
    };

    componentDidMount() {
        API.graphql(graphqlOperation(getEstablishment, {id: this.props.match.params.id})).then(res => {
            this.setState({establishment: res.data.getEstablishment});
        });
    }

    render() {
        return (
            <Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/establishments">Establishments</Link>
                    </li>
                    <li className="breadcrumb-item active">Show Establishment</li>
                </ol>
                <h1>Show Establishment</h1>

                <hr/>

                <Table striped bordered hover size="sm">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{this.state.establishment.id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{this.state.establishment.name}</td>
                    </tr>
                    <tr>
                        <th>Street Address</th>
                        <td>{this.state.establishment.streetAddress}</td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>{this.state.establishment.city}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{this.state.establishment.state}</td>
                    </tr>
                    <tr>
                        <th>Zipcode</th>
                        <td>{this.state.establishment.zipcode}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{this.state.establishment.phone}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>{this.state.establishment.website}</td>
                    </tr>
                    <tr>
                        <th>Google place ID</th>
                        <td>{this.state.establishment.uid}</td>
                    </tr>
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

export default Establishment;