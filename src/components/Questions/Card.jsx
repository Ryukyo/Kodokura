import React from "react";

export default function Card({
  setQuestion,
  question,
  topicQ,
  topicTitle,
  answers,
}) {
  function setAnswers(e) {
    answers.push(e.target.value);
  }

  return (
    <>
      <div className="question-card-answer">
        <h3>{topicTitle}</h3>
        <p>{topicQ}</p>
        <button
          value={true}
          onClick={(e) => {
            setQuestion((question += 1));
            setAnswers(e);
          }}
        >
          Yes
        </button>
        <button
          value={false}
          onClick={(e) => {
            setQuestion((question += 1));
            setAnswers(e);
          }}
        >
          No
        </button>
        <button
          onClick={() => {
            if (question > 0) {
              setQuestion(question - 1);
            } else {
              return;
            }
            answers.pop();
          }}
        >
          Go to previous question
        </button>
      </div>
    </>
  );
}
