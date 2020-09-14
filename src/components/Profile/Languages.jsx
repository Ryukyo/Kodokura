import React from "react";
import america from "./Flags/american_flag.png";
import japan from "./Flags/japanese_flag.png";
import france from "./Flags/french_flag.png";
import germany from "./Flags/german_flag.png";
import spain from "./Flags/spanish_flag.png";
import { Link } from "react-router-dom";

//img
import backIcon from '../Utility/img/back.svg'

export default function LanguageSelector() {
    return (
        <>
        <div className="language">

            <nav>
                <Link to="/profile">
                <img src={backIcon} alt="back"/>
                </Link>
                <p>Selecth the language you speak.</p>
            </nav>

            <section className="flag">
                
                    <img src={america} alt="american flag"></img>
                    <img src={spain} alt="spanish flag"></img>
                    <img src={france} alt="french flag"></img>
                    <img src={germany} alt="german flag"></img>
                    <img src={japan} alt="japanese flag"></img>
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
