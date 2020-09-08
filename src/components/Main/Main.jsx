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
            <header>
                <h1 className="main_title">Main | KodoKura</h1>
                <img className="logo" src={logo} alt=""/>
            </header>
            <Link to="/signup">
                <button>Create Account</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Clouds/>
        </div>
    )
}    
