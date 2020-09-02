import React from "react";
import avatar from "./nw.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header>
        <Link to="/profile">
          <a href="#">
            <img src={avatar} alt="avatar" style={{ width: "50px" }} />
          </a>
        </Link>
        <h2>Home page</h2>
      </header>
      <Link to="/chatroom">
        <button>Find someone to talk to.</button>
      </Link>
    </>
  );
}
