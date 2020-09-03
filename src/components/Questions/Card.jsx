import React from 'react';

export default function Card({setQuestion, question, topicQ, topicTitle}) {

    return (
        <>
            <div className="question-card-answer">
                <h3>{topicTitle}</h3>
                <p>{topicQ}</p>
                <button onClick={() => setQuestion(question += 1)}>Yes</button>
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