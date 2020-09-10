import React from 'react';
import { Link } from "react-router-dom";


export default function SportsCard() {



    return (
        <>
            <h3> What kind of sports do you like? </h3>
            <input type="checkbox" value={true}>Soccer</input>
            <input type="checkbox" value={true}>Football</input>
            <input type="checkbox" value={true}>Basket</input>
            <input type="checkbox" value={true}>Tenis</input>
            <input type="checkbox" value={true}>Ice-hockey</input>
            <input type="checkbox" value={true}>Baseball</input>
            <input type="checkbox" value={true}>Cycling</input>
            <input type="checkbox" value={true}>Yoga</input>
            <input type="checkbox" value={true}>Swimming</input>

            <Link to="/gamescard">
                <button>Previous</button>
            </Link>
            <Link to="/foodscard">
                <button>Next</button>
            </Link>
        </>
    )
}