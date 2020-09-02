import React from 'react';
import avatar from '../Home/nw.png'


export default function Profile() {

    return (
        <>
        <h1>Profile</h1>
        <button>Back</button>
        <div>
        <img src={avatar} alt="avata" style={{width: "50px"}}></img>
        </div>
        <div>
        <button>Change Profile picture</button>
        </div>
        <button>Tell us about you again</button>
        <div>
        <button>Change language</button>
        </div>
        <div>
        <button>Delete account</button>
        </div>   
        </>
    )
}