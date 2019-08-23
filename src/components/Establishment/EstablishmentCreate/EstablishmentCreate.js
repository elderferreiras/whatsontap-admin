import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import EstablishmentForm from '../EstablishmentForm/EstablishmentForm';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../../../graphql/mutations';
class Establishment extends Component {
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

    addressSelectHandler = (place) => {
        const componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };

        let values = {};

        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                values[addressType] = place.address_components[i][componentForm[addressType]];
            }
        }


        const establishment = {...this.state.establishment};

        establishment.name = place.name;
        establishment.streetAddress = values.street_number + ' ' + values.route;
        establishment.city = values.locality;
        establishment.state = values.administrative_area_level_1;
        establishment.zipcode = values.postal_code;
        establishment.uid = place.place_id;

        this.setState({establishment: establishment});
    };


    establishNameChangeHandler = (event) => {
        const establishment = {...this.state.establishment};
        establishment[event.target.name] = event.target.value;

        this.setState({establishment: establishment});
    };

    submitHandler = async (event) => {
        event.preventDefault();

        const newTodo = await API.graphql(graphqlOperation(mutations.createEstablishment, {input: this.state.establishment}));

        console.log(newTodo);
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

export default Establishment;