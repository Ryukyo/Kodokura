import React, { useState, useEffect } from "react";
import { auth } from "../../services/firebase";
import axios from "axios";
import { Link } from "react-router-dom";
import backIcon from "../../components/Utility/img/back.svg";

export default function BlockList() {
  // pass user object from parent component to get the id and avoid making another call to auth just to get the id?
  const user = auth().currentUser;
  const [blockList, setBlocklist] = useState([]);

  async function getBlocklistAndId() {
    let req = await axios.get(`/users/${user.email}`);
    let data = req.data;
    let id = data.id;
    if (blockList === undefined) {
      return null;
    }
    setBlocklist(data.blocklist);
    console.log(blockList, "blocklist");
    return id;
  }

  useEffect(() => {
    getBlocklistAndId();
  }, []);

  async function updateBlocklist() {
    // needs to be provided the name/id of a user that is to be removed from the blocklist
    // then remove the user from the blockList in this component
    // and set the blocklist in the user object of the database to the new blockList
    const userId = await getBlocklistAndId();
    axios.put(`/users/${userId}`, { blocklist: blockList });
  }

  return (
    <div className="blocklist">
      <h1>Block List</h1>
      <Link to="/home">
        <img src={backIcon} alt="back" />
      </Link>
      {blockList !== undefined ? (
        <>
          {blockList.map((blockedUser, index) => {
            return (
              <div className="blocked-user-name" key={index}>
                <p>{blockedUser.name}</p>
                <button>Unblock</button>
              </div>
            );
          })}
        </>
      ) : (
        <div>No users on your block list</div>
      )}
    </div>
  );
}
