import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { auth } from "../../services/firebase";

// Components
import Card from './Card'
// import { findAllInRenderedTree } from 'react-dom/test-utils';


export default function QuestionCard() {

    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [hasAvatar, setHasAvatar] = useState('');

    const user = auth().currentUser;
    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        console.log(data)
        return id;
    };


    async function getAvatar() {
        let req = await axios.get(`/users/${user.email}`);
        let data = req.data;
        let avatar = data.avatar_url
  
        console.log(hasAvatar);
        setHasAvatar(avatar);
    }
    useEffect(() => {
        getAvatar()
    }, []);
    
    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, {answers});
        console.log(answers);
    };


    function displayQuestion() {
        if (question === 0) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like Music?" topicTitle="MUSIC" answers={answers}/>
                </>
            )
        } else if (question === 1) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like movies?" topicTitle="MOVIES" answers={answers}/>
                </>
            )
        }
        else if (question === 2) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like TV Shows?" topicTitle="TV SHOWS" answers={answers}/>
                </>
            )
        }
        else if (question === 3) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like books?" topicTitle="BOOKS" answers={answers}/>
                </>
            )
        }
        else if (question === 4) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like games?" topicTitle="GAMES" answers={answers}/>
                </>
            )
        }
        else if (question === 5) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like food?" topicTitle="FOOD" answers={answers}/>
                </>
            )
        }
        else if (question === 6) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like sports?" topicTitle="SPORTS" answers={answers}/>
                </>
            )
        } else if (question === 7) {
            return (
                <>
                    {hasAvatar.length === 0 ?
                        <Link to='/avatar'><button onClick={() => {
                            console.log('avatarrrr', hasAvatar)
                            updateAnswers()}}>Done!</button></Link> : <Link to='/profile'><button onClick={() => {
                                console.log('avatarrrr2', hasAvatar);
                                updateAnswers()}}>Done!</button></Link>}
                </>
            )
        }
    }



    return (
        <>
            {displayQuestion()}
        </>
    )
}

