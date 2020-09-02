import React from 'react';
import avatar from './panko.png'


export default function Avatar() {

    return (
        <>
            <header>
                <p>Choose your avatar</p>
            </header>
            <img src={avatar} alt="avatar" style={{width: "50px"}}/>
            <img src={avatar} alt="avatar" style={{width: "50px"}}/>
            <img src={avatar} alt="avatar" style={{width: "50px"}}/>
            <img src={avatar} alt="avatar" style={{width: "50px"}}/>
            <img src={avatar} alt="avatar" style={{width: "50px"}}/>
            <img src={avatar} alt="avatar" style={{width: "50px"}}/>

            <button>Start</button>

        </>
    )
}