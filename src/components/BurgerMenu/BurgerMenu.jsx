import React, { useState } from 'react';
import Navbar from './Navbar';

export default function BurgerMenu() {

    const [status, setStatus] = useState('close');
    const [navbar, setNavbar] = useState('close-navbar');

    return (
        <>  
            <div
                className="burger-container"
                status={status}
                onClick={() => {
                    setStatus( status === 'open' ? 'close' : 'open');
                    setNavbar( navbar === 'open-navbar' ? 'close-navbar' : 'open-navbar');
                }}
            >
                <i className={status}></i>
                <i className={status}></i>
                <i className={status}></i>
            </div>
            <Navbar navbar={navbar}/>
        </>
    )
}