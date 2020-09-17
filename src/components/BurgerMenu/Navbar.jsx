import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AvatarM from "../Canvas3D/AvatarM";
import axios from 'axios';
import { auth } from "../../services/firebase";


//img
import usernameIcon from '../Utility/img/user.svg'
import blockIcon from '../Utility/img/error.svg'

export default function Navbar({ navbar }) {


    const user = auth().currentUser;
    const [myAvatar, setMyAvatar] = useState("");
    const [username, setUsername] = useState("");


    async function getData() {
        let req = await axios.get(`/users/${user.email}`);
        let data = req.data;
        let avatar = data.avatar_url;
        let username = data.name;
        // console.log('profile ', data)
        // console.log('answer music  ', data.answers.music)
        // console.log(avatar);
        console.log(data)
        setMyAvatar(avatar);
        setUsername(username);
        return myAvatar;
    }
    
    getData();

    return (
        <aside className={navbar}>
            <header>Account Setting</header>

            <h3>Hi {username}!</h3>

            <section className="profile-pic">
                {myAvatar ? <AvatarM avatar={myAvatar} /> : <div />}
            </section>

            <ul>
                <li><Link to="/profile" className="text-link">
                    <img src={usernameIcon} alt="user-icon"/>
                    <p>Profile</p>
                    </Link></li>

                <li><Link to="/blocklist" className="text-link">
                    <img src={blockIcon} alt="block-icon"/>
                    <p>Block List</p>
                </Link></li>
                {/* <li>Language</li> */}
            </ul>


            <footer>Log out</footer>

        </aside>
    )
}