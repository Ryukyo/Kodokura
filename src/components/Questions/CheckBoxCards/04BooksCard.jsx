import React from 'react';
import { Link } from "react-router-dom";


export default function BooksCard() {



    return (
        <>
            <h3> What style of books do you like? </h3>
            <input type="checkbox" value={true}>Fiction</input>
            <input type="checkbox" value={true}>Non-fiction</input>
            <input type="checkbox" value={true}>Drama</input>
            <input type="checkbox" value={true}>Poetry</input>
            <input type="checkbox" value={true}>Folktale</input>
            <input type="checkbox" value={true}>Mystery</input>
            <input type="checkbox" value={true}>Biography</input>
            <input type="checkbox" value={true}>Romantic</input>
            <input type="checkbox" value={true}>Fantasy</input>
            <Link to="/tvshowscard">
                <button>Previous</button>
            </Link>
            <Link to="/gamescard">
                <button>Next</button>
            </Link>
        </>
    )
}