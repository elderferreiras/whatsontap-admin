import React, {Component} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {listEstablishments} from "../../graphql/queries";
import {Button, Row, Col, Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

class Establishments extends Component {
    state = {
        establishments: [],
        nextToken: null,
        search: ''
    };

    componentDidMount() {
        this.listEstablishments();
    }

    nextHandler = () => {
       this.listEstablishments();
    };

    listEstablishments = () => {
        let variables = {limit: 10};

        if (this.state.nextToken) {
            variables.nextToken = this.state.nextToken;
        }

        if(this.state.search.length) {
            variables.uid = this.state.search;
        }

        API.graphql(graphqlOperation(listEstablishments, variables)).then(res => {
            this.setState({
                establishments: res.data.listEstablishments.items,
                nextToken: res.data.listEstablishments.nextToken
            });
        });
    };

    searchEstablishmentHandler = (place) => {
        this.setState({search: place.place_id, nextToken: null});
        this.listEstablishments();
    };

    searchChangedHandler = (event) => {
        if ( ! event.target.value.length) {
            this.setState({search: null});
            this.listEstablishments();
        }
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

                    <Row className="mb-2">
                        <Col md="12">
                            <Autocomplete
                                name="search"
                                className="form-control"
                                onPlaceSelected={(place) => {
                                    this.searchEstablishmentHandler(place)
                                }}
                                onChange={this.searchChangedHandler}
                                types={['establishment']}
                                fields={['place_id']}
                                componentRestrictions={{country: "us"}}
                                style={{cursor:'pointer'}}
                            />
                            </Col>
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
                                                to={"/establishments/show/" + establishment.uid}>{establishment.name}</Link>
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