import React, {Component} from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom"

import Sidebar from './components/UI/Sidebar/Sidebar';
import Navbar from './components/UI/Nav/Nav';
import Footer from './components/UI/Footer/Footer';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {withAuthenticator} from "aws-amplify-react";
import Establishments from "./containers/Establihsments/Establishments";
import Beers from "./containers/Beers/Beers";
import EstablishmentCreate from "./components/Establishment/EstablishmentCreate/EstablishmentCreate";
import Establishment from "./components/Establishment/Establishment";
import EstablishmentEdit from "./components/Establishment/EstablishmentEdit/EstablishmentEdit";
import EstablishmentImport from "./components/Establishment/EstablishmentImport/EstablishmentImport";

Amplify.configure(aws_exports);

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div id="wrapper">
                        <Sidebar/>
                        <div id="content-wrapper">
                            <div className="container-fluid">
                                <Route path="/" exact component={Establishments} />
                                <Route path="/establishments/" component={Establishments} exact/>
                                <Route path="/establishments/create" component={EstablishmentCreate} exact/>
                                <Route path="/establishments/show/:id" component={Establishment} exact/>
                                <Route path="/establishments/edit/:id" component={EstablishmentEdit} exact/>
                                <Route path="/establishments/import" component={EstablishmentImport} exact/>
                                <Route path="/beers/" component={Beers} exact/>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withAuthenticator(App);
