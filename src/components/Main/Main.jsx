import React from 'react';
import logo from './kodokura-logo.png'

export default function Main() {

    return (
        <>
            <header>
                <h1>Main | KodoKura</h1>
                <img src={logo} alt=""/>
            </header>
            
            <button>Create Account</button>
            <button>Sign In</button>
        </>
    )
}
