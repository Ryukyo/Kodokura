import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { auth } from "../../services/firebase";

import AvatarM from "../Canvas3D/AvatarM"

//img
import backIcon from '../Utility/img/back.svg'

export default function Profile() {
  const user = auth().currentUser;
  const [myAvatar, setMyAvatar] = useState('');

  async function getUserId() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let id = data.id;
    // console.log(data);
    return id;
  }

  async function deleteUser() {
    console.log("deleted");
    const userId = await getUserId();
    axios.delete(`/users/${userId}`);
    let user = auth().currentUser;
    user
      .delete()
      .then(function () {})
      .catch(function (error) {});
  }

  async function getData() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let avatar = data.avatar_url;
    // console.log('profile ', data)
    // console.log('answer music  ', data.answers.music)
    // console.log(avatar);
    // console.log(data)
    setMyAvatar(avatar);
    return myAvatar;
  }

  getData();

  return (
    <>
      <div className="profile">
        <nav>
          <Link to="/home">
            <img src={backIcon} alt="back"/>
          </Link>
          <p>Profile</p>
        </nav>

        <section className="profile-pic">
        <AvatarM avatar={myAvatar} />
          {/* <img src={myAvatar} alt="avatar"/> */}
        </section>

        <section className="profile-nav">
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
              <button>What language do you speak?</button>
            </Link>
          </div>
          <div>
            <button onClick={() => deleteUser()}>Delete account</button>
          </div>
        </section>

      </div>
    </>
  );
}
