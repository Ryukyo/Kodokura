import React, { useState } from 'react';
import axios from 'axios';
import { auth } from "../../services/firebase";
import { Link } from 'react-router-dom'



export default function Questions() {

    const interests = {
        music: [false, false, false, false, false, false, false, false, false, false],
        movies: [false, false, false, false, false, false, false, false, false, false],
        tvshows: [false, false, false, false, false, false, false, false, false, false],
        books: [false, false, false, false, false, false, false, false, false, false],
        games: [false, false, false, false, false, false, false, false, false, false],
        sports: [false, false, false, false, false, false, false, false, false, false],
        foods: [false, false, false, false, false, false, false, false, false, false]
    };

    const user = auth().currentUser;

    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        return id;
    };

    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, { answers: interests });
    };



    return (
        <>  
            <div className="first-question">
                <nav>
                    <Link to='/avatar' className="skip-link">
                        <p onClick={() => updateAnswers()}>Skip questions</p>
                    </Link>
                    <p>Tell us about you</p>
                </nav>

                <section>
                    <h3>Questions</h3>
                    <p>What are you interested in?</p>
                    <p>You can change your interests<br/> at anytime in your profile.</p>

                </section>
                <Link to='/interestsmenu'>
                    <button onClick={() => updateAnswers()}>Get started</button>
                </Link>
            </div>
        </>
    )
}


