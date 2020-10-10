import React, { useState, useEffect } from "react";
import bear from "./img/BearCube.png";
import bird from "./img/BirdCube.png";
import bunny from "./img/BunnyCube.png";
import cow from "./img/CowCube.png";
import dog from "./img/DogCube.png";
import duck from "./img/DuckCube.png";
import fox from "./img/FoxCube.png";
import goat from "./img/GoatCube.png";
import horse from "./img/HorseCube.png";
import lion from "./img/LionCube.png";

import {
  getUser,
  updateAvatar as updateAvatarReq,
  getCurrentAuthUser,
} from "../../helpers/backend";

import { Link } from "react-router-dom";
import backIcon from "../Utility/img/back.svg";

export default function Avatar() {
  const [avatar, setAvatar] = useState('');
  const currentUser = getCurrentAuthUser();

  async function getAvatar() {
    const user = await getUser(currentUser.email);
    let avatar = user.avatar_url;
    setAvatar(avatar);
  }

  async function updateAvatar(avatar) {
    const userData = await getUser(currentUser.email);
    const userId = userData.id;
    updateAvatarReq(userId, avatar);
  };


  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <>
      <div className="avatar-selector">

        <nav className="avatar-nav">
          <Link to="/profile">
            <img src={backIcon} alt="back" />
          </Link>
          <p>Choose your avatar</p>
        </nav>


        <section className="avatar">
          <img
            src={bear}
            alt="Bear"
            className={"Bear" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={bird}
            alt="Bird"
            className={"Bird" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={bunny}
            alt="Bunny"
            className={"Bunny" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={cow}
            alt="Cow"
            className={"Cow" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={dog}
            alt="Dog"
            className={"Dog" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={duck}
            alt="Duck"
            className={"Duck" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={fox}
            alt="Fox"
            className={"Fox" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={goat}
            alt="Goat"
            className={"Goat" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={horse}
            alt="Horse"
            className={"Horse" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
          <img
            src={lion}
            alt="Lion"
            className={"Lion" === avatar ? "selected-avatar" : ""}
            onClick={(e) => {
              setAvatar(e.target.alt);
              updateAvatar(e.target.alt);
            }}
          />
        </section>

        <nav className="btn">
          <Link to="/home">
            <button>Start chatting!</button>
          </Link>

          <Link to="/profile">
            <button>Save</button>
          </Link>
        </nav>
      </div>
    </>
  );
}
