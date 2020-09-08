import React from "react";
import avatar from "./nw.png";
import { Link } from "react-router-dom";
import Header from "../../helpers/Header";

import axios from 'axios';
import { auth } from "../../services/firebase";



export default function Home() {

  const user = auth().currentUser;
  console.log(user.email);
  
  async function getData(email) {
    let req = await axios.get(`/users/${email}`);
    let data = req.data;

    console.log(data);
  }

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
