import React, { useState, useEffect } from "react";
import bear from './img/BearCube.png';
import bird from './img/BirdCube.png';
import bunny from './img/BunnyCube.png';
import cow from './img/CowCube.png';
import dog from './img/DogCube.png';
import duck from './img/DuckCube.png';
import fox from './img/FoxCube.png';
import goat from './img/GoatCube.png';
import horse from './img/HorseCube.png';
import lion from './img/LionCube.png';

import {
  getUser,
  updateAvatar as updateAvatarReq,
  getCurrentAuthUser,
} from "../../helpers/backend";

import { Link } from "react-router-dom";
import { update } from "lodash";

export default function Avatar() {

  const [avatar, setAvatar] = useState('');


  const currentUseruser = getCurrentAuthUser();

  async function getAvatar() {
    const user = await getUser(currentUseruser.email);
    let avatar = user.avatar_url;
    setAvatar(avatar);
  };

  async function updateAvatar(avatar) {
    const userData = await getUser(currentUseruser.email);
    const userId = userData.id;
    updateAvatarReq(userId, avatar);
    // setAvatar(userData.avatar_url)
    console.log(userData);
  };



  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <>
      <div className="avatar-selector">
        <header>
          <p>Choose your avatar</p>
        </header>

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
            <button>Go to profile</button>
          </Link>
        </nav>
      </div>
    </>
  );
}
