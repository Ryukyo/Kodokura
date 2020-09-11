import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import axios from 'axios';

export default function FoodsCard() {

    const user = auth().currentUser;
    const [foods, setFoods] = useState();

    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        if (foods === undefined) {
            setFoods(data.answers)
        }
        return id;
    };
    getUserId();

    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, { answers: foods });
    };

    async function checkBox(i) {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        foods.foods[i] = !data.answers.foods[i];
    };

    function renderCheckBox(...category) {
        if (foods) {
            return foods.foods.map((e, i) => {
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
            <h3> What kind of foods do you like ? </h3>

            {renderCheckBox('Japanese', 'Chinese', 'Korean', 'Vietnamese', 'Mexican', 'Italian', 'French', 'Greek', 'Desserts', 'Fast-food')}

            <Link to="/interestsmenu">
                <button onClick={() => {
                    updateAnswers();
                }}>Done!</button>
            </Link>
        </>
    )
}
