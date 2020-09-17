import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle } from "../../helpers/auth";
import { getUser, updateUserStatus } from "../../helpers/backend";

//img
import backIcon from "../Utility/img/back.svg";
import emailIcon from "../Utility/img/contact.svg";
import passwordIcon from "../Utility/img/lock.svg";
import logo from "../Utility/img/logo-wh.png";

export default function LogIn() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await signIn(email, password);

      const user = await getUser(email);
      updateUserStatus(user.id, "ACTIVE");
    } catch (err) {
      setError(err.message);
    }
  }

  /* async googleSignIn() {
        try {
          await signInWithGoogle();
        } catch (error) {
         setError(error.message);
        }
      } */

  return (
    <div className="login">
      <nav>
        <Link to="/">
          <img src={backIcon} alt="back" />
        </Link>
        <p>Login</p>
      </nav>

      <header>
        <Link className="main-link" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </header>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            <img src={emailIcon} alt="" />
          </label>
          <input
            className="form-field"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleEmailChange}
            /* value={this.state.email} */
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">
            <img src={passwordIcon} alt="" />
          </label>
          <input
            className="form-field"
            placeholder="Password"
            name="password"
            onChange={handlePasswordChange}
            /* value={this.state.password} */
            type="password"
          />
        </div>
        <div className="form-group error-msg">
          {error ? <p className="text-danger">{error}</p> : null}
          <button type="submit">Login</button>
        </div>
        {/* <p>You can also log in with any of these services</p>
        <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
          Sign in with Google
        </button> */}
      </form>
      <p className="have-account">
        Don't have an account?{" "}
        <Link to="/signup" className="text-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}
