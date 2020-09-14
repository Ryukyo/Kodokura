import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Input } from "reactstrap";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { db } from "../../services/firebase";
import axios from "axios";

//img
import exitIcon from '../Utility/img/exit.svg';
import sendIcon from '../Utility/img/paper-plane.svg';

export default function ChatRoom(props) {
  const matchResult = props.location.state.detail;
  const roomId = matchResult.chatroom.id;

  const currentUserId = props.location.state.userId;

  console.log(props.location.state)
  let currentUser = matchResult.user1;
  let otherUser = matchResult.user2;
  if (currentUser.id !== currentUserId) {
    currentUser = matchResult.user2;
    otherUser = matchResult.user1;
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

  const botMessage = (text) => {
    // define new message
    const chat = newchat;
    chat.roomname = roomId;
    chat.type = "message";
    chat.nickname = "R2D2"; // bot name here
    chat.date = Moment(new Date()).format("HH:mm");
    chat.message = text;
    return chat;
  }

  const sendBotMessage = (message) => {
    // send to realitime DB => automatically synchronized and displayed
    const newMessage = db.ref("chats").push();
    newMessage.set(message);

    // update react status and re-render
    setNewchat({
      roomname: roomId,
      nickname: "",
      message: "",
      date: "",
      type: "",
    });
  }

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
            // create message array from DB
            const messages = snapshotToArray(resp);
            if (messages.length < 1) {
              // create bot chat message
              const welcomeMessage = botMessage(`Welcome ${currentUser.name} and ${matchResult.user2.name}!`);
              // send message to Realtime DB
              sendBotMessage(welcomeMessage);
              // also add message to messages array
              messages.push(welcomeMessage);
            }
            // TODO only user1 sends bot message / not good, because user1 not loggedin or leave room, bot never response
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const from = lastMessage.nickname;
              if (text.includes("hi") && from !== "R2D2") {
                const botReactionToName = botMessage("You've said my name human. I'm afraid I cannot answer your questions yet.I'm here just to be sure that you're not alone");
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            // change status to show messages
            setChats(messages);
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
    chat.date = Moment(new Date()).format("HH:mm");
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

  const addFriend = (e) => { };

  // Maybe add functionality to check whether user is already on block list?
  // But if a user is already on block list, you should never meet him again and come into a situation where to block him again
  const addBlock = async (e) => {
    // get current block list of current user and push an object with the name and id of the user to be blocked
    let blocklistToUpdate = currentUser.blocklist;
    blocklistToUpdate.push({
      name: otherUser.name,
      id: otherUser.id,
    });

    console.log(blocklistToUpdate);
    console.log("current user", currentUserId);
    await axios.put(`/users/${currentUserId}`, {
      blocklist: blocklistToUpdate,
    });
  };

//   <p className="partner">
//   <div>
//     <p>{matchResult.user1.name}</p>
//     <p>{matchResult.user2.name}</p>
//   </div>
// </p>

  return (
    <div className="chat-container">
      <nav className="chatnav">

        <img src={exitIcon} alt="exit icon" onClick={() => {
          exitChat();
        }}/>

        <p>Chatroom</p>
        
        <div className="black-add">
          <Button
            onClick={() => {
              addFriend();
            }}
          >
            {" "}
            Add Friend{" "}
          </Button>
          <Button
            onClick={() => {
              addBlock();
            }}
          >
            {" "}
            Block User{" "}
          </Button>
        </div>
      </nav>

      <ScrollToBottom className="chat-content">
        {chats.map((item, idx) => (
          <div key={idx} className="MessageBox">
            {item.type === "join" || item.type === "exit" ? (
              <div className="ChatStatus">
                <p className="ChatDate">{item.date}</p>
                <p className="ChatContentCenter">{item.message}</p>
              </div>
            ) : (
                <div className="ChatMessage">
                  <div
                    className={`${item.nickname === nickname ? "RightBubble" : "LeftBubble"
                      }`}
                  >
                    {item.nickname === nickname ? (
                      <p className="MsgName"> Me</p>
                    ) : (
                        <p className="MsgName">
                          {" "}
                          <u>{item.nickname}</u>
                        </p>
                      )}
                    <p className="MsgDate">{item.date}</p>
                    <p className="message">{item.message}</p>
                  </div>
                </div>
              )}
          </div>
        ))}
      </ScrollToBottom>

      
      <form className="message-form" onSubmit={submitMessage}>
        <p>{nickname}</p>

        <div className="form-group">
          <input
            type="text"
            name="message"
            className="form-field"
            placeholder="Enter message here"
            value={newchat.message}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <button variant="primary" type="submit">
          <img src={sendIcon} alt="send icon"/>
        </button>

      </form>

    </div>
  );
}







// if users dont speak, get a common interest from both and recommend that topic to speak