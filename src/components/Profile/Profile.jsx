import React from "react";
import avatar from "../Home/nw.png";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <div>
        <img src={avatar} alt="avatar" style={{ width: "100px" }}></img>
      </div>
      <div>
        <Link to="/avatar">
          <button>Change Avatar</button>
        </Link>
      </div>
      <div>
        <Link to="/questions">
          <button>Tell us about you again</button>
        </Link>
      </div>
      <div>
        <Link to="/language">
          <button>Change language</button>
        </Link>
      </div>
      <div>
        <button>Delete account</button>
      </div>
    </>
  );
}
