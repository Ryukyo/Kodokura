import React from 'react';
import { Link } from "react-router-dom";


export default function GamesCard() {



    return (
        <>
            <h3> What style of games do you like? </h3>
            <input type="checkbox" value={true}>FPS</input>
            <input type="checkbox" value={true}>RPG</input>
            <input type="checkbox" value={true}>Platforms</input>
            <input type="checkbox" value={true}>Survival Horror</input>
            <input type="checkbox" value={true}>Action</input>
            <input type="checkbox" value={true}>Puzzle</input>
            <input type="checkbox" value={true}>Simulation</input>
            <input type="checkbox" value={true}>Strategy</input>
            <input type="checkbox" value={true}>Sports</input>

            <Link to="/bookscard">
                <button>Previous</button>
            </Link>
            <Link to="/sportscard">
                <button>Next</button>
            </Link>
        </>
    )
}