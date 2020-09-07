import React from 'react';
import axios from 'axios';

import { auth } from "../../services/firebase";


export default function Card({setQuestion, question, topicQ, topicTitle}) {

    const user = auth().currentUser;
    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        console.log(data)
        return id;
    };

    function updateAnswers(answer) {
        axios.put(`/users/yS69y0L86RatqwW4KEK3`, answer);
    }

    console.log(getUserId())

    return (
        <>
            <div className="question-card-answer">
                <h3>{topicTitle}</h3>
                <p>{topicQ}</p>
                <button onClick={() => {
                    setQuestion(question += 1);
                    updateAnswers(true);
                    
                }}>Yes</button>
                <button onClick={() => setQuestion(question += 1)}>No</button>
                <button onClick={() => {
                if(question > 0) {
                    setQuestion(question - 1)
                } else {
                    return
                }}
            }>Go to previous question</button> 
            </div>
        </>
    )
}