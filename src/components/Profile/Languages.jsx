import React from "react";
import america from "./Flags/american_flag.png";
import japan from "./Flags/japanese_flag.png";
import france from "./Flags/french_flag.png";
import germany from "./Flags/german_flag.png";
import spain from "./Flags/spanish_flag.png";
import { Link } from "react-router-dom";
import axios from "axios";

import { auth } from "../../services/firebase";

//img
import backIcon from '../Utility/img/back.svg'

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
    
    <div className="language">

        <nav>
            <Link to="/profile">
            <img src={backIcon} alt="back"/>
            </Link>
            <p>Select the language you speak</p>
        </nav>
        <section className="flag">
            <img
                src={america}
                alt="american flag"
                onClick={() => updateLanguage("en")}
                className="noSelect"
            ></img>
            <img
                src={spain}
                alt="spanish flag"
                onClick={() => updateLanguage("es")}
            ></img>
            <img
                src={france}
                alt="french flag"
                onClick={() => updateLanguage("fr")}
            ></img>
            <img
                src={germany}
                alt="german flag"
                onClick={() => updateLanguage("de")}
            ></img>
            <img
                src={japan}
                alt="japanese flag"
                onClick={() => updateLanguage("ja")}
            ></img>
        </section>

        <div className="change-language-btn">
            <Link to="/home">
                <button>Change language and start chatting</button>
            </Link>
            <Link to="/profile">
                <button>Change language and go back to profile</button>
            </Link>
        </div>

    </div>

    </>
    );
}
