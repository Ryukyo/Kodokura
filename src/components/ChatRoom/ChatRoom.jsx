import React, { useState, useEffect } from "react";
import Header from "../../helpers/Header";
import { auth, db, firestore } from "../../services/firebase";

export default function ChatRoom(props) {
  const [user, setUser] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);

  const myRef = React.createRef();

  useEffect(() => {
    setReadError(null);
    setLoadingChats(true);
    const chatArea = myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        setChats(chats);
        chatArea.scrollBy(0, chatArea.scrollHeight);
        setLoadingChats(false);
      });
    } catch (error) {
      setReadError(error.message);
      setLoadingChats(false);
    }
  }, chats);

  function handleChange(event) {
    setContent(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setWriteError(null);
    const chatArea = myRef.current;
    try {
      await db.ref("chats").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setContent("");
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  }

  function formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  return (
    <div>
      <Header />

      <div className="chat-area" ref={myRef}>
        {/* loading indicator */}
        {loadingChats ? (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
        {/* chat area */}
        {chats.map((chat) => {
          return (
            <p
              key={chat.timestamp}
              className={
                "chat-bubble " + (user.uid === chat.uid ? "current-user" : "")
              }
            >
              {chat.content}
              <br />
              <span className="chat-time float-right">
                {formatTime(chat.timestamp)}
              </span>
              <br />
              <span className="chat-user float-right">{user.email}</span>
            </p>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="mx-3">
        <textarea
          className="form-control"
          name="content"
          onChange={handleChange}
          /* value={this.state.content} */
        ></textarea>
        {readError ? <p className="text-danger">{readError}</p> : null}
        <button type="submit" className="btn btn-submit px-5 mt-4">
          Send
        </button>
      </form>
      <div className="py-5 mx-3">
        Login in as: <strong className="text-info">{user.email}</strong>
      </div>
    </div>
  );
}
