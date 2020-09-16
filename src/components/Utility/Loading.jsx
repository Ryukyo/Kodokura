import React, { useState } from "react";
import axios from "axios";

import { Redirect } from "react-router-dom";

import { auth } from "../../services/firebase";

import Canvas3D from "../Canvas3D/Canvas3D"

export default function Loading() {
  const [answersLength, setAnswersLength] = useState();
  const [loading, setLoading] = useState(true);

  const user = auth().currentUser;
  async function checkQuestions() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    // [] is the default value when a user is created and has not started with questions yet
    setAnswersLength(data.answers === []);
    setLoading(false);
  }

  checkQuestions();

  return (
    <>
      {loading ? (

        <div>
        <Canvas3D/>
        Loading...</div>
      ) : answersLength === true ? (

     

        <Redirect to={{ pathname: "/questions" }} />
      ) : (
        <Redirect to={{ pathname: "/home" }} />
      )}
    </>
  );
}
