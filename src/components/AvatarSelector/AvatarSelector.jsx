import React from 'react';
import bulbasaur from './img/bulbasaur.png';
import charmander from './img/charmander.png';
import pikachu from './img/pikachu.png';
import raichu from './img/raichu.png';
import squirtle from './img/squirtle.png';
import togepi from './img/togepi.png';
import axios from 'axios';

import { auth } from "../../services/firebase";
import { Link } from 'react-router-dom';


export default function Avatar() {

    const user = auth().currentUser;
    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        console.log(data)
        return id;
    };

    async function updateAvatar(avatar) {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, {'avatar_url': avatar});
    };

    return (
        <>
            <header>
                <p>Choose your avatar</p>
            </header>
            <img src={bulbasaur} alt="avatar" style={{width: "50px"}} onClick={() => updateAvatar(bulbasaur)}/>
            <img src={charmander} alt="avatar" style={{width: "50px"}} onClick={() => updateAvatar(charmander)}/>
            <img src={pikachu} alt="avatar" style={{width: "50px"}} onClick={() => updateAvatar(pikachu)}/>
            <img src={raichu} alt="avatar" style={{width: "50px"}} onClick={() => updateAvatar(raichu)}/>
            <img src={squirtle} alt="avatar" style={{width: "50px"}} onClick={() => updateAvatar(squirtle)}/>
            <img src={togepi} alt="avatar" style={{width: "50px"}} onClick={() => updateAvatar(togepi)}/>

            <Link to='/home'>
                <button>Start</button>
            </Link>

        </>
    )
}