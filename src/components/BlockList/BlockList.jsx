import React, { useState } from "react";
import { auth } from "../../services/firebase";
import axios from "axios";

export default function BlockList() {
  // pass user object from parent component to get the id and avoid making another call to auth just to get the id?
  const user = auth().currentUser;
  const [blockList, setBlocklist] = useState();

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
  getBlocklistAndId();

  async function updateBlocklist() {
    // needs to be provided the name/id of a user that is to be removed from the blocklist
    // then remove the user from the blockList in this component
    // and set the blocklist in the user object of the database to the new blockList
    const userId = await getBlocklistAndId();
    axios.put(`/users/${userId}`, { blocklist: blockList });
  }

  return (
    <>
      <h1>Block List</h1>
      <button>back</button>
      <div className="blocked-user-name">
        <img></img>
        <p>Eduardo</p>
        <button>Unblock</button>
      </div>
      <div className="blocked-user-name">
        <img></img>
        <p>Philippe</p>
        <button>Unblock</button>
      </div>
      <img></img>
      <div className="blocked-user-name">
        <p>Florian</p>
        <button>Unblock</button>
      </div>
      <div className="blocked-user-name">
        <p>Vincent</p>
        <button>Unblock</button>
      </div>
      <div className="blocked-user-name">
        <p>Tomoyuki</p>
        <button>Unblock</button>
      </div>
    </>
  );
}
