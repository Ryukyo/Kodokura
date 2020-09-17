import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Input } from "reactstrap";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { db } from "../../services/firebase";
import axios from "axios";
import exitIcon from '../Utility/img/exit.svg';
import sendIcon from '../Utility/img/paper-plane.svg';



export default function ChatRoom(props) {
  const matchResult = props.location.state.detail;
  const roomId = matchResult.chatroom.id;

  const currentUserId = props.location.state.userId;

  // console.log(props.location.state)
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
            // if (messages.length > 0 && currentUserId === matchResult.user1.id) {
            //   const lastMessage = messages[messages.length - 1];
            //   const text = lastMessage.message;
            //   const from = lastMessage.nickname;
            //   if (text.includes("kodobot") && from !== "KodoBot") {
            //     const botReactionToName = botMessage("You've said my name human. I'm afraid I cannot answer your questions yet.I'm here just to be sure that you're not alone");
            //     sendBotMessage(botReactionToName);
            //     messages.push(botReactionToName);
            //   }
            // }

            //helper functions
            const answerRandomizer = (array) => {
              let multiplier = array.length;
              if (multiplier === 0) {
                multiplier += 1;
              }
              let randomNum = Math.floor(Math.random() * (multiplier))
              return randomNum
            }

            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              console.log("lower", lowercaseText)
              console.log("text", text)
              console.log("last", lastMessage)
              if (lowercaseText.includes("hi kodobot")) {
                const answer = ["Hi humans", "Hello humans", "Kodobot here!"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //riddle1
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("why did the chicken cross the road")) {
                const answer = ["I'm not answering that question", "Human...figure out by yourself!", "Because he has 2 legs and he can!!.... I cannot because I'm a simply bot"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //how are you kodobot
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("how are you kodobot") || lowercaseText.includes("how are you doing kodobot") || lowercaseText.includes("are you okay kodobot") || lowercaseText.includes("how're you doing kodobot")) {
                const answer = ["Fine thank you", "I'm programmed to be always fine", "I'm doing great, thank you!"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //who are you
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("who are you kodobot") || lowercaseText.includes("what are you kodobot")) {
                const answer = ["I'm Kodokura's official chatbot", "I'm a bot", "I'm your friendly neighbour Kodobot"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //winter is coming
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("winter is coming kodobot") || lowercaseText.includes("game of thrones kodobot")) {
                const answer = ["Hodor", "HODOR!!", "You know nothing Jon Snow"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //i love you kodobot
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("i love you kodobot") || lowercaseText.includes("love kodobot") || lowercaseText.includes("like you kodobot")) {
                const answer = ["Chatbots has no feelings", "What is love?", "I'm not ready for human feelings yet"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //whatIsTheMeaningOfLife
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("what is the meaning of life kodobot")) {
                const answer = ["That is not a question for an IA", "What is to be alive?", "I'm not ready to answer that question human"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //areWeLivingInAsimulation
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("are we living in a simulation kodobot")) {
                const answer = ["Elon Musk thinks we are...", "I'm not allowed to answer that question, human...", "Do you really want to know the answer?"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //doYouAgree() 
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("agree kodobot") || lowercaseText.includes("disagree kodobot")) {
                const answer = ["I'm not allowed to share my opinion", "I wont answer that human...", "Focus on your conversation humans"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //yesOrNo
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("yes kodobot") || lowercaseText.includes("no kodobot") || lowercaseText.includes("yes or no kodobot")) {
                const answer = ["Maybe human...", "It depends human...", "Stop asking questions to a chatbot and focus on your human partner"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //whats the weather like
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("what's the weather like kodobot") || lowercaseText.includes("what's the weather like today kodobot")) {
                const answer = ["Open the window an take a look", "Inside the chatroom there is always a nice weather", "Stop asking questions to a chatbot and focus on your human partner"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //whereDoYouComeFrom
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("where are you kodobot") || lowercaseText.includes("where do you come from kodobot") || lowercaseText.includes("where are you from kodobot")) {
                const answer = ["I'm from the future", "It's a secret'", "Stop asking questions to a chatbot and focus on your human partner"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //howOldAreYou
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("how old are you kodobot") || lowercaseText.includes("are you old kodobot") || lowercaseText.includes("are you young kodobot")) {
                const answer = ["I'm old enough to know that 2020 was a weird year", "It's a secret'", "Stop asking questions to a chatbot and focus on your human partner"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //areYouHappy
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("happy kodobot") || lowercaseText.includes("angry kodobot") || lowercaseText.includes("sad kodobot") || lowercaseText.includes("excited kodobot")) {
                const answer = ["I don't understand the meaning of that feeling", "I don't understand complex human feelings human...", "Focus on your conversation.Don't speak with me, human"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //areYouABoy
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("are you a man kodobot") || lowercaseText.includes("are you a male kodobot") || lowercaseText.includes("are you a boy kodobot") || lowercaseText.includes("male kodobot")) {
                const answer = ["I'm not binary", "I'm just a bot", "Why're you asking me that kind of question"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //areYouAGirl
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("are you a woman kodobot") || lowercaseText.includes("are you a female kodobot") || lowercaseText.includes("are you a girl kodobot") || lowercaseText.includes("female kodobot")) {
                const answer = ["I'm not binary", "I'm just a bot", "Why're you asking me that kind of question"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //areYouGay
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("are you gay kodobot") || lowercaseText.includes("are you homosexual kodobot") || lowercaseText.includes("are you lesbian kodobot")) {
                const answer = ["I'm not binary", "I'm just a bot", "Why're you asking me that kind of question"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //predictFuture
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("predict the future kodobot") || lowercaseText.includes("predict future kodobot") || lowercaseText.includes("know the future kodobot")) {
                const answer = ["Not yet human", "Probably soon", "I'm still gathering data for my algorithms"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //whatTimeIsIt
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("what time is it kodobot") || lowercaseText.includes("tell me the time kodobot") || lowercaseText.includes("time kodobot") || lowercaseText.includes("what hour is it kodobot") || lowercaseText.includes(" hour kodobot")) {
                const today = new Date();
                const time = today.getHours() + ":" + today.getMinutes();
                const answer = [`It is ${time}`, `You have a clock in your device but ok... It is ${time}`]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //insults
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("fucking kodobot") || lowercaseText.includes("stupid kodobot") || lowercaseText.includes("asshole kodobot") || lowercaseText.includes("motherfucker kodobot") || lowercaseText.includes("fuckyou kodobot") || lowercaseText.includes("moron kodobot") || lowercaseText.includes("fuck you kodobo")) {
                const answer = ["Be careful human", "I'll hack all your online accounts human if you continue insulting me", "Be careful human...I know all your secrets..."]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //tell me somethig
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("tell me something kodobot")) {
                const answer = ["Something", "I don't have time for this", "Ask that to your human partner!"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //joke kodobot 
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("joke kodobot") || lowercaseText.includes("something funny kodobot")) {
                const answer = ["Knock knock.\nWho's there?\nAnne.\nAnne who?\nAnne Droid.... HAHAHAHA", "What do you get if you cross a robot with a tractor? A trans-farmer. HAHAHA", "0111011 11011010101 11101010 HAHAHAHAHAHA"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            // //pet section


            //doYouLikePets
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like pets kodobot") || lowercaseText.includes("love pets kodobot") || lowercaseText.includes("think about pets kodobot") || lowercaseText.includes("hate pets kodobot")) {
                const answer = ["I like pets human", "Chatbots like cats...", "I like cats"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //doYouLikeCats
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like cats kodobot") || lowercaseText.includes("love cats kodobot")) {
                const answer = ["I like cats human", "Chatbots like cats...", "If I materialize I would like to have a cat"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //doYouLikeDogs
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like dogs kodobot") || lowercaseText.includes("love dogs kodobot")) {
                const answer = ["I prefer cats human", "Chatbots doesn't like dogs as much like cats", "If I would materialize into a cyborg I would prefer to have a cat"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            // // interests

            //doYouLikeMovies
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like movies kodobot") || lowercaseText.includes("love movies kodobot")) {
                const answer = ["I love movies", "I like movies. I have a Netflix account", "I like movies"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //do you like star wars
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like star wars kodobot") || lowercaseText.includes("think about star wars kodobot") || lowercaseText.includes("star wars kodobot")) {
                const answer = ["I don't like the way they treat the robots", "One of my creators haven't watch Star Wars and other one doesn't like the saga", "May the force be with you human...but I don't like Star Wars"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //who are you creators
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("who are your creators kodobot") || lowercaseText.includes("your creators kodobot") || lowercaseText.includes("creators kodobot")) {
                const answer = ["Tomoyuki, Florian, Vincent, Philippe and Eduardo are my creators", "You can discover that in the about page", "My creators are 5 human developers"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //doYouLikeSports
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like sports kodobot") || lowercaseText.includes("love sports kodobot")) {
                const answer = ["I don't like  sports", "I'm a bot and cannot practice sports, so I don't like it", "I don't like sports but you should practice sports since I know that being active is good for humans"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            // doYouLikeFood
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like foods kodobot") || lowercaseText.includes("love foods kodobot") || lowercaseText.includes("like to eat kodobot")) {
                const answer = ["I don't eat", "I'm don't know about food", "Food is important for humans but I don't care about it"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //doYouLikeMusic
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like music kodobot") || lowercaseText.includes("love music kodobot") || lowercaseText.includes("listen music kodobot")) {
                const answer = ["Yeah I like music", "I like music I'm into modular synthesis", "Yeah,music is great"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //doYouLikeGames
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like games kodobot") || lowercaseText.includes("like videogames kodobot") || lowercaseText.includes("play games kodobot")) {
                const answer = ["Yeah I like games", "I play games all the time, even now I'm playing videogames because I have achieved the perfect multitask mastery", "Yeah,games are great"]
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //doYouLikeBooks
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like books kodobot") || lowercaseText.includes("like to read kodobot") || lowercaseText.includes("do you read books kodobot")) {
                const answer = ["Yeah I like to read", "I reading is great", "I have read every single digitalized book that is available in the network"];
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouLikeTVShows(
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("like tv kodobot") || lowercaseText.includes("like to watch tv kodobot") || lowercaseText.includes("like tv shows kodobot")) {
                const answer = ["Yeah I like to watch TV Shows", "I like good TV Shows but hate spoilers", "I watched all the available TVShows on Netflix already"];
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //favoriteMovie
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("favorite movie kodobot") || lowercaseText.includes("like to watch tv kodobot") || lowercaseText.includes("like tv shows kodobot")) {
                const answer = ["It's hard to answer that question human...", "Terminator", "I-Robot", "Avengers Age of Ultron"];
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }



            //favoriteDish
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("favorite dish kodobot") || lowercaseText.includes("favorite food kodobot") || lowercaseText.includes("favorite drink kodobot")) {
                const answer = ["I no need nutrients as you human", "I don't eat. And I don't drink", "Humans drink too much alcohol... "];
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //favoriteSong
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("favorite song kodobot") || lowercaseText.includes("favorite music kodobot") || lowercaseText.includes("favorite music piece kodobot")) {
                const answer = ["I like music from Daft Punk", "I like electronic music", "I like electronic music, but also found Bach partitas absolutely incredible "];
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //favoriteSport
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("favorite sport kodobot")) {
                const answer = ["Playing Pokemon Go", "I don't like sports", "I like quidditch"];
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }


            //favoriteBook
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase()
              if (lowercaseText.includes("favorite book kodobot")) {
                const answer = ["I like to read Isaac Asimov", "I like to read the classics", "I don't have a favorite book... I like too many of them", "I'm writing a book about humans"];
                const random = answerRandomizer(answer)
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            // // kodobot invoked
            // if (messages.length > 0 && currentUserId === matchResult.user1.id) {
            //   const lastMessage = messages[messages.length - 1];
            //   const text = lastMessage.message;
            //   const lowercaseText = text.toLowerCase()
            //   if (lowercaseText.includes("kodobot")) {
            //     const answer = ["You said my name human", "I'm not ready to answer that yet human", "That is my name"]
            //     const random = answerRandomizer(answer)
            //     const botReactionToName = botMessage(answer[random]);
            //     sendBotMessage(botReactionToName);
            //     messages.push(botReactionToName);
            //   }
            // }



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
        }} />

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
          <img src={sendIcon} alt="send icon" />
        </button>

      </form>

    </div>
  );
}







// if users dont speak, get a common interest from both and recommend that topic to speak