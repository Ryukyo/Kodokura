import React from 'react';


export default function QuestionCard({question}) {

    return (
        <>
        <h1>TOPIC</h1>
           <div className="question-card-answer">
            <p>{question}</p>
           <h3>Yes</h3>
           <h3>No</h3>
           </div>
         <p>Go to previous</p>  
        </>
    )
}