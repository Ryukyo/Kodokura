import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentAuthUser,
  getUser,
  updateAnswers as updateAnswersReq,
} from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function BooksCard() {
  const currentUser = getCurrentAuthUser();
  const [books, setBooks] = useState();

  async function getUserId() {
    let user = await getUser(currentUser.email);
    let id = user.id;
    if (books === undefined) {
      setBooks(user.answers);
    }
    return id;
  }
  getUserId();

  async function updateAnswers() {
    const userId = await getUserId();
    updateAnswersReq(userId, books);
  }

  async function checkBox(i) {
    const user = await getUser(currentUser.email);
    books.books[i] = !user.answers.books[i];
  }

  function renderCheckBox(...category) {
    if (books && books.books) {
      return books.books.map((e, i) => {
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
          <p>Books</p>
        </nav>

        <h3> What kind of Books do you like? </h3>

        <section className="selection-box">
          {renderCheckBox(
            "Fiction",
            "Non-fiction",
            "Fantasy",
            "Drama",
            "Poetry",
            "Fantasy",
            "Mystery",
            "Biography",
            "Romantic",
            "Comic/Manga"
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
