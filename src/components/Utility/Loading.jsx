import React, { useState } from "react";
import axios from "axios";

import { Redirect } from "react-router-dom";

import { auth } from "../../services/firebase";

import Canvas3D from "../Canvas3D/Canvas3D";

export default function Loading() {
  const [answersArray, setAnswersArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth().currentUser;
  async function checkQuestions() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let answersIsArray = Array.isArray(data.answers);
    // [] is the default value when a user is created and has not started with questions yet
    // console.log(answersIsArray);
    setAnswersArray(answersIsArray);
    setLoading(false);
  }
  checkQuestions();

  return (
    <>
      {loading ? (
        <div>
          <Canvas3D />
          Loading...
        </div>
      ) : answersArray === true ? (
        <Redirect to={{ pathname: "/questions" }} />
      ) : (
        <Redirect to={{ pathname: "/home" }} />
      )}
    </>
  );
}
