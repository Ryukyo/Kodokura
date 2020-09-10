import React from 'react';
import { Link } from "react-router-dom";


export default function FoodsCard() {



    return (
        <>
            <h3> What kind of foods do you like? </h3>
            <input type="checkbox" value={true}>Japanese cuissine</input>
            <input type="checkbox" value={true}>Chinese cuissine</input>
            <input type="checkbox" value={true}>Vietnamese cuissine</input>
            <input type="checkbox" value={true}>Mexican cuissine</input>
            <input type="checkbox" value={true}>French cuissine</input>
            <input type="checkbox" value={true}>Mediterranean cuissine</input>
            <input type="checkbox" value={true}>Desserts</input>
            <input type="checkbox" value={true}>Fast food</input>

            <Link to="/sportscard">
                <button>Previous</button>
            </Link>
            <Link to="/avatar">
                <button>Finish</button>
            </Link>
        </>
    )
}