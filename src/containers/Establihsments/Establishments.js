import React, {Component} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {listEstablishments} from "../../graphql/queries";
import {Button, Row, Col, Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom";

class Establishments extends Component {
    state = {
        establishments: [],
        nextToken: null
    };

    componentDidMount() {
        this.listEstablishments();
    }

    nextHandler = () => {
       this.listEstablishments();
    };

    listEstablishments = () => {
        let variables = {limit: 20};

        if (this.state.nextToken) {
            variables.nextToken = this.state.nextToken;
        }

        API.graphql(graphqlOperation(listEstablishments, variables)).then(res => {
            this.setState({
                establishments: res.data.listEstablishments.items,
                nextToken: res.data.listEstablishments.nextToken
            });
        });
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
                        <Link to="/establishments/import">
                            <Button variant="light">Import Establishments</Button>
                        </Link>
                    </Row>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Establishment</th>
                                <th>Phone</th>
                                <th>Website</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.establishments.map(establishment => {
                                    return (
                                        <tr key={establishment.id}>
                                            <td><Link
                                                to={"/establishments/show/" + establishment.id}>{establishment.name}</Link>
                                            </td>
                                            <td>{establishment.phone}</td>
                                            <td>{establishment.website}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <Pagination>
                        <Pagination.Next onClick={this.nextHandler}/>
                    </Pagination>
                </div>
            </div>
        );
    }
}

export default Establishments;