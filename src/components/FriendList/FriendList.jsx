import React from 'react';
import { Link } from 'react-router-dom';

//img
import backIcon from '../Utility/img/back.svg';

export default function FriendList() {
    return (
        <div className="friendlist">
            <nav>
                <Link to="/home">
                <img src={backIcon} alt="back"/>
                </Link>
                <p>Friend List</p>
            </nav>

            <header>Users Friend</header>

            <section className="friended-user">
                <div>
                    <p>Peter</p>
                    <button>Unfriend</button>
                </div>
            </section>
            <section className="friended-user">
                <div>
                    <p>Norman</p>
                    <button>Unfriend</button>
                </div>
            </section>

        </div>
        
    )
}