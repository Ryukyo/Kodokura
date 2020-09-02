import React from 'react';
import QuestionCard from './QuestionCard'



export default function Questions() {

    return (
        <>
           <header>
               <h3>Questions</h3>
           </header>

           <section>
               <p>What are you interested in?</p>
               <button>Get started</button>
           </section>
           <QuestionCard question={'Do you like sports?'}/>
           <QuestionCard question={'Do you like cinema?'}/>
           <QuestionCard question={'Do you like music?'}/>
           <QuestionCard question={'Do you like food?'}/>
           <QuestionCard question={'Do you like games?'}/>
        </>
    )
}