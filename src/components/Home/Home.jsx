import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../helpers/Header";

import axios from 'axios';
import { auth } from "../../services/firebase";



export default function Home() {

  const [avatar, setAvatar] = useState('');

  const user = auth().currentUser;
  console.log(user.email);
  
  async function getData() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let avatar = data.avatar_url

    console.log(avatar);
    setAvatar(avatar);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <Header avatar={avatar}/>
      <h2>Home page</h2>
      <Link to="/chatroom">
        <button>Find someone to talk to.</button>
      </Link>
    </>
  );
}
