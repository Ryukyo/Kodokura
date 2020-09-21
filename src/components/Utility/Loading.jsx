import React, { useState } from "react";
import { getUser, getCurrentAuthUser } from "../../helpers/backend";
import { Redirect } from "react-router-dom";
import Spinner from "./Spinner";

export default function Loading() {
  const [answersArray, setAnswersArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = getCurrentAuthUser();
  async function checkQuestions() {
    let userData = await getUser(currentUser.email);
    let answersIsArray = Array.isArray(userData.answers);
    // [] is the default value when a user is created and has not started with questions yet
    setAnswersArray(answersIsArray);
    setLoading(false);
  }
  checkQuestions();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : answersArray === true ? (
        <Redirect to={{ pathname: "/questions" }} />
      ) : (
        <Redirect to={{ pathname: "/home" }} />
      )}
    </>
  );
}
