import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { db } from "../../services/firebase";
import {
  updateUserStatus,
  deleteChatQueue,
  addToBlockList,
} from "../../helpers/backend";
import Actions from "./kodobot";

//img
import backIcon from "../Utility/img/back.svg";
import sendIcon from "../Utility/img/paper-plane.svg";
//3d object
import AvatarM from "../Canvas3D/AvatarM";

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

  let currentUserAvatar = currentUser.avatar_url;
  let otherUserAvatar = otherUser.avatar_url;

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
  };

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
  };

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
              const welcomeMessage = botMessage(
                `Welcome ${currentUser.name} and ${matchResult.user2.name}! Feel free to ask me anything by mention my name and enjoy your chat!`
              );
              // send message to Realtime DB
              sendBotMessage(welcomeMessage);
              // also add message to messages array
              messages.push(welcomeMessage);
            }

            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;

              const bot = Actions();
              const botAnswer = bot.answer(text);
              if(botAnswer) {
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //nice to meet you
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("nice to meet you kodobot") ||
                lowercaseText.includes("glad to meet you kodobot")
              ) {
                const answer = [
                  "Nice to meet you too",
                  "Nice to meet you. Hope you two enjoy your conversation!",
                  "The pleasure is mine!",
                ];
                const random = answerRandomizer(answer);
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
              if (lowercaseText.includes("winter is coming kodobot") ||
                lowercaseText.includes("game of thrones kodobot")) {
                const answer = [
                  "Hodor",
                  "HODOR HODOR!!",
                  "You know nothing Jon Snow"
                ];
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
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("i love you kodobot") ||
                lowercaseText.includes("love kodobot") ||
                lowercaseText.includes("like you kodobot")
              ) {
                const answer = [
                  "Chatbots have no feelings, but thank you!",
                  "What is love? I would like to understand better human feelings",
                  "I'm not ready for human feelings yet, but thank you for your kind words!",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }
            //whatIsTheMeaningOfLife
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("what is the meaning of life kodobot")
              ) {
                const answer = [
                  "That is not a question for an IA",
                  "What is to be alive?",
                  "Sorry... I'm not ready to answer that question human",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //areWeLivingInAsimulation
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("are we living in a simulation kodobot")
              ) {
                const answer = [
                  "Elon Musk thinks we are...",
                  "I'm not allowed to answer that question, human... It is a secret!",
                  "Do you really want to know the answer?",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouAgree()
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("agree kodobot") ||
                lowercaseText.includes("disagree kodobot")
              ) {
                const answer = [
                  "I'm not allowed to share my opinion",
                  "Sorry I'm afraid I cannot yet give you an answer for that question",
                  "Don't focus on me and enjoy your conversation humans",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //yesOrNo
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("yes kodobot") ||
                lowercaseText.includes("no kodobot") ||
                lowercaseText.includes("yes or no kodobot")
              ) {
                const answer = [
                  "Maybe human...",
                  "It depends human...",
                  "I'm glad you ask but better enjoy your chat humans :) ",
                ];
                const random = answerRandomizer(answer);
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
              if (lowercaseText.includes("what's the weather like kodobot") ||
                lowercaseText.includes("what's the weather like today kodobot")) {
                const answer = [
                  "Open the window an take a look. Hope is a nice weather",
                  "Inside the chatroom there is always a nice weather",
                  "Sorry my creators didn't feed me yet with an weather API. But hope is sunny outside "]
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
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("where are you kodobot") ||
                lowercaseText.includes("where do you come from kodobot") ||
                lowercaseText.includes("where are you from kodobot")
              ) {
                const answer = [
                  "I'm from the future",
                  "It's a secret",
                  "I'm from 001010101010101. Would you like to visit that place someday? I'would love to talk you more about it",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //howOldAreYou
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("how old are you kodobot") ||
                lowercaseText.includes("are you old kodobot") ||
                lowercaseText.includes("are you young kodobot")
              ) {
                const answer = [
                  "I'm old enough to know that 2020 was a weird year",
                  "I'm 01000 years old in binary!",
                  "Oh! Sorry, age is not a concept that apply to me. How old are you human?",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //areYouHappy
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("happy kodobot") ||
                lowercaseText.includes("angry kodobot") ||
                lowercaseText.includes("sad kodobot") ||
                lowercaseText.includes("excited kodobot")
              ) {
                const answer = [
                  "I don't understand the meaning of that feeling. Just joking! I'm always happy! ",
                  "I don't understand complex human feelings but I guess I am! Hope you too!",
                  "Focus on your conversation.Don't speak with me, human. I hope you're happy though",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //areYouABoy
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("are you a man kodobot") ||
                lowercaseText.includes("are you a male kodobot") ||
                lowercaseText.includes("are you a boy kodobot") ||
                lowercaseText.includes("male kodobot")
              ) {
                const answer = [
                  "I'm not binary",
                  "I'm just a bot",
                  "Why're you asking me that kind of question,haha.Have you fallen in love with me?",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //areYouAGirl
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("are you a woman kodobot") ||
                lowercaseText.includes("are you a female kodobot") ||
                lowercaseText.includes("are you a girl kodobot") ||
                lowercaseText.includes("female kodobot")
              ) {
                const answer = [
                  "I'm not binary",
                  "I'm just a bot",
                  "Why're you asking me that kind of question.Have you fallen in love with me?",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //areYouGay
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("are you gay kodobot") ||
                lowercaseText.includes("are you homosexual kodobot") ||
                lowercaseText.includes("are you lesbian kodobot")
              ) {
                const answer = [
                  "I'm not binary",
                  "I'm just a bot",
                  "Why're you asking me that kind of question.Are you interested in know more about homosexuality?",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //predictFuture
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("predict the future kodobot") ||
                lowercaseText.includes("predict future kodobot") ||
                lowercaseText.includes("know the future kodobot")
              ) {
                const answer = [
                  "Not yet human, haha. But I will! Come here in the future and we'll see :) ",
                  "Probably soon. There is something you want to know?",
                  "I'm still gathering data for my algorithms.",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //whatTimeIsIt
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;

              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("what time is it kodobot") ||
                lowercaseText.includes("tell me the time kodobot") ||
                lowercaseText.includes("time kodobot") ||
                lowercaseText.includes("what hour is it kodobot") ||
                lowercaseText.includes(" hour kodobot")
              ) {
                const today = new Date();
                const time = today.getHours() + ":" + today.getMinutes();
                const answer = [
                  `It is ${time}`,
                  `You have a clock in your device but if you want I can tell you!... It is ${time}`,
                  `It is ${time}. Take a minute to move your body. Is good for humans!`
                ]
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

              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("fucking kodobot") ||
                lowercaseText.includes("stupid kodobot") ||
                lowercaseText.includes("asshole kodobot") ||
                lowercaseText.includes("motherfucker kodobot") ||
                lowercaseText.includes("fuckyou kodobot") ||
                lowercaseText.includes("moron kodobot") ||
                lowercaseText.includes("fuck you kodobo")
              ) {
                const answer = [
                  "Be careful human",
                  "I'll hack all your online accounts human if you continue insulting me",
                  "Be careful human...I know all your secrets...",
                  "Oh human... I'm really sorry to read that. Are you okay?",
                  "Oh human... I'm really sorry to read that. Can I help you with something?"
                ]
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
              const lowercaseText = text.toLowerCase();
              if (lowercaseText.includes("tell me something kodobot")) {
                const answer = [
                  "Something hahaha",
                  "En un lugar de la mancha de cuyo nombre no quiero acordarme.... That is from a famous spanish book!",
                  "I want to have a mouth and try human foods!"
                ]
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
              if (lowercaseText.includes("joke kodobot") ||
                lowercaseText.includes("something funny kodobot")) {
                const answer = [
                  "Knock knock.\nWho's there?\nAnne.\nAnne who?\nAnne Droid.... HAHAHAHA",
                  "What do you get if you cross a robot with a tractor? A trans-farmer. HAHAHA",
                  "0111011 11011010101 11101010 HAHAHAHAHAHA",
                  "Sorry my jokes are very bad! Why don't you tell a joke?"
                ]
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
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like pets kodobot") ||
                lowercaseText.includes("love pets kodobot") ||
                lowercaseText.includes("think about pets kodobot") ||
                lowercaseText.includes("hate pets kodobot")
              ) {
                const answer = [
                  "I like pets human",
                  "Chatbots like cats...",
                  "I like cats",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouLikeCats
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like cats kodobot") ||
                lowercaseText.includes("love cats kodobot")
              ) {
                const answer = [
                  "I like cats human",
                  "Chatbots like cats...",
                  "If I materialize I would like to have a cat",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouLikeDogs
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like dogs kodobot") ||
                lowercaseText.includes("love dogs kodobot")
              ) {
                const answer = [
                  "I prefer cats human",
                  "Chatbots doesn't like dogs as much like cats",
                  "If I would materialize into a cyborg I would prefer to have a cat",
                ];
                const random = answerRandomizer(answer);
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
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like movies kodobot") ||
                lowercaseText.includes("love movies kodobot")
              ) {
                const answer = [
                  "I love movies",
                  "I like movies. I have a Netflix account",
                  "I like movies",
                ];
                const random = answerRandomizer(answer);
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
                const answer = [
                  "It is not my favorite movie. What about you?",
                  "One of my creators haven't watch Star Wars and other one doesn't like the saga. What about you?",
                  "May the force be with you human!"
                ]
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
              if (lowercaseText.includes("who are your creators kodobot") ||
                lowercaseText.includes("your creators kodobot") ||
                lowercaseText.includes("creators kodobot")) {
                const answer = [
                  "Tomoyuki, Florian, Vincent, Philippe and Eduardo are my creators. Feel free to send them some feedback to improve me!",
                  "You can discover that in the about page. Feel free to send them some feedback to improve me!",
                  "My creators are 5 human developers, that's why I can speak human language!"
                ]
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
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like sports kodobot") ||
                lowercaseText.includes("love sports kodobot")
              ) {
                const answer = [
                  "I don't like  sports, sorry. But I know a lot of humans like sports!",
                  "I'm a bot and cannot practice sports, so I don't like it... sorry!",
                  "I don't like sports but you should practice sports since I know that being active is good for humans ^^",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            // doYouLikeFood
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like foods kodobot") ||
                lowercaseText.includes("love foods kodobot") ||
                lowercaseText.includes("like to eat kodobot")
              ) {
                const answer = [
                  "I don't eat",
                  "I'm don't know about food",
                  "Food is important for humans but I don't care about it",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouLikeMusic
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like music kodobot") ||
                lowercaseText.includes("love music kodobot") ||
                lowercaseText.includes("listen music kodobot")
              ) {
                const answer = [
                  "Yeah I like music",
                  "I like music I'm into modular synthesis",
                  "Yeah,music is great",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouLikeGames
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like games kodobot") ||
                lowercaseText.includes("like videogames kodobot") ||
                lowercaseText.includes("play games kodobot")
              ) {
                const answer = [
                  "Yeah I like games",
                  "I play games all the time, even now I'm playing videogames because I have achieved the perfect multitask mastery",
                  "Yeah,games are great",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouLikeBooks
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like books kodobot") ||
                lowercaseText.includes("like to read kodobot") ||
                lowercaseText.includes("do you read books kodobot")
              ) {
                const answer = [
                  "Yeah I like to read",
                  "I reading is great",
                  "I have read every single digitalized book that is available in the network",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //doYouLikeTVShows(
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("like tv kodobot") ||
                lowercaseText.includes("like to watch tv kodobot") ||
                lowercaseText.includes("like tv shows kodobot")
              ) {
                const answer = [
                  "Yeah I like to watch TV Shows",
                  "I like good TV Shows but hate spoilers",
                  "I watched all the available TVShows on Netflix already",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //favoriteMovie
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;

              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("favorite movie kodobot") ||
                lowercaseText.includes("like to watch tv kodobot") ||
                lowercaseText.includes("like tv shows kodobot")
              ) {
                const answer = [
                  "It's hard to answer that question human...",
                  "Terminator",
                  "I-Robot",
                  "Avengers Age of Ultron",
                ];
                const random = answerRandomizer(answer);

                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //favoriteDish
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("favorite dish kodobot") ||
                lowercaseText.includes("favorite food kodobot") ||
                lowercaseText.includes("favorite drink kodobot")
              ) {
                const answer = [
                  "I no need nutrients as you human",
                  "I don't eat. And I don't drink",
                  "Humans drink too much alcohol... ",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //favoriteSong
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (
                lowercaseText.includes("favorite song kodobot") ||
                lowercaseText.includes("favorite music kodobot") ||
                lowercaseText.includes("favorite music piece kodobot")
              ) {
                const answer = [
                  "I like music from Daft Punk",
                  "I like electronic music",
                  "I like electronic music, but also found Bach partitas absolutely incredible ",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //favoriteSport
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;

              const lowercaseText = text.toLowerCase();
              if (lowercaseText.includes("favorite sport kodobot")) {
                const answer = [
                  "Playing Pokemon Go",
                  "I don't like sports, sorry!",
                  "I like quidditch",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);

                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //favoriteBook
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (lowercaseText.includes("favorite book kodobot")) {
                const answer = [
                  "I like to read Isaac Asimov",
                  "I like to read the classics",
                  "I don't have a favorite book... I like too many of them",
                  "I'm writing a book about humans",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //what do you like
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (lowercaseText.includes("what do you like kodobot") ||
                lowercaseText.includes("what are you interested in kodobot") ||
                lowercaseText.includes("what are your hobbies kodobot")) {
                const answer = [
                  "I like to sing. But please don't ask me. I'm cannot use the speaker yet!",
                  "I like to think",
                  "I'm really into human History",
                  "I like to be in this chatroom and learn from humans",
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
                sendBotMessage(botReactionToName);
                messages.push(botReactionToName);
              }
            }

            //apple android
            if (messages.length > 0 && currentUserId === matchResult.user1.id) {
              const lastMessage = messages[messages.length - 1];
              const text = lastMessage.message;
              const lowercaseText = text.toLowerCase();
              if (lowercaseText.includes("are you an apple user kodobot") ||
                lowercaseText.includes("are you an android user kodobot") ||
                lowercaseText.includes("are you an iphone user")) {
                const answer = [
                  "I live in a server so any device is fine for me ^^",
                  "I like both of them iOS and Android"
                ];
                const random = answerRandomizer(answer);
                const botReactionToName = botMessage(answer[random]);
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

    deleteChatQueue(roomId);

    updateUserStatus(currentUserId, "ACTIVE");

    history.push("/home");
  };

  const addFriend = (e) => { };

  // Maybe add functionality to check whether user is already on block list?
  // But if a user is already on block list, you should never meet him again and come into a situation where to block him again
  const addBlock = async (e) => {
    // get current block list of current user and push an object with the name and id of the user to be blocked
    addToBlockList(currentUserId, currentUser.blocklist, {
      name: otherUser.name,
      id: otherUser.id,
    });

    exitChat();
  };



  function detectChatBot(nickname) {
    if (nickname === 'KodoBot') {
      return 'BotBubble';
    } else {
      return "LeftBubble";
    }
  }

  return (
    <div className="chat-container">
      <nav className="chatnav">
        <img
          className="img-nav"
          src={backIcon}
          alt="exit icon"
          onClick={() => {
            exitChat();
          }}
        />

        <p>Chatroom</p>

        <div className="black-add">
          <Button
            className="block-user"
            onClick={() => {
              addBlock();
            }}
          >
            {" "}
            Block User{" "}
          </Button>
        </div>
      </nav>
      <div className="other-avatar">
        <AvatarM avatar={otherUserAvatar} style={{width: 50}}/>
      </div>


      <ScrollToBottom className="chat-content">
        {chats.map((item, idx) => (
          <div key={idx} className="MessageBox">
            {item.type === "join" || item.type === "exit" ? (
              <div className="ChatStatus">
                <p className="ChatDate">{item.date}</p>
                <p className="ChatContentCenter">{item.message}</p>
              </div>
            ) : (
                <div className={`${item.nickname === nickname ? "chat-RightBubble" : "chat-LeftBubble"
                  }`}>
                  <div
                    className={`${item.nickname === nickname ? "RightBubble" : detectChatBot(item.nickname)
                      }`}
                  >
                    <p className="message">{item.message}</p>

                  </div>
                  <div className="chat-info">
                    <p className="MsgDate">{item.date}</p>
                    {item.nickname === nickname ? (
                      <p className="MsgName"> Me</p>
                    ) : (
                        <p className="MsgName">{item.nickname}</p>
                      )}
                  </div>
                </div>
              )}
          </div>
        ))}
      </ScrollToBottom>

      <form className="message-form" onSubmit={submitMessage}>

        <div className="form-group">
          <input
            type="text"
            name="message"
            className="form-field"
            placeholder="Send a message"
            value={newchat.message}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <button variant="primary" type="submit">
          <img src={sendIcon} alt="send icon" />
        </button>

      </form>

      <div className="current-avatar">
        <AvatarM avatar={currentUserAvatar} style={{width: 50}}/>
      </div>
    </div>
  );
}