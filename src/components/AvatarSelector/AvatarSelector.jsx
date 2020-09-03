import React from 'react';
import bulbasaur from './img/bulbasaur.png';
import charmander from './img/charmander.png';
import pikachu from './img/pikachu.png';
import raichu from './img/raichu.png';
import squirtle from './img/squirtle.png';
import togepi from './img/togepi.png';


import { Link } from 'react-router-dom';


export default function Avatar() {

    return (
        <>
            <header>
                <p>Choose your avatar</p>
            </header>
            <img src={bulbasaur} alt="avatar" style={{width: "50px"}} onClick/>
            <img src={charmander} alt="avatar" style={{width: "50px"}}/>
            <img src={pikachu} alt="avatar" style={{width: "50px"}}/>
            <img src={raichu} alt="avatar" style={{width: "50px"}}/>
            <img src={squirtle} alt="avatar" style={{width: "50px"}}/>
            <img src={togepi} alt="avatar" style={{width: "50px"}}/>

            <Link to='/home'>
                <button>Start</button>
            </Link>

        </>
    )
}