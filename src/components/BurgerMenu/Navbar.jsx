import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AvatarM from "../Canvas3D/AvatarM";
import { auth } from "../../services/firebase";

import {
    getCurrentAuthUser,
    getUser,
} from "../../helpers/backend";


//img
import usernameIcon from '../Utility/img/user.svg'
import blockIcon from '../Utility/img/error.svg'

export default function Navbar({ navbar }) {


    const [myAvatar, setMyAvatar] = useState("");
    const [username, setUsername] = useState("");

    const currentUser = getCurrentAuthUser();

    async function getData() {
        const user = await getUser(currentUser.email);
        let avatar = user.avatar_url;
        let name = user.name;
        setMyAvatar(avatar);
        setUsername(name)
    }
    
    useEffect(() => {
        getData();
    }, []);

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