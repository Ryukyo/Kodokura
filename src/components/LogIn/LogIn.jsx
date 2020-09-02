import React from 'react';
import {
    Link,
  } from 'react-router-dom'

export default function LogIn() {

    return (
        <>
            <header>Login</header>
            <input type="text" placeholder="Email address / username"/>
            <input type="text" placeholder="Password"/>
            <Link to="/home">
                <button>Login</button>
            </Link>
            <Link to="/">
                <button>Go back</button>
            </Link>
        </>
    )
}