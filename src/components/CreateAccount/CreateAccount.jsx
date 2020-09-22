import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp, signInWithGoogle } from "../../helpers/auth";
import { createUser } from "../../helpers/backend";
import AgeCheckDialog from "./AgeCheckDialog";

//img
import usernameIcon from '../Utility/img/user.svg';
import emailIcon from "../Utility/img/contact.svg";
import passwordIcon from "../Utility/img/lock.svg";
import backIcon from "../Utility/img/back.svg";
import logo from "../Utility/img/logo-wh.png";

export default function CreateAccount() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

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
      await signUp(email, password, name);
      await createUser(name, email);
    } catch (err) {
      setError(err.message);
    }
  }

  /* async googleSignIn() {
        try {
          await signInWithGoogle();
        } catch (error) {
          this.setState({ error: error.message });
        }
      } */

  return (
    <div className="createAccount">
      <nav>
        <Link to="/">
          <img src={backIcon} alt="back" />
        </Link>
        <p>Sign Up</p>
      </nav>

      <header>
        <Link className="main-link" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </header>

      <AgeCheckDialog />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="username-icom">
            <img src={usernameIcon} alt="" />
          </label>
          <input
            type="input"
            className="form-field"
            placeholder="Username"
            name="name"
            onChange={handleNameChange}
            value={name}
            autoComplete="off"
          ></input>
        </div>
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
            value={email}
            autoComplete="off"
          ></input>
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
            type="password"
            value={password}
          ></input>
        </div>

        <div className="form-groupe">
          {error ? <p className="text-danger">{error}</p> : null}

          <button className="btn btn-primary px-5" type="submit">
            Sign Up
          </button>
        </div>
        {/* <p>You can also sign up with any of these services</p>
            <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
              Sign up with Google
            </button> */}
      </form>

      <p className="have-account">
        Already have an account?{" "}
        <Link to="/login" className="text-link">
          Login
        </Link>
      </p>
    </div>
  );
}
