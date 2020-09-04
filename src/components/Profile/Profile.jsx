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
        <img src={avatar} alt="avatar" style={{ width: "50px" }}></img>
      </div>
      <div>
        <Link to="/avatar">
          <button>Change Profile picture</button>
        </Link>
      </div>
      <Link to="/questions">
        <button>Tell us about you again</button>
      </Link>
      <Link to="/language">
        <div>
          <button>Change language</button>
        </div>
      </Link>
      <div>
        <button>Delete account</button>
      </div>
    </>
  );
}
