import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentAuthUser,
  getUser,
  updateAnswers as updateAnswersReq,
} from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function MoviesCard() {
  const currentUser = getCurrentAuthUser();
  const [movies, setMovies] = useState();

  async function getUserId() {
    let user = await getUser(currentUser.email);
    let id = user.id;
    if (movies === undefined) {
      setMovies(user.answers);
    }
    return id;
  }
  getUserId();

  async function updateAnswers() {
    const userId = await getUserId();
    updateAnswersReq(userId, movies);
  }

  async function checkBox(i) {
    const user = await getUser(currentUser.email);
    movies.movies[i] = !user.answers.movies[i];
  }

  function renderCheckBox(...category) {
    if (movies) {
      return movies.movies.map((e, i) => {
        return (
          <div>
            {e ? (
              <>
                <label for="fname">{category[i]}</label>
                <input
                  type="checkbox"
                  defaultChecked={e}
                  onChange={() => {
                    checkBox(i);
                  }}
                />
              </>
            ) : (
              <>
                <label for="fname">{category[i]}</label>
                <input
                  type="checkbox"
                  defaultChecked={e}
                  onChange={() => {
                    checkBox(i);
                  }}
                />
              </>
            )}
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
          <p>Movies</p>
        </nav>

        <h3> What kind of movies do you like? </h3>

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
            Done!
          </button>
        </Link>
      </div>
    </>
  );
}
