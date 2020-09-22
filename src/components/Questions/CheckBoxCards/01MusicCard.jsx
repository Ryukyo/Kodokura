import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentAuthUser,
  getUser,
  updateAnswers as updateAnswersReq,
} from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function MusicCard() {
  const currentUser = getCurrentAuthUser();
  const [music, setMusic] = useState();

  async function getUserId() {
    let user = await getUser(currentUser.email);
    let id = user.id;
    if (music === undefined) {
      setMusic(user.answers);
    }
    return id;
  }
  getUserId();
  async function updateAnswers() {
    const userId = await getUserId();
    updateAnswersReq(userId, music);
  }

  async function checkBox(i) {
    const user = await getUser(currentUser.email);
    music.music[i] = !user.answers.music[i];
  }

  function renderCheckBox(...category) {
    if (music && music.music) {
      return music.music.map((e, i) => {
        return (
          <div key={i}>
            <label htmlFor="fname">{category[i]}</label>
            <input
              type="checkbox"
              defaultChecked={e}
              onChange={() => {
                checkBox(i);
              }}
            />
          </div>
        );
      });
    }
  }

  return (
    <>
      <div className="interest-cards">
        <nav>
          <Link to="/interestsmenu">
            <img src={backIcon} alt="back" />
          </Link>
          <p>Musics</p>
        </nav>

        <h3> What style of music do you like? </h3>

        <section className="selection-box">
          {renderCheckBox(
            "Classical",
            "Soundtracks",
            "Rock",
            "Blues",
            "Jazz",
            "Folk",
            "Pop",
            "J-Pop",
            "K-Pop",
            "Hip-Hop"
          )}
        </section>

        <Link to="/interestsmenu">
          <button
            onClick={() => {
              updateAnswers();
            }}
          >
            Save
          </button>
        </Link>
      </div>
    </>
  );
}
