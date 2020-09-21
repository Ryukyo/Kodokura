import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, getCurrentAuthUser, deleteUser } from "../../helpers/backend";

import AvatarM from "../Canvas3D/AvatarM";

//img
import backIcon from "../Utility/img/back.svg";

export default function Profile() {
  const currentUser = getCurrentAuthUser();
  const [myAvatar, setMyAvatar] = useState("");
  const [username, setUsername] = useState("");

  async function deleteUserAndAuth() {
    const userData = await getUser(currentUser.email);
    const userId = userData.id;
    await deleteUser(userId);

    currentUser
      .delete()
      .then(function () {})
      .catch(function (error) {
        console.error(error);
      });
  }

  async function getData() {
    const userData = await getUser(currentUser.email);
    let avatar = userData.avatar_url;
    let userName = userData.name;
    setMyAvatar(avatar);
    setUsername(userName);
  }

  getData();

  return (
    <>
      <div className="profile">
        <nav>
          <Link to="/home">
            <img src={backIcon} alt="back" />
          </Link>
          <p>Profile</p>
        </nav>

        <h3>{username}</h3>

        <section className="profile-pic">
          {myAvatar ? <AvatarM avatar={myAvatar} /> : <div />}
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
            <button onClick={() => deleteUserAndAuth()}>Delete account</button>
          </div>
        </section>
      </div>
    </>
  );
}
