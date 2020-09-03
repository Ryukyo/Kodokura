import React, { useState } from 'react';
import QuestionCard from './QuestionCard'

import { Link } from 'react-router-dom'



export default function Questions() {



    return (
        <>
           <header>
               <h3>Questions</h3>
           </header>

           <section>
               <p>What are you interested in?</p>
               <Link to='/questioncard'>
                <button>Get started</button>
               </Link>
           </section>
        </>
    )
}


// const [question, setquestion] = useState(0);

// if (question === 0) {
//     show question 1
// } else if (question === 1) {
//     show question 2
// } else if (question === 2) {
//     show question 3...
// }