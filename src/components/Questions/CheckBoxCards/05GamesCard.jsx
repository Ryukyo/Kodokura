import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentAuthUser,
  getUser,
  updateAnswers as updateAnswersReq,
} from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function GamesCard() {
  const currentUser = getCurrentAuthUser();
  const [games, setGames] = useState();

  async function getUserId() {
    let user = await getUser(currentUser.email);
    let id = user.id;
    if (games === undefined) {
      setGames(user.answers);
    }
    return id;
  }
  getUserId();

  async function updateAnswers() {
    const userId = await getUserId();
    updateAnswersReq(userId, games);
  }

  async function checkBox(i) {
    const user = await getUser(currentUser.email);
    games.games[i] = !user.answers.games[i];
  }

  function renderCheckBox(...category) {
    if (games && games.games) {
      return games.games.map((e, i) => {
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
          <p>Games</p>
        </nav>

        <h3> What kind of Games do you like? </h3>

        <section className="selection-box">
          {renderCheckBox(
            "FPS",
            "RPG",
            "Survival-horror",
            "Action",
            "Puzzle",
            "Simulation",
            "Strategy",
            "Sports",
            "Adventure",
            "Multiplayer"
          )}
        </section>

        <Link to="/interestsmenu">
          <button
            onClick={() => {
              updateAnswers();
            }}
          >
            Done!
          </button>
        </Link>
      </div>
    </>
  );
}
