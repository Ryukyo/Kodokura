import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import axios from 'axios';

//img
import backIcon from '../../Utility/img/back.svg';

export default function BooksCard() {

    const user = auth().currentUser;
    const [books, setBooks] = useState();

    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        if (books === undefined) {
            setBooks(data.answers)
        }
        return id;
    };
    getUserId();

    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, { answers: books });
    };

    async function checkBox(i) {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        books.books[i] = !data.answers.books[i];
    };

    function renderCheckBox(...category) {
        if (books) {
            return books.books.map((e, i) => {
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
                <p>Books</p>
            </nav>


            <h3> What kind of Books do you like? </h3>

            <section className="selection-box">
                {renderCheckBox('Fiction', 'Non-fiction', 'Fantasy', 'Drama', 'Poetry', 'Fantasy', 'Mystery', 'Biography', 'Romantic', 'Comic/Manga')}
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
