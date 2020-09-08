import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle } from "../../helpers/auth";
<<<<<<< HEAD
import Clouds from '../Clouds/Clouds';
=======
import axios from 'axios';
import { auth } from '../../services/firebase';
>>>>>>> d61447f665e7ab5afae000bfc62b6383073409be

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
    <div className="LogIn">
      <form
        className="mt-5 py-5 px-5"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>
          Login to
          <Link className="title ml-2" to="/">
            Kodokura
          </Link>
        </h1>
        <p className="lead">Fill in the form below to login to your account.</p>
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleEmailChange}
          /* value={this.state.email} */
          />
          <label for="name" className="form-label">Email</label>
        </div>
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Password"
            name="password"
            onChange={handlePasswordChange}
            /* value={this.state.password} */
            type="password"
          />
          <label for="name" className="form-label">Password</label>
        </div>
        <div className="form-group">
          {error ? <p className="text-danger">{error}</p> : null}
            <button className="btn btn-primary px-5" type="submit">
              Login
            </button>

        </div>
        {/* <p>You can also log in with any of these services</p>
        <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
          Sign in with Google
        </button> */}
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      <Link to="/">
        <button>Go back</button>
      </Link>
      <Clouds/>
    </div>
  );
}
