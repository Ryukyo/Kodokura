import React from 'react';
import logo from './kodokura-logo.png'

import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';

export default function Main() {

    return (
        <>
            <header>
                <h1>Main | KodoKura</h1>
                <img src={logo} alt=""/>
            </header>
            <Link to="/signup">
                <button>Create Account</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
            
        </>
    )
}    
