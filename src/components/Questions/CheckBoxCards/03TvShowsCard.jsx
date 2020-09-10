import React from 'react';
import { Link } from "react-router-dom";


export default function TvShowsCard() {



    return (
        <>
            <h3> What kind of TV-Shows do you like? </h3>
            <input type="checkbox" value={true}>Comedy</input>
            <input type="checkbox" value={true}>Drama</input>
            <input type="checkbox" value={true}>Thriller</input>
            <input type="checkbox" value={true}>Horror</input>
            <input type="checkbox" value={true}>Action</input>
            <input type="checkbox" value={true}>Sci-Fi</input>
            <input type="checkbox" value={true}>Fantasy</input>
            <input type="checkbox" value={true}>Animation</input>
            <input type="checkbox" value={true}>Romantic</input>
            <input type="checkbox" value={true}>Documentary</input>
            <Link to="/moviescard">
                <button>Previous</button>
            </Link>
            <Link to="/bookscard">
                <button>Next</button>
            </Link>
        </>
    )
}