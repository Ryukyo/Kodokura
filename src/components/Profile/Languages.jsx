import React from "react";
import america from "./Flags/american_flag.png";
import japan from "./Flags/japanese_flag.png";
import france from "./Flags/french_flag.png";
import germany from "./Flags/german_flag.png";
import spain from "./Flags/spanish_flag.png";
import { Link } from "react-router-dom";
import axios from "axios";

import { auth } from "../../services/firebase";

export default function LanguageSelector() {
  const user = auth().currentUser;
  async function getUserId() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let id = data.id;
    return id;
  }

  async function updateLanguage(language) {
    const userId = await getUserId();
    axios.put(`/users/${userId}`, { lang: language });
  }

  return (
    <>
      <h1>Language</h1>
      <Link to="/profile">
        <button>Back</button>
      </Link>
      <div>
        <img
          src={america}
          alt="american flag"
          style={{ width: "50px" }}
          onClick={() => updateLanguage("en")}
        ></img>
      </div>
      <div>
        <img
          src={spain}
          alt="spanish flag"
          style={{ width: "50px" }}
          onClick={() => updateLanguage("es")}
        ></img>
      </div>
      <div>
        <img
          src={france}
          alt="french flag"
          style={{ width: "50px" }}
          onClick={() => updateLanguage("fr")}
        ></img>
      </div>
      <div>
        <img
          src={germany}
          alt="german flag"
          style={{ width: "50px" }}
          onClick={() => updateLanguage("de")}
        ></img>
      </div>
      <div>
        <img
          src={japan}
          alt="japanese flag"
          style={{ width: "50px" }}
          onClick={() => updateLanguage("ja")}
        ></img>
      </div>
      <div>
        <button>Change language</button>
      </div>
    </>
  );
}
