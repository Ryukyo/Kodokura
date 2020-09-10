import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Input } from "reactstrap";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { db, auth } from "../../services/firebase";
import _ from "lodash";

export default function ChatRoom(props) {
  // TODO replace this name to chat room id from props
  const roomId = "testRoom3";

  const [chats, setChats] = useState([]);
  //const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState("");
  const [roomname, setRoomname] = useState(roomId);
  const [newchat, setNewchat] = useState({
    roomname: roomId,
    nickname: "",
    message: "",
    date: "",
    type: "",
  });
  const history = useHistory();
  const { room } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setNickname(auth().currentUser.displayName);
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

  /*
  useEffect(() => {
    const fetchData = async () => {
      console.log("displayname in chat", auth().currentUser.displayName);
      setNickname(auth().currentUser.displayName);
      setRoomname(room);
      await db.ref("roomusers").on(
        "value",
        (resp2) => {
          setUsers([]);
          const roomusers = snapshotToArray(resp2);
          setUsers(roomusers.filter((x) => x.status === "online"));
        },
        (error) => console.log("error in fetch roomusers", error)
      );
    };

    fetchData();
  }, [room, roomname]);
*/
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

    /*
    db.ref("roomusers").once("value", (resp) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find((x) => x.nickname === nickname);
      if (user !== undefined) {
        const userRef = db.ref("roomusers" + user.key);
        userRef.update({ status: "offline" });
      }
    });
    */

    history.goBack();
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
            {_.uniqBy(chats, "nickname").map((item) => (
              <p>{item.nickname}</p>
            ))}
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
