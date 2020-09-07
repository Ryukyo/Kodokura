import React from 'react';
import axios from 'axios'

import { Redirect } from "react-router-dom";

import { auth } from "../../services/firebase";


export default function Loading() {
    
    const user = auth().currentUser;
    
    async function checkQuestions() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        return data.answers;
    };

    checkQuestions()

    return (
        <>
        <div>Loading...</div>
        {checkQuestions.length === 0 ? <Redirect to={{ pathname: "/questions"}}/> : <Redirect to={{ pathname: "/home"}}/>}

        </>
    )
}