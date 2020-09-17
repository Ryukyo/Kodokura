import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentAuthUser,
  getUser,
  updateAnswers as updateAnswersReq,
} from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function SportsCard() {
  const currentUser = getCurrentAuthUser();
  const [sports, setSports] = useState();

  async function getUserId() {
    let data = await getUser(currentUser.email);
    let id = data.id;
    if (sports === undefined) {
      setSports(data.answers);
    }
    return id;
  }
  getUserId();

  async function updateAnswers() {
    const userId = await getUserId();
    updateAnswersReq(userId, { answers: sports });
  }

  async function checkBox(i) {
    let data = await getUser(currentUser.email);
    sports.sports[i] = !data.answers.sports[i];
  }

  function renderCheckBox(...category) {
    if (sports) {
      return sports.sports.map((e, i) => {
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
          <p>Sports</p>
        </nav>

        <h3> What kind of Sports do you like? </h3>

        <section className="selection-box">
          {renderCheckBox(
            "Soccer",
            "Football",
            "Basket",
            "Baseball",
            "Ice-hockey",
            "Golf",
            "Tenis",
            "Cycling",
            "Yoga",
            "Body-building"
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
