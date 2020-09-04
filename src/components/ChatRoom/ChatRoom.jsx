import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
} from "reactstrap";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { db, auth } from "../../services/firebase";

//import css file;

export default function ChatRoom(props) {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState("");
  const [roomname, setRoomname] = useState("");
  const [newchat, setNewchat] = useState({
      roomname: "",
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
        await db.ref("chats").on(
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
            // chat.roomname = roomname;
            chat.nickname = nickname;
            chat.date = Moment(new Date()).format(" DD/MM/YYYY HH:mm:ss");
            chat.type = "message";
            const newMessage = db.ref("chats").push();
            newMessage.set(chat);
            setNewchat({ roomname: "", nickname: "", message: "", date: "", type: "" });
        };
        
        const onChange = (e) => {
            e.persist();
            setNewchat({ ...newchat, [e.target.name]: e.target.value });
        };
        
        const exitChat = (e) => {
            const chat = {
                roomname: "",
                nickname: "",
                message: "",
                date: "",
                type: "",
            };
            // chat.roomname = roomname;
            chat.nickname = nickname;
            chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss ");
            chat.message = `${nickname} left the room`;
            chat.type = "exit";
            const newMessage = db.ref("chats").push();
            newMessage.set(chat);
            
            db.ref("roomusers").once("value", (resp) => {
                let roomuser = [];
                roomuser = snapshotToArray(resp);
                const user = roomuser.find((x) => x.nickname === nickname);
                if (user !== undefined) {
                    const userRef = db.ref("roomusers" + user.key);
                    userRef.update({ status: "offline" });
                }
            });
            
            history.goBack();
        };
        
        console.log("nickname", newchat.nickname);
        
        return (
            <div className="Container">
      
            <div>
              
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => {
                        exitChat();
                      }}
                    >
                      Exit Chat
                    </Button>
                    <p><b> Partner:  {chats.map(item => <p>{item.nickname}</p>)}</b></p> 
                    
                    <Button> AddFriend </Button>
                    <Button> Block ! </Button>
                 
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
                          item.nickname === nickname
                            ? "RightBubble"
                            : "LeftBubble"
                        }`}
                      >
                        {item.nickname === nickname ? (
                          <span className="MsgName"> Me</span>
                        ) : (
                          <span className="MsgName" >
                            {" "}
                            <u>{item.nickname}</u> 
                          </span>
                        )}
                        <span className="MsgDate"> at {item.date}</span>
                        <p>{item.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ScrollToBottom>
            <footer className="StickyFooter">
              <Form className="MessageForm" onSubmit={submitMessage}>
                
                  <Input
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Enter message here"
                    value={newchat.message}
                    onChange={onChange}
                  />
                  
                    <Button variant="primary" type="submit">
                      Send
                    </Button>
                    </Form>
                 </footer>
        </div>
  );
}
