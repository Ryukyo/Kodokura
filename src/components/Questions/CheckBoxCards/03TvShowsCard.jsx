import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentAuthUser,
  getUser,
  updateAnswers as updateAnswersReq,
} from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function TvShowsCard() {
  const currentUser = getCurrentAuthUser();
  const [tvshows, setShows] = useState();

  async function getUserId() {
    let userData = await getUser(currentUser.email);
    let id = userData.id;
    if (tvshows === undefined) {
      setShows(userData.answers);
    }
    return id;
  }
  getUserId();

  async function updateAnswers() {
    const userId = await getUserId();
    updateAnswersReq(userId, tvshows);
  }

  async function checkBox(i) {
    const user = await getUser(currentUser.email);
    tvshows.tvshows[i] = !user.answers.tvshows[i];
  }

  function renderCheckBox(...category) {
    if (tvshows) {
      return tvshows.tvshows.map((e, i) => {
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
          <p>TV Shows</p>
        </nav>

        <h3> What kind of TV Shows do you like? </h3>

        <section className="selection-box">
          {renderCheckBox(
            "Comedy",
            "Drama",
            "Thriller",
            "Horror",
            "Romantic",
            "Action",
            "Sci-fi",
            "Fantasy",
            "Animation",
            "Documentary"
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
