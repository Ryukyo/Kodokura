import React, { useState, useEffect } from "react";
import Header from "../../helpers/Header";
import {
  getCurrentAuthUser,
  updateUserStatus,
  getUser,
  getChatQueue,
  postChatQueue,
} from "../../helpers/backend";


import Planet from "../Canvas3D/Planet"

export default function Home(props) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = getCurrentAuthUser();

  async function getData() {
    const user = await getUser(currentUser.email);
    // setAvatar(user.avatar_url);
    setUsername(user.name)
  }

  useEffect(() => {
    getData();
  }, []);

  async function queueUp() {
    setLoading(true);

    let user = await getUser(currentUser.email);
    let id = {
      id: user.id,
    };

    getChatQueue(id.id)
      .then((res) => {
        updateUserStatus(id.id, "BUSY");
        props.history.push({
          pathname: "/chatroom",
          state: { detail: res.data, userId: id.id },
        });
      })
      .catch(async (err) => {
        postChatQueue(id.id);
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
      getChatQueue(userId)
        .then((res) => {
          flag = false;
          updateUserStatus(userId, "BUSY");

          return props.history.push({
            pathname: "/chatroom",
            state: { detail: res.data, userId: userId },
          });
        })
        .catch(async (err) => {
          console.log("error during matchmaking", err);
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

      <Header />

      <h3 className="welcome-user">Welcome {username}!</h3>


      <section className="look-chat">
        {loading ? (
          <div>

            <Planet />
          Searching for matches...
            <p> This is an anonymus application. Please, do not share personal information (addresses, phone numbers, birth date, age, bank account details, or email addresses) with others.</p>
          </div>


        ) : (
            <button onClick={queueUp}>
              Find someone <br />
            to talk to.
            </button>
          )}
      </section>
    </div>
  );
}
