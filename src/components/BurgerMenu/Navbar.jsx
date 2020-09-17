import React from 'react';
import { Link } from 'react-router-dom';

//img
import usernameIcon from '../Utility/img/user.svg'
import blockIcon from '../Utility/img/error.svg'

export default function Navbar({ navbar }) {
    return (
        <aside className={navbar}>
            <header>Account Setting</header>

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