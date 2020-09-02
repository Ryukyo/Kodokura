import { db } from "../services/firebase";

export function readChats() {
  let chats = [];
  db.ref("chats").on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      chats.push(snap.val());
    });
    return chats;
  });
}

export function writeChats(message) {
  return db.ref("chats").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid,
  });
}
