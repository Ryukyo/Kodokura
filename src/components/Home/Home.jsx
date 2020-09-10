import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../helpers/Header";
import Clouds from "../Clouds/Clouds";

import axios from "axios";
import { auth } from "../../services/firebase";

export default function Home(props) {
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;

  async function getData() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;

    setAvatar(data.avatar_url);
  }

  useEffect(() => {
    getData();
  }, []);

  async function queueUp() {
    let req = await axios.get(`/users/${user.email}`);

    let userData = req.data;
    let id = {
      id: userData.id,
    };

    axios
      .get(`/chatqueue/${id.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("if block in queue", res.status);
          props.history.push("/chatroom");
        }
      })
      .catch(async (err) => {
        console.log(id);
        setLoading(true);
        await axios.post("/chatqueue", id);
        //startMatchmaking(id.id);
      });
  }

  async function startMatchmaking(userId) {
    let response = await axios.get(`/chatqueue/${userId}`);
    let waitTime = 10000;
    // wait until get 200
    while (true) {
      if (response.status === 200) {
        console.log("entering if block", response);
        return props.history.push({
          pathname: "/chatroom",
          state: { detail: response.data },
        });
      }
      // wait for 10 seconds
      await sleep(waitTime);
      // break if wait for so long
    }
  }

  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  return (
    <div className="Home">
      <Header avatar={avatar} />
      {loading ? (
        <div>Searching for matches...</div>
      ) : (
        <button onClick={queueUp}>Find someone to talk to.</button>
      )}
      {/* </Link> */}
      <Clouds />
    </div>
  );
}
