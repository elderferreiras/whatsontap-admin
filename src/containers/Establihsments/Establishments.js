import React, {Component} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {listEstablishments} from "../../graphql/queries";
import {Button, Row, Col, Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom";

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
        let variables = {limit: 20};

        if (this.state.nextToken) {
            variables.nextToken = this.state.nextToken;
        }

        if(this.state.search.length) {
            variables.filter = { name: { contains: this.state.search} };
        }

        API.graphql(graphqlOperation(listEstablishments, variables)).then(res => {
            this.setState({
                establishments: res.data.listEstablishments.items,
                nextToken: res.data.listEstablishments.nextToken
            });
        });
    };

    searchHandler = (event) => {
        this.setState({nextToken: null},  () => {
            this.listEstablishments();
        });
    };

    searchChange = (event) => {
       this.setState({search: event.target.value});
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
                        <Col md="10" sm="8">
                            <input type="text" name="search" value={this.state.search} onChange={this.searchChange} className="form-control" placeholder="Search..."/>
                        </Col>
                        <Col md="2" sm="4">
                            <Button className="col-12" onClick={this.searchHandler}>Go!</Button>
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