import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import EstablishmentForm from '../EstablishmentForm/EstablishmentForm';
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from '../../../graphql/mutations';
import AddressSelector from '../../../helpers/addressSelector';
import uuidv4 from 'uuid/v4';

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

        const establishment = {...this.state.establishment};
        const input = {};

        for (let i in establishment) {
            if(establishment.hasOwnProperty(i)) {
                if(establishment[i].length) {
                    input[i] = establishment[i];
                }
            }
        }

        input['id'] = uuidv4();

        API.graphql(graphqlOperation(mutations.createEstablishment, {input: input})).then(res => {
            this.props.history.push({
                pathname: '/establishments/show/' + res.data.createEstablishment.uid
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