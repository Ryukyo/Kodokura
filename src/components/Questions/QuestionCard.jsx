import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Card from './Card'
// import { findAllInRenderedTree } from 'react-dom/test-utils';


export default function QuestionCard() {

    const [question, setQuestion] = useState(0);
    const [firstTime, setFirstTime] = useState(true);

    function displayQuestion() {
        if (question === 0) {
            return (
                <>
                    <Card setQuestion={setQuestion} question={question} topicQ="Do you like Music?" topicTitle="MUSIC"/>
                </>
            )
        } else if (question === 1) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like movies?" topicTitle="MOVIES"/>
                </>
            )
        }
        else if (question === 2) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like TV Shows?" topicTitle="TV SHOWS"/>
                </>
            )
        }
        else if (question === 3) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like books?" topicTitle="BOOKS"/>
                </>
            )
        }
        else if (question === 4) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like games?" topicTitle="GAMES"/>
                </>
            )
        }
        else if (question === 5) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like food?" topicTitle="FOOD"/>
                </>
            )
        }
        else if (question === 6) {
            return (
                <>
                <Card setQuestion={setQuestion} question={question} topicQ="Do you like sports?" topicTitle="SPORTS"/>
                </>
            )
        } else if (question === 7) {
            return (
                <>
                    {firstTime ?
                        <Link to='/avatar'><button>Done!</button></Link> : <Link to='/profile'><button>Done!</button></Link>}
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

