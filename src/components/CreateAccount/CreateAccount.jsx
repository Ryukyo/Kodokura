import React from "react";
import {
  Link,
} from 'react-router-dom'

export default function CreateAccount() {
  return (
    <>
      <header>Create Account</header>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Email Address" />
      <input type="text" placeholder="Password" />
      <input type="text" placeholder="Confirm Password" />
      <button>Create Account</button>
      <Link to="/">
        <button>Go back</button>
      </Link>
    </>
  );
}
