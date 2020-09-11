import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../../../services/firebase";


export default function InterestsMenu() {

    const user = auth().currentUser;
    const [hasAvatar, setHasAvatar] = useState(getAvatar());

    async function getAvatar() {
        let req = await axios.get(`/users/${user.email}`);
        let data = req.data;
        let avatar = data.avatar_url;
        console.log('urlll', data.avatar_url);
        setHasAvatar(avatar);
        return avatar
    }
    
    useEffect(() => {
        getAvatar();
    });

    console.log(hasAvatar)


    return (
        <>
            <h3> Interests </h3>
            <div>
                <Link to="/musiccard">
                    <button>Music</button>
                </Link>
            </div>
            <div>
                <Link to="/moviescard">
                    <button>Movies</button>
                </Link>
            </div>
            <div>
                <Link to="/tvshowscard">
                    <button>TV Shows</button>
                </Link>
            </div>
            <div>
                <Link to="/bookscard">
                    <button>Books</button>
                </Link>
            </div>
            <div>
                <Link to="/gamescard">
                    <button>Games</button>
                </Link>
            </div>
            <div>
                <Link to="/sportscard">
                    <button>Sports</button>
                </Link>
            </div>
            <div>
                <Link to="/foodscard">
                    <button>Foods</button>
                </Link>
            </div>
            {hasAvatar.length === 0 ?
                <Link to='/avatar'><button>Done!</button></Link> : <Link to='/profile'><button >Done!</button></Link>}
        </>
    )
}










