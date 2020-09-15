import React from "react";
import logo from "../Utility/img/logo-wh.png";
// import Clouds from '../Clouds/Clouds';

import {
  /*   Route,
    BrowserRouter as Router,
    Switch,
    Redirect, */
  Link,
} from "react-router-dom";

export default function Main() {
  return (
    <div className="main">
      <header className="main-header">
        <h1>
          <img className="logo" src={logo} alt="" />
        </h1>
      </header>

      <nav className="login-section">
        <div>
          <p className="header-text">
            {" "}
            <span>Loneliness</span> <br />
            is not an option.
          </p>
          <Link to="/signup">
            <button>Create Account</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </nav>

      <footer>
        Copyright &#169; 2020 Summer Memories, Inc. All rights reserved{" "}
      </footer>
    </div>
  );
}
