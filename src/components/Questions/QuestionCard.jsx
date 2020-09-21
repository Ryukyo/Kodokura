import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getUser,
  getCurrentAuthUser,
  updateAnswers,
} from "../../helpers/backend";
// Components
import Card from "./Card";

export default function QuestionCard() {
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [hasAvatar, setHasAvatar] = useState("");

  const currentUser = getCurrentAuthUser();

  async function getAvatar() {
    let userData = getUser(currentUser.email);
    let avatar = userData.avatar_url;
    setHasAvatar(avatar);
  }
  useEffect(() => {
    getAvatar();
  }, []);

  async function updateAnswersUI() {
    let userData = await getUser(currentUser.email);
    let userId = userData.id;
    await updateAnswers(userId, { answers });
  }

  function displayQuestion() {
    if (question === 0) {
      return (
        <>
          <Card
            setQuestion={setQuestion}
            question={question}
            topicQ="Do you like Music?"
            topicTitle="MUSIC"
            answers={answers}
          />
        </>
      );
    } else if (question === 1) {
      return (
        <>
          <Card
            setQuestion={setQuestion}
            question={question}
            topicQ="Do you like movies?"
            topicTitle="MOVIES"
            answers={answers}
          />
        </>
      );
    } else if (question === 2) {
      return (
        <>
          <Card
            setQuestion={setQuestion}
            question={question}
            topicQ="Do you like TV Shows?"
            topicTitle="TV SHOWS"
            answers={answers}
          />
        </>
      );
    } else if (question === 3) {
      return (
        <>
          <Card
            setQuestion={setQuestion}
            question={question}
            topicQ="Do you like books?"
            topicTitle="BOOKS"
            answers={answers}
          />
        </>
      );
    } else if (question === 4) {
      return (
        <>
          <Card
            setQuestion={setQuestion}
            question={question}
            topicQ="Do you like games?"
            topicTitle="GAMES"
            answers={answers}
          />
        </>
      );
    } else if (question === 5) {
      return (
        <>
          <Card
            setQuestion={setQuestion}
            question={question}
            topicQ="Do you like food?"
            topicTitle="FOOD"
            answers={answers}
          />
        </>
      );
    } else if (question === 6) {
      return (
        <>
          <Card
            setQuestion={setQuestion}
            question={question}
            topicQ="Do you like sports?"
            topicTitle="SPORTS"
            answers={answers}
          />
        </>
      );
    } else if (question === 7) {
      return (
        <>
          {hasAvatar.length === 0 ? (
            <Link to="/avatar">
              <button
                onClick={() => {
                  updateAnswersUI();
                }}
              >
                Done!
              </button>
            </Link>
          ) : (
            <Link to="/profile">
              <button
                onClick={() => {
                  updateAnswersUI();
                }}
              >
                Done!
              </button>
            </Link>
          )}
        </>
      );
    }
  }

  return <>{displayQuestion()}</>;
}
