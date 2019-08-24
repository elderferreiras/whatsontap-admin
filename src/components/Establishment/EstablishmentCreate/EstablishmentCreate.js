import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import EstablishmentForm from '../EstablishmentForm/EstablishmentForm';
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from '../../../graphql/mutations';
import AddressSelector from '../../../helpers/addressSelector';

class EstablishmentCreate extends Component {
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

    addressSelectHandler = (place) => {
        const extracted = AddressSelector(place);

        const establishment = {...this.state.establishment};

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

        API.graphql(graphqlOperation(mutations.createEstablishment, {input: this.state.establishment})).then(res => {
            this.props.history.push({
                pathname: '/establishments/show/' + res.data.createEstablishment.id
            });
        });
    };

    render() {
        return (
            <Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/establishments">Establishments</Link>
                    </li>
                    <li className="breadcrumb-item active">Create Establishment</li>
                </ol>
                <h1>Create Establishment</h1>

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

export default EstablishmentCreate;