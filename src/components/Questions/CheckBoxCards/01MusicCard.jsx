import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import axios from "axios";

export default function MusicCard() {
  const user = auth().currentUser;
  const [music, setMusic] = useState();

  async function getUserId() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let id = data.id;
    if (music === undefined) {
      setMusic(data.answers);
    }
    console.log(data, "dataanswers");
    return id;
  }
  getUserId();
  async function updateAnswers() {
    const userId = await getUserId();
    axios.put(`/users/${userId}`, { answers: music });
  }

  async function checkBox(i) {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    music.music[i] = !data.answers.music[i];
  }

  function renderCheckBox(...category) {
    if (music) {
      return music.music.map((e, i) => {
        return (
          <div>
            {e ? (
              <>
                <label for="fname">{category[i]}</label>
                <input
                  type="checkbox"
                  defaultChecked={e}
                  onChange={() => {
                    checkBox(i);
                  }}
                />
              </>
            ) : (
              <>
                <label for="fname">{category[i]}</label>
                <input
                  type="checkbox"
                  defaultChecked={e}
                  onChange={() => {
                    checkBox(i);
                  }}
                />
              </>
            )}
          </div>
        );
      });
    }
  }

  return (
    <>
      <h3> What style of music do you like? </h3>

      {renderCheckBox(
        "Classical",
        "Soundtracks",
        "Rock",
        "Blues",
        "Jazz",
        "Folk",
        "Pop",
        "J-Pop",
        "K-Pop",
        "Hip-Hop"
      )}

      <Link to="/interestsmenu">
        <button
          onClick={() => {
            updateAnswers();
          }}
        >
          Done!
        </button>
      </Link>
    </>
  );
}
