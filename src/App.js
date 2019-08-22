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
                                <Route path="/establishments/" component={Establishments} />
                                <Route path="/beers/" component={Beers} />
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
