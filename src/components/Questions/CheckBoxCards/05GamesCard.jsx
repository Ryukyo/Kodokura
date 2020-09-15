import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import axios from 'axios';

//img
import backIcon from '../../Utility/img/back.svg';

export default function GamesCard() {

    const user = auth().currentUser;
    const [games, setGames] = useState();

    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        if (games === undefined) {
            setGames(data.answers)
        }
        return id;
    };
    getUserId();

    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, { answers: games });
    };

    async function checkBox(i) {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        games.games[i] = !data.answers.games[i];
    };

    function renderCheckBox(...category) {
        if (games) {
            return games.games.map((e, i) => {
                return (
                    <div>
                        {
                            e ?
                                <>
                                    <label for="fname">{category[i]}</label>
                                    <input type="checkbox" defaultChecked={e} onChange={() => {

                                        checkBox(i)
                                    }} />
                                </>
                                :
                                <>
                                    <label for="fname">{category[i]}</label>
                                    <input type="checkbox" defaultChecked={e} onChange={() => {
                                        checkBox(i)
                                    }} />
                                </>
                        }
                    </div>
                )
            });
        };
    };

    return (
        <>
            <div className="interest-cards">
                <nav>
                <Link to="/interestsmenu">
                <img src={backIcon} alt="back"/>
                </Link>
                <p>Games</p>
            </nav>


            <h3> What kind of Games do you like? </h3>

            <section className="selection-box">
                {renderCheckBox('FPS', 'RPG', 'Survival-horror', 'Action', 'Puzzle', 'Simulation', 'Strategy', 'Sports', 'Adventure', 'Multiplayer')}
            </section>

            <Link to="/interestsmenu">
                <button
                onClick={() => {
                updateAnswers();
                }}
                >
                Done!
                </button>
            </Link>
            </div>
        </>
    )
}
