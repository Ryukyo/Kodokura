import React, { useState, useEffect } from "react";
import america from "./Flags/american_flag.png";
import japan from "./Flags/japanese_flag.png";
import france from "./Flags/french_flag.png";
import germany from "./Flags/german_flag.png";
import spain from "./Flags/spanish_flag.png";
import { Link } from "react-router-dom";

import {
  getUser,
  getCurrentAuthUser,
  updateLanguage as updateLanguageReq,
} from "../../helpers/backend";

//img
import backIcon from "../Utility/img/back.svg";

export default function LanguageSelector() {
  const currentUser = getCurrentAuthUser();
  const [lang, setLang] = useState("");

  async function getLang() {
    const user = await getUser(currentUser.email);
    let language = user.lang;
    setLang(language);
  }

  async function updateLanguage(language) {
    const user = await getUser(currentUser.email);
    updateLanguageReq(user.id, language);
  }

  useEffect(() => {
    getLang();
  }, []);

  return (
    <>
      <div className="language">
        <nav>
          <Link to="/profile">
            <img src={backIcon} alt="back" />
          </Link>
          <p>Select the language you speak</p>
        </nav>
        <section className="flag">
          <img
            src={america}
            alt="en"
            className={"en" === lang ? "selected-lang" : ""}
            onClick={(e) => {
              setLang(e.target.alt);
              updateLanguage("en");
            }}
          ></img>
          <img
            src={spain}
            alt="es"
            className={"es" === lang ? "selected-lang" : ""}
            onClick={(e) => {
              setLang(e.target.alt);
              updateLanguage("es");
            }}
          ></img>
          <img
            src={france}
            alt="fr"
            className={"fr" === lang ? "selected-lang" : ""}
            onClick={(e) => {
              setLang(e.target.alt);
              updateLanguage("fr");
            }}
          ></img>
          <img
            src={germany}
            alt="de"
            className={"de" === lang ? "selected-lang" : ""}
            onClick={(e) => {
              setLang(e.target.alt);
              updateLanguage("de");
            }}
          ></img>
          <img
            src={japan}
            alt="ja"
            className={"ja" === lang ? "selected-lang" : ""}
            onClick={(e) => {
              setLang(e.target.alt);
              updateLanguage("ja");
            }}
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
