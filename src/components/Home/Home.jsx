import React, { useState, useEffect } from "react";
import Header from "../../helpers/Header";
import Clouds from "../Clouds/Clouds";
import { Link } from "react-router-dom";
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
    setLoading(true);

    let req = await axios.get(`/users/${user.email}`);

    let userData = req.data;
    let id = {
      id: userData.id,
    };

    axios
      .get(`/chatqueue/${id.id}`)
      .then((res) => {
        props.history.push({
          pathname: "/chatroom",
          state: { detail: res.data, userId: id.id },
        });
      })
      .catch(async (err) => {
        await axios.post("/chatqueue", id);
        startMatchmaking(id.id);
      });
  }

  async function startMatchmaking(userId) {
    let waitTime = 10000;
    let threshold = waitTime * 60;
    let count = 0;
    let flag = true;
    // wait until get 200
    while (flag) {
      await axios
        .get(`/chatqueue/${userId}`)
        .then((res) => {
          console.log("entering if block", res);
          flag = false;
          return props.history.push({
            pathname: "/chatroom",
            state: { detail: res.data, userId: userId },
          });
        })
        .catch(async (err) => {
          console.error("error during matchmaking", err);
        });

      // wait for 10 seconds
      await sleep(waitTime);

      // break if wait for so long
      count += waitTime;
      if (threshold <= count) {
        // TODO message for unmatch
        setLoading(false);
        flag = false;
      }
    }
  }

  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  return (
    <div className="home">

      <Header avatar={avatar} />

      <section className="look-chat">

      {loading ? (
        <div>Searching for matches...</div>
      ) : (
        <button onClick={queueUp}>Find someone <br/>to talk to.</button>
      )}

      </section>
      {/* This is a temporary link to check the chatbot */}
      {/* <Link to="/chatbot">
        <button>Testing chatbot</button>
      </Link> */}

    </div>
  );
}
