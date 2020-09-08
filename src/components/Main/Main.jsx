import React from 'react';
import logo from './kodokura-logo.png';
import Clouds from '../Clouds/Clouds';

import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';

export default function Main() {

    return (
        <div className="Main">
            <header className="main-header">
                <Clouds/>
                <h1><img className="logo" src={logo} alt=""/></h1>
            </header>
            <Clouds/>
            <div className="underclouds">
            <Link to="/signup">
                <button>Create Account</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
            </div>
        </div>
    )
}    
