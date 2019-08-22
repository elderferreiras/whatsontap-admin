import React from 'react';

import { Link } from "react-router-dom";

const sidebar = () => {
    return (
        <ul className="sidebar navbar-nav">
            <li className="nav-item">

                <Link className="nav-link" to="/establishments">
                    <i className="fas fa-fw fa-table"/>
                    <span>Establishments</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/beers">
                    <i className="fas fa-fw fa-beer"/>
                    <span>Beers</span></Link>
            </li>
        </ul>
    );
};

export default sidebar;