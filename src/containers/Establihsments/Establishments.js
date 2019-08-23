import React, {Component} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {listEstablishments} from "../../graphql/queries";
import {Button, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";

class Establishments extends Component {
    state = {
        establishments: [],
        updated: new Date()
    };

    componentDidMount() {
        this.listEstablishments().then(res => {
            this.setState({establishments: res.data.listEstablishments.items});
        });
    }

    listEstablishments = async () => {
        return API.graphql(graphqlOperation(listEstablishments));
    };

    render() {
        return (
            <div className="card mb-3">
                <div className="card-header">
                    <i className="fas fa-table"/> Establishments
                </div>
                <div className="card-body">
                    <Row className="mb-2">
                        <Col>
                        <Link to="/establishments/create">
                            <Button variant="light">Create Establishment</Button>
                        </Link>
                        </Col>
                    </Row>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Establishment</th>
                                <th>Phone</th>
                                <th>Website</th>
                                <th>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.establishments.map(establishment => {
                                    return (
                                        <tr key={establishment.id}>
                                            <td><Link
                                                to={"/establishments/" + establishment.id}>{establishment.name}</Link>
                                            </td>
                                            <td>{establishment.phone}</td>
                                            <td>{establishment.website}</td>
                                            <td>{establishment.streetAddress}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Establishments;