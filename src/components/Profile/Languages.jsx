import React from "react";
import america from "./Flags/american_flag.png";
import japan from "./Flags/japanese_flag.png";
import france from "./Flags/french_flag.png";
import germany from "./Flags/german_flag.png";
import spain from "./Flags/spanish_flag.png";
import { Link } from "react-router-dom";

export default function LanguageSelector() {
    return (
        <>
            <h1>Language</h1>
            <Link to="/profile">
                <button>Back</button>
            </Link>
            <div>
                <img src={america} alt="american flag" style={{ width: "50px" }}></img>
            </div>
            <div>
                <img src={spain} alt="spanish flag" style={{ width: "50px" }}></img>
            </div>
            <div>
                <img src={france} alt="french flag" style={{ width: "50px" }}></img>
            </div>
            <div>
                <img src={germany} alt="german flag" style={{ width: "50px" }}></img>
            </div>
            <div>
                <img src={japan} alt="japanese flag" style={{ width: "50px" }}></img>
            </div>
            <div>
                <button>Change language</button>
            </div>
        </>
    );
}
