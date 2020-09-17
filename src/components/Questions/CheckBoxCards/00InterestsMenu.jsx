import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentAuthUser, getUser } from "../../../helpers/backend";

//img
import backIcon from "../../Utility/img/back.svg";

export default function InterestsMenu() {
  const currentUser = getCurrentAuthUser();
  const [hasAvatar, setHasAvatar] = useState(getAvatar());

  async function getAvatar() {
    let user = await getUser(currentUser.email);
    let avatar = user.avatar_url;
    setHasAvatar(avatar);
    return avatar;
  }

  useEffect(() => {
    getAvatar();
  });

  console.log(hasAvatar);

  return (
    <>
      <div className="interests">
        <nav>
          <Link to="/profile">
            <img src={backIcon} alt="back" />
          </Link>
          <p>Select what you are interested in</p>
        </nav>

        <section>
          <div>
            <Link to="/musiccard" className="hobbies-link">
              Music
            </Link>
          </div>
          <div>
            <Link to="/moviescard" className="hobbies-link">
              Movies
            </Link>
          </div>
          <div>
            <Link
              to="/tvshowscard"
              className="hobbies-link"
              className="hobbies-link"
            >
              TV Shows
            </Link>
          </div>
          <div>
            <Link to="/bookscard" className="hobbies-link">
              Books
            </Link>
          </div>
          <div>
            <Link to="/gamescard" className="hobbies-link">
              Games
            </Link>
          </div>
          <div>
            <Link to="/sportscard" className="hobbies-link">
              Sports
            </Link>
          </div>
          <div>
            <Link to="/foodscard" className="hobbies-link">
              Foods
            </Link>
          </div>
        </section>
        {hasAvatar.length === 0 ? (
          <Link to="/avatar">
            <button>Done!</button>
          </Link>
        ) : (
          <Link to="/profile">
            <button>Done!</button>
          </Link>
        )}
      </div>
    </>
  );
}
