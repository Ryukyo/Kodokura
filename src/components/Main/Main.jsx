import React from "react";
import logo from "../Utility/img/logo-wh.png";
import {
  Link,
} from "react-router-dom";

export default function Main()  {
  return (
    <div className="main">
      <header className="main-header">
        <h1>
          <img className="logo" src={logo} alt="" />
        </h1>
        <p className="header-text">
          {" "}
          <span>Loneliness</span> <br />
          is not an option.
        </p>
      </header>


      <nav className="login-section">
          <Link to="/signup">
            <button>Create Account</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/about">
            <button className="secondary-btn">About</button>
          </Link>
      </nav>

      <footer>
        Copyright &#169; 2020 Summer Memories, Inc. All rights reserved{" "}
      </footer>
    </div>
  );
}
