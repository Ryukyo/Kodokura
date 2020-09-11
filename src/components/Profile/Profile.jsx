import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { auth } from "../../services/firebase";

export default function Profile() {

  const user = auth().currentUser;
  async function getUserId() {
    let req = await axios.get(`/users/${user.email}`)
    let data = req.data;
    let id = data.id;
    console.log(data)
    return id;
  };

  async function updateAnswers(answer) {
    const userId = await getUserId();
    axios.put(`/users/${userId}`, { 'answers': answer });
    console.log();
  };

  async function deleteUser() {
    console.log('deleted')
    const userId = await getUserId();
    axios.delete(`/users/${userId}`);
    let user = auth().currentUser;
    user.delete()
      .then(function () { })
      .catch(function (error) {
      });
  };

  const [avatar, setAvatar] = useState('');

  async function getData() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let avatar = data.avatar_url
    console.log('profile ', data)
    console.log('answer music  ', data.answers.music)
    console.log(avatar);
    setAvatar(avatar);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <h1>Profile</h1>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <div>
        <img src={avatar} alt="avatar" style={{ width: "100px" }}></img>
      </div>
      <div>
        <Link to="/avatar">
          <button>Change Avatar</button>
        </Link>
      </div>
      <div>
        <Link to="/interestsmenu">
          <button>Tell us about you again</button>
        </Link>
      </div>
      <div>
        <Link to="/language">
          <button>Change language</button>
        </Link>
      </div>
      <div>
        <button onClick={() => deleteUser()}>Delete account</button>
      </div>
    </>
  );
}
