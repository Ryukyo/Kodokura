import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import axios from 'axios';

export default function MoviesCard() {

    const user = auth().currentUser;
    const [movies, setMovies] = useState();

    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        if (movies === undefined) {
            setMovies(data.answers)
        }
        return id;
    };
    getUserId();

    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, { answers: movies });
    };

    async function checkBox(i) {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        movies.movies[i] = !data.answers.movies[i];
    };

    function renderCheckBox(...category) {
        if (movies) {
            return movies.movies.map((e, i) => {
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
            <h3> What kind of movies do you like? </h3>

            {renderCheckBox('Comedy', 'Drama', 'Thriller', 'Horror', 'Romantic', 'Action', 'Sci-fi', 'Fantasy', 'Animation', 'Documentary')}

            <Link to="/interestsmenu">
                <button onClick={() => {
                    updateAnswers();
                }}>Done!</button>
            </Link>
        </>
    )
}
