import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import axios from 'axios';

export default function TvShowsCard() {

    const user = auth().currentUser;
    const [tvshows, setShows] = useState();

    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        if (tvshows === undefined) {
            setShows(data.answers)
        }
        return id;
    };
    getUserId();

    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, { answers: tvshows });
    };

    async function checkBox(i) {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        tvshows.tvshows[i] = !data.answers.tvshows[i];
    };

    function renderCheckBox(...category) {
        if (tvshows) {
            return tvshows.tvshows.map((e, i) => {
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
            <h3> What kind of TV Shows do you like? </h3>

            {renderCheckBox('Comedy', 'Drama', 'Thriller', 'Horror', 'Romantic', 'Action', 'Sci-fi', 'Fantasy', 'Animation', 'Documentary')}

            <Link to="/interestsmenu">
                <button onClick={() => {
                    updateAnswers();
                }}>Done!</button>
            </Link>
        </>
    )
}
