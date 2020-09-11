import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Input } from "reactstrap";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { db } from "../../services/firebase";
import axios from "axios";

export default function ChatRoom(props) {
  const matchResult = props.location.state.detail;
  const roomId = matchResult.chatroom.id;

  const currentUserId = props.location.state.userId;
  let currentUser = matchResult.user1;
  if (currentUser.id !== currentUserId) {
    currentUser = matchResult.user2;
  }

  const [chats, setChats] = useState([]);
  const [nickname, setNickname] = useState(currentUser.name);
  const [roomname, setRoomname] = useState(roomId);
  const [newchat, setNewchat] = useState({
    roomname: roomId,
    nickname: currentUser.name,
    message: "",
    date: "",
    type: "",
  });
  const history = useHistory();
  const { room } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setNickname(currentUser.name);
      await db
        .ref("chats")
        .orderByChild("roomname")
        .equalTo(roomId)
        .on(
          "value",
          (resp) => {
            setChats([]);
            setChats(snapshotToArray(resp));
          },
          (error) => {
            console.log("error in fetch chats", error);
          }
        );
    };

    fetchData();
  }, [room, roomname]);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newchat;
    chat.roomname = roomId;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format(" DD/MM/YYYY HH:mm:ss");
    chat.type = "message";
    const newMessage = db.ref("chats").push();
    newMessage.set(chat);
    setNewchat({
      roomname: roomId,
      nickname: "",
      message: "",
      date: "",
      type: "",
    });
  };

  const onChange = (e) => {
    e.persist();
    setNewchat({ ...newchat, [e.target.name]: e.target.value });
  };

  const exitChat = (e) => {
    const chat = {
      roomname: roomId,
      nickname: "",
      message: "",
      date: "",
      type: "",
    };
    chat.roomname = roomId;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss ");
    chat.message = `${nickname} left the room`;
    chat.type = "exit";
    const newMessage = db.ref("chats").push();
    newMessage.set(chat);

    axios.delete(`/chatqueue/${roomId}`);

    history.push("/home");
  };

  const addFriend = (e) => {};

  const addBlock = (e) => {};

  return (
    <div className="Container">
      <div className="ChatNav">
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            exitChat();
          }}
        >
          Exit Chat
        </Button>
        <p className="partner">
          <b>
            {" "}
            Partner:{" "}
            <div>
              <p>{matchResult.user1.name}</p>
              <p>{matchResult.user2.name}</p>
            </div>
          </b>
        </p>

        <Button
          onClick={() => {
            addFriend();
          }}
        >
          {" "}
          AddFriend{" "}
        </Button>
        <Button
          onClick={() => {
            addBlock();
          }}
        >
          {" "}
          Block !{" "}
        </Button>
      </div>

      <ScrollToBottom className="ChatContent">
        {chats.map((item, idx) => (
          <div key={idx} className="MessageBox">
            {item.type === "join" || item.type === "exit" ? (
              <div className="ChatStatus">
                <span className="ChatDate">{item.date}</span>
                <span className="ChatContentCenter">{item.message}</span>
              </div>
            ) : (
              <div className="ChatMessage">
                <div
                  className={`${
                    item.nickname === nickname ? "RightBubble" : "LeftBubble"
                  }`}
                >
                  {item.nickname === nickname ? (
                    <span className="MsgName"> Me</span>
                  ) : (
                    <span className="MsgName">
                      {" "}
                      <u>{item.nickname}</u>
                    </span>
                  )}
                  <span className="MsgDate"> at {item.date}</span>
                  <p className="message">{item.message}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </ScrollToBottom>
      <footer className="StickyFooter">
        <Form className="MessageForm" onSubmit={submitMessage}>
          <div className="form-group">
            <Input
              type="text"
              name="message"
              className="form-field"
              placeholder="Enter message here"
              value={newchat.message}
              onChange={onChange}
            />
            <label for="message" className="form-label">
              Enter message here
            </label>
          </div>

          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </footer>
    </div>
  );
}
