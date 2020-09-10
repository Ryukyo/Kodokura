import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import axios from 'axios';


export default function MusicCard() {

    const [checked, setChecked] = useState(true);

    const user = auth().currentUser;
    const [music, setMusic] = useState();

    async function getUserId() {
        let req = await axios.get(`/users/${user.email}`)
        let data = req.data;
        let id = data.id;
        if (music === undefined) {
            setMusic(data.answers)
            console.log(typeof (data.answers.music[0]), "dataanswers");
        }
        return id;
    };

    getUserId();


    async function updateAnswers() {
        const userId = await getUserId();
        axios.put(`/users/${userId}`, { answers: music });
    };

    function checkBox(i) {
        if (music.music[i] === false) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <>
            <h3> What style of music do you like? </h3>
            <div>
                <label for="fname">Classical</label>
                <input type="checkbox" checked={checked} value={checked} onChange={(e) => {
                    setChecked(!checked)
                    music.music[0] = e.target.value === "true" ? true : false;
                    console.log('music from onchange', music)
                }} />
            </div>
            <div>
                <label for="fname">Soundtracks</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">Rock</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">Blues</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">Jazz</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">Folk</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">Pop</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">J-Pop</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">K-Pop</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">Electronic</label>
                <input type="checkbox" value={true} />
            </div>
            <div>
                <label for="fname">Hip-Hop</label>
                <input type="checkbox" value={true} />
            </div>

            <Link to="/interestsmenu">
                <button onClick={() => {
                    updateAnswers();
                    console.log('music from music page', music);
                }}>Done!</button>
            </Link>
        </>
    )
}
