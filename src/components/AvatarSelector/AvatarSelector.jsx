import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebase";
import {
  getUser,
  updateAvatar as updateAvatarReq,
} from "../../helpers/backend";

import bulbasaur from "./img/bulbasaur.png";
import charmander from "./img/charmander.png";
import pikachu from "./img/pikachu.png";
import raichu from "./img/raichu.png";
import squirtle from "./img/squirtle.png";
import togepi from "./img/togepi.png";

export default function Avatar() {
  const authUser = auth().currentUser;

  async function updateAvatar(avatar) {
    const user = await getUser(authUser.email);
    updateAvatarReq(user.id, avatar);
  }

  return (
    <>
      <div className="avatar-selector">
        <header>
          <p>Choose your avatar</p>
        </header>

        <section className="avatar">
          <img
            src={bulbasaur}
            alt="avatar"
            onClick={() => updateAvatar(bulbasaur)}
          />
          <img
            src={charmander}
            alt="avatar"
            onClick={() => updateAvatar(charmander)}
          />
          <img
            src={pikachu}
            alt="avatar"
            onClick={() => updateAvatar(pikachu)}
          />
          <img src={raichu} alt="avatar" onClick={() => updateAvatar(raichu)} />
          <img
            src={squirtle}
            alt="avatar"
            onClick={() => updateAvatar(squirtle)}
          />
          <img src={togepi} alt="avatar" onClick={() => updateAvatar(togepi)} />
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
