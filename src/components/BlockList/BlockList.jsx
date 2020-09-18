import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser, getCurrentAuthUser, updateUser } from "../../helpers/backend";

import backIcon from "../../components/Utility/img/back.svg";

export default function BlockList() {
  // pass user object from parent component to get the id and avoid making another call to auth just to get the id?
  const currentUser = getCurrentAuthUser();
  const [blockList, setBlockList] = useState([]);

  async function getBlocklistAndId() {
    // let req = await axios.get(`/users/${currentUser.email}`);
    let userData = await getUser(currentUser.email);
    let id = userData.id;
    if (blockList === undefined) {
      return null;
    }
    setBlockList(userData.blocklist);
    return id;
  }

  useEffect(() => {
    getBlocklistAndId();
  }, []);

  async function updateBlocklist(username) {
    const userId = await getBlocklistAndId();
    let filteredAray = blockList.filter((obj) => {
      return obj.name !== username;
    });
    // console.log("filtered array", filteredAray);
    setBlockList(filteredAray);
    // Should work with putting the blockList but blockList remains filled even after setting?!
    // Could lead to side effects when multiple users on block list?
    await updateUser(userId, { blocklist: filteredAray });
    // await axios.put(`/users/${userId}`, { blocklist: filteredAray });
    // console.log("blocklist", blockList);
  }

  return (
    <div className="blocklist">
      <nav>
        <Link to="/home">
          <img src={backIcon} alt="back" />
        </Link>
        <p>Block List</p>
      </nav>

      <header>Blocked Users</header>

      <section>
        {blockList.length > 0 ? (
          <>
            {blockList.map((blockedUser, index) => {
              return (
                <div className="blocked-user-name" key={index}>
                  <p>{blockedUser.name}</p>
                  <button onClick={() => updateBlocklist(blockedUser.name)}>
                    Unblock
                  </button>
                </div>
              );
            })}
          </>
        ) : (
          <section className="no-block">No users on your block list</section>
        )}
      </section>
    </div>
  );
}
