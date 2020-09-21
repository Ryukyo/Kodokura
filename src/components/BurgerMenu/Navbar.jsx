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
import america from "../Profile/Flags/american_flag.png";
import japan from "../Profile/Flags/japanese_flag.png";
import france from "../Profile/Flags/french_flag.png";
import germany from "../Profile/Flags/german_flag.png";
import spain from "../Profile/Flags/spanish_flag.png";

export default function Navbar({ navbar }) {


    const [myAvatar, setMyAvatar] = useState("");
    const [username, setUsername] = useState("");
    const [lang, setLang] = useState("");

    const currentUser = getCurrentAuthUser();

    async function getData() {
        const user = await getUser(currentUser.email);
        let avatar = user.avatar_url;
        let name = user.name;
        let lang = user.lang;
        setMyAvatar(avatar);
        setUsername(name);
        setLang(lang);
    };
    
    useEffect(() => {
        getData();
    }, []);

    function getFlag() {
        if (lang === 'en') {
            return america;
        } else if (lang === 'es') {
            return spain;
        } else if (lang === 'fr') {
            return france;
        } else if (lang === 'de') {
            return germany;
        } else if (lang === 'ja') {
            return japan;
        };
    };

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
                <li className="lang-area">
                    <img src={getFlag()} alt="flag" className="lang-pic"/>
                    <p>Speaking language</p>
                </li>
            </ul>

        </aside>
    )
}