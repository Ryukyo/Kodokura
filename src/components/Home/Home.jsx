import React from "react";
import avatar from "./nw.png";
import { Link } from "react-router-dom";
import Header from "../../helpers/Header";

export default function Home() {
  return (
    <>
      <Header avatar={avatar} />
      <h2>Home page</h2>
      <Link to="/chatroom">
        <button>Find someone to talk to.</button>
      </Link>
    </>
  );
}
