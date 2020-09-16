import React from 'react';
import bearImg from './img/BearCube.png';
import birdImg from './img/BirdCube.png';
import bunnyImg from './img/BunnyCube.png';
import catImg from './img/CatCube.png';
import cowImg from './img/CowCube.png';
import deerImg from './img/DeerCube.png';

import axios from 'axios';

import { auth } from "../../services/firebase";
import { Link } from 'react-router-dom';


export default function Avatar() {

    const user = auth().currentUser;
    async function getUserId() {
        let req = await axios.get(`/users/${user}`)
        let data = req.data;
        let id = data.id;
        console.log(data.avatar_url)
        return id;
    };

    async function updateAvatar(avatar) {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, {'avatar_url': avatar});
    };

    return (
        <>
            <div className="avatar-selector">

                <header>
                    <p>Choose your avatar</p>
                </header>
                
                <section className="avatar">
                    <img src={bearImg} alt="avatar" onClick={() => updateAvatar("Bear")}/>
                    <img src={birdImg} alt="avatar" onClick={() => updateAvatar("Bird")}/>
                    <img src={bunnyImg} alt="avatar" onClick={() => updateAvatar("Bunny")}/>
                    <img src={catImg} alt="avatar" onClick={() => updateAvatar("Cat")}/>
                    <img src={cowImg} alt="avatar" onClick={() => updateAvatar("Cow")}/>
                    <img src={deerImg} alt="avatar" onClick={() => updateAvatar("Deer")}/>
                    <button alt="avatar" onClick={() => updateAvatar("Dog")}> </button>
                    <button alt="avatar" onClick={() => updateAvatar("Duck")}> </button>
                    <button alt="avatar" onClick={() => updateAvatar("Fox")}> </button>
                    <button alt="avatar" onClick={() => updateAvatar("Goat")}> </button>
                    <button alt="avatar" onClick={() => updateAvatar("Horse")}> </button>
                    <button alt="avatar" onClick={() => updateAvatar("Lion")}> </button>
                </section>

                <nav className="btn">
                    <Link to='/home'>
                        <button>Start chatting!</button>
                    </Link>
                    
                    <Link to='/profile'>
                        <button>Go to profile</button>
                    </Link>
                </nav>
            </div>
            

        </>
    )
}