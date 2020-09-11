import React from 'react';
import logo from './img/logo.png';
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
                <h1><img className="logo" src={logo} alt=""/></h1>
                <div class="custom-shape-divider-top-1599705101">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fill-opacity="1" d="M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,218.7C672,245,768,267,864,277.3C960,288,1056,288,1152,266.7C1248,245,1344,203,1392,181.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
                </div>
            </header>

            <Link to="/signup">
                <button>Create Account</button>
            </Link>

            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    )
}    
