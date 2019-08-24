import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import EstablishmentForm from '../EstablishmentForm/EstablishmentForm';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../../../graphql/mutations';
import {getEstablishment} from "../../../graphql/queries";
import AddressSelector from '../../../helpers/addressSelector';

class EstablishmentEdit extends Component {
    state = {
        establishment: {
            id: '',
            name: '',
            streetAddress:'',
            city:'',
            state:'',
            zipcode:'',
            phone:'',
            website:'',
            uid: ''
        }
    };

    componentDidMount() {
        API.graphql(graphqlOperation(getEstablishment, {id: this.props.match.params.id})).then(res => {
            const establishment = {...this.state.establishment};

            establishment.id = res.data.getEstablishment.id;
            establishment.name = res.data.getEstablishment.name;
            establishment.streetAddress = res.data.getEstablishment.streetAddress;
            establishment.city = res.data.getEstablishment.city;
            establishment.state = res.data.getEstablishment.state;
            establishment.zipcode = res.data.getEstablishment.zipcode;
            establishment.phone = res.data.getEstablishment.phone;
            establishment.website = res.data.getEstablishment.website;
            establishment.uid = res.data.getEstablishment.uid;

            this.setState({establishment: establishment});
        });
    }

    addressSelectHandler = (place) => {
        const extracted = AddressSelector(place);

        const establishment = {
            ...this.state.establishment
        };

        establishment.name = extracted.name;
        establishment.streetAddress = extracted.streetAddress;
        establishment.city = extracted.city;
        establishment.state = extracted.state;
        establishment.zipcode = extracted.zipcode;
        establishment.uid = extracted.uid;

        this.setState({establishment: establishment});
    };


    establishNameChangeHandler = (event) => {
        const establishment = {...this.state.establishment};
        establishment[event.target.name] = event.target.value;

        this.setState({establishment: establishment});
    };

    submitHandler = (event) => {
        event.preventDefault();

        API.graphql(graphqlOperation(mutations.updateEstablishment, {
            input: this.state.establishment
        })).then(res => {
            if(res.data.updateEstablishment && res.data.updateEstablishment.id) {
                this.props.history.push({
                    pathname: '/establishments/show/' + res.data.updateEstablishment.id
                });
            }
        });


    };

    render() {
        return (
            <Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/establishments">Establishments</Link>
                    </li>
                    <li className="breadcrumb-item active">Edit Establishment</li>
                </ol>
                <h1>Edit Establishment</h1>

                <hr/>

                <EstablishmentForm
                    selected={this.addressSelectHandler}
                    changed={this.establishNameChangeHandler}
                    submit={this.submitHandler}
                    establishment={this.state.establishment}/>
            </Fragment>
        );
    }
}

export default EstablishmentEdit;