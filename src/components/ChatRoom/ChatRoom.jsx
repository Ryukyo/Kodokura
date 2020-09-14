import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Input } from "reactstrap";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { db } from "../../services/firebase";
import axios from "axios";
// import { answerRandomizer, hiKodobot, whyDidTheChicken, howAreYouKodobot, invokedKodobotName, whoAreYouKodobot, winterIsComing, iLoveYouKodobot, whatIsTheMeaningOfLife, areWeLivingInAsimulation, doYouAgree, yesOrNo, whereDoYouComeFrom, areYouHappy, areYouABoy, areYouAGirl, areYouGay, predictFuture, whatTimeIsIt, insults } from "../ChatBot/ChatBotHelper.jsx";
// import { doYouLikePets, doYouLikeCats, doYouLikeDogs } from "../ChatBot/ChatBotHelper.jsx";
// import { doYouLikeMovies, doYouLikeSports, doYouLikeFood, doYouLikeMusic, doYouLikeGames, doYouLikeBooks, doYouLikeTVShows, favoriteMovie, favoriteDish, favoriteSong, favoriteSport, favoriteBook } from "../ChatBot/ChatBotHelper.jsx";


export default function ChatRoom(props) {
  const matchResult = props.location.state.detail;
  const roomId = matchResult.chatroom.id;

  const currentUserId = props.location.state.userId;
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
    chat.nickname = "KodoBot"; // bot name here
    chat.date = Moment(new Date()).format(" DD/MM/YYYY HH:mm:ss");
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
              if (text.includes("hi") && from !== "KodoBot") {
                const botReactionToName = botMessage("You've said my name human. I'm afraid I cannot answer your questions yet.I'm here just to be sure that you're not alone");
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //helper functions
            const answerRandomizer = (array) => {
              let randomNum = Math.round(Math.random() * array.length)
              return randomNum
            }

            const hiKodobot = () => {
              if (messages.length > 0 && currentUserId === matchResult.user1.id) {
                const lastMessage = messages[messages.length - 1];
                const text = lastMessage.message;
                const lowercaseText = text.toLowerCase()
                if (lowercaseText.includes("hi kodobot")) {
                  const answer = ["Hi humans", "Hello humans", "Kodobot here!"]
                  const random = answerRandomizer(answer)
                  const botReactionToName = botMessage(answer[random]);
                  sendBotMessage(botReactionToName);
                  messages.push(botReactionToName);
                }
              }
            }

            answerRandomizer();
            hiKodobot();
            // whyDidTheChicken();
            // howAreYouKodobot();
            // invokedKodobotName();
            // whoAreYouKodobot();
            // winterIsComing();
            // iLoveYouKodobot();
            // whatIsTheMeaningOfLife();
            // areWeLivingInAsimulation();
            // doYouAgree();
            // yesOrNo();
            // whereDoYouComeFrom();
            // areYouHappy();
            // areYouABoy();
            // areYouAGirl();
            // areYouGay();
            // predictFuture();
            // whatTimeIsIt();
            // insults();

            // doYouLikePets();
            // doYouLikeCats();
            // doYouLikeDogs();

            // doYouLikeMovies();
            // doYouLikeSports();
            // doYouLikeFood();
            // doYouLikeMusic();
            // doYouLikeGames();
            // doYouLikeBooks();
            // doYouLikeTVShows();
            // favoriteMovie();
            // favoriteDish();
            // favoriteSong();
            // favoriteSport();
            // favoriteBook();

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
                    className={`${item.nickname === nickname ? "RightBubble" : "LeftBubble"
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







// if users dont speak, get a common interest from both and recommend that topic to speak