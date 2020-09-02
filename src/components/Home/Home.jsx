import React from 'react';
import avatar from './nw.png'


export default function Home() {

    return (
        <>
            <header>
                <a href="#"><img src={avatar} alt="avata" style={{width: "50px"}}/></a>
                <h2>Home page</h2>
            </header>

            <button>Find someone to talk to.</button>

        </>
    )
}