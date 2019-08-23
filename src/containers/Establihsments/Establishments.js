import React, { Component } from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {listEstablishments} from "../../graphql/queries";
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

class Establishments extends Component {
    state = {
        establishments: []
    };

    componentDidMount() {
       this.listEstablishments().then(res => {
           this.setState(res.data.listEstablishments.items);
       });
    }

    listEstablishments = async () => {
       return API.graphql(graphqlOperation(listEstablishments));
    };

    render() {
        return (<div className="card mb-3">
            <div className="card-header">
                <i className="fas fa-table"/>
                Establishments
            </div>
            <div className="card-body">
                <Link to="/establishments/create">
                    <Button variant="light">Create Establishment</Button>
                </Link>
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
                                        <tr>
                                            <td>{establishment.name}</td>
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
            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>);
    }
}

export default Establishments;