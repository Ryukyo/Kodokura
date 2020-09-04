import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp, signInWithGoogle } from "../../helpers/auth";

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
    <div className="container">
      <form className="mt-5 py-5 px-5" onSubmit={handleSubmit}>
        <h1>
          Sign Up to
          <Link className="title ml-2" to="/">
            Kodokura
          </Link>
        </h1>
        <p className="lead">Fill in the form below to create an account.</p>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Name"
            name="name"
            type="text"
            onChange={handleNameChange}
            // value={email}
          ></input>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleEmailChange}
            // value={email}
          ></input>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handlePasswordChange}
            // value={password}
            type="password"
          ></input>
        </div>

        <div className="form-group">
          {error ? <p className="text-danger">{error}</p> : null}
          {/* <Link to="/questions"> */}
          <button className="btn btn-primary px-5" type="submit">
            Sign up
          </button>
          {/* </Link> */}
        </div>
        {/* <p>You can also sign up with any of these services</p>
            <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
              Sign up with Google
            </button> */}
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      <Link to="/">
        <button>Go back</button>
      </Link>
    </div>
  );
}
