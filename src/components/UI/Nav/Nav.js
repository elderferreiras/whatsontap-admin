import React from 'react';
import {Dropdown} from 'react-bootstrap';
import { Auth } from 'aws-amplify';

const nav = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
            <a className="navbar-brand mr-1" href="/">What's on tap? - Admin</a>
            <ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <li className="nav-item dropdown no-arrow">
                    <Dropdown alignRight className="nav-link" id="userDropdown">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <i className="fas fa-user-circle fa-fw"/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item className="dropdown-item" onClick={() => Auth.signOut()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </nav>
    );
};

export default nav;