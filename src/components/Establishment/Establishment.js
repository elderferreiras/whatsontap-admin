import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {getEstablishment} from '../../graphql/queries';
import {API, graphqlOperation} from "aws-amplify";
import {Button, ButtonToolbar, Col, Row} from "react-bootstrap";
import {createBeer, deleteBeer, deleteEstablishment, updateBeer} from "../../graphql/mutations";
import Beers from "../Beers/Beers";
import BeerCreate from "../Beer/BeerCreate/BeerCreate";
import EstablishmentShow from "./EstablishmentShow/EstablishmentShow";

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
            uid: '',
            beers: {
                items: []
            }
        },
        modalShow: false,
        modalLoading: false,
        beerId: null
    };

    componentDidMount() {
       this.getEstablishment();
    }

    getEstablishment = () => {
        API.graphql(graphqlOperation(getEstablishment, {uid: this.props.match.params.id})).then(res => {
            this.setState({establishment: res.data.getEstablishment});
        });
    };

    deleteHandler = () => {
        const result = window.confirm("Are you sure?");

        if (result === true) {
            API.graphql(graphqlOperation(deleteEstablishment, {input: {uid: this.state.establishment.uid}})).then(res => {
                this.props.history.push({
                    pathname: '/establishments'
                });
            });
        }
    };

    openModalHandler = (event, id) => {
        this.setState({modalShow: true, beerId: id});
    };

    closeModalHandler = () => {
        this.setState({modalShow: false});
    };

    saveBeerHandler = () => {
        this.setState({modalLoading: true});

        const elements = document.querySelector('#beer-form').elements;

        let obj = {};
        for (let i = 0; i < elements.length; i++) {
            const item = elements.item(i);
            if (item.value.length) {
                obj[item.name] = item.value;
            }
        }

        if(obj.name && obj.description && this.state.establishment.id) {
            obj['beerEstablishmentId'] = this.state.establishment.id;

            let query = createBeer;
            if (obj.id && obj.id.length) {
                query = updateBeer;
            }

            API.graphql(graphqlOperation(query, {input: obj})).then(res => {
                this.setState({modalLoading: false, modalShow: false, beerId: null});
            }).catch(err => {
                this.setState({modalLoading: false, modalShow: false, beerId: null});
            }).finally(res => {
                this.getEstablishment();
            });
        }
    };

    deleteBeerHandler = (id) => {
        const result = window.confirm("Are you sure?");

        if (result === true && id.length) {
            API.graphql(graphqlOperation(deleteBeer, {input: {id: id}})).then(res => {
                this.getEstablishment();
            });
        }
    };

    render() {
        return (
            <Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/establishments">Establishments</Link>
                    </li>
                    <li className="breadcrumb-item active">Show Establishment</li>
                </ol>

                <h1>{this.state.establishment.name}</h1>
                <hr/>

                <EstablishmentShow establishment={this.state.establishment}/>

                <ButtonToolbar>
                    <Row className="mb-2">
                        <Col>
                            <Link to={"/establishments/edit/" + this.state.establishment.uid}>
                                <Button variant="light">Edit</Button>
                            </Link>
                        </Col>

                        <Col>
                            <Button variant="danger" onClick={this.deleteHandler}>Delete</Button>
                        </Col>
                    </Row>
                </ButtonToolbar>


                <h1>Beers</h1>
                <hr/>

                <Beers beers={this.state.establishment.beers.items}
                       clicked={this.openModalHandler}
                       delete={this.deleteBeerHandler}/>

                <BeerCreate
                    show={this.state.modalShow}
                    loading={this.state.modalLoading}
                    hide={this.closeModalHandler}
                    save={this.saveBeerHandler}
                    beerId={this.state.beerId}
                />

                <Button variant="light" onClick={this.openModalHandler} className="mt-3 mb-3">
                    Create Beer
                </Button>
            </Fragment>
        );
    }
}

export default Establishment;