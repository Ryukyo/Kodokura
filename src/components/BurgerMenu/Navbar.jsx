import React from 'react';
import { Link } from 'react-router-dom';

//img
import usernameIcon from '../Utility/img/users.svg'

export default function Navbar({ navbar }) {
    return (
        <aside className={navbar}>
            <header>Account Setting</header>

            <ul>
                <li><Link to="/profile" className="text-link"><img src={usernameIcon} alt="user-icon"/>
Profile</Link></li>
                <li><Link to="/friendlist" className="text-link">Friend List</Link></li>
                <li><Link to="/blocklist" className="text-link">Block List</Link></li>
                {/* <li>Language</li> */}
            </ul>


            <footer>Log out</footer>

        </aside>
    )
}