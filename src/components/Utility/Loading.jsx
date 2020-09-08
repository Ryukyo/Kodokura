import React, { useState } from 'react';
import axios from 'axios'

import { Redirect } from "react-router-dom";

import { auth } from "../../services/firebase";


export default function Loading() {

    const [answersLength, setAnswersLength] = useState();
    const [loading, setLoading] = useState(true);

    
    const user = auth().currentUser;
    async function checkQuestions() {
        let req = await axios.get(`/users/${user.email}`);
        let data = req.data;
        console.log('medata', data.answers.length);
        console.log('data', data);
        setAnswersLength(data.answers.length);
        setLoading(false)
    };

   

    console.log(checkQuestions());


    return (
        <>
        
        
        {loading ? <div>Loading...</div> : answersLength === 0 ? <Redirect to={{ pathname: "/questions"}}/> : <Redirect to={{ pathname: "/home"}}/>}
        

        </>
    )
}