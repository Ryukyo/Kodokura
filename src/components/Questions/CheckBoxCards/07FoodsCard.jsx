import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentAuthUser,
  getUser,
  updateAnswers as updateAnswersReq,
} from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function FoodsCard() {
  const currentUser = getCurrentAuthUser();
  const [foods, setFoods] = useState();

  async function getUserId() {
    let user = await getUser(currentUser.email);
    let id = user.id;
    if (foods === undefined) {
      setFoods(user.answers);
    }
    return id;
  }
  getUserId();

  async function updateAnswers() {
    const userId = await getUserId();
    updateAnswersReq(userId, foods);
  }

  async function checkBox(i) {
    const user = await getUser(currentUser.email);
    foods.foods[i] = !user.answers.foods[i];
  }

  function renderCheckBox(...category) {
    if (foods) {
      return foods.foods.map((e, i) => {
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
          <p>Foods</p>
        </nav>

        <h3> What kind of Foods do you like? </h3>

        <section className="selection-box">
          {renderCheckBox(
            "Japanese",
            "Chinese",
            "Korean",
            "Vietnamese",
            "Mexican",
            "Italian",
            "French",
            "Greek",
            "Desserts",
            "Fast-food"
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
