import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function TestBot() {

    const user = auth().currentUser;

    async function getAvatar() {
        let req = await axios.get(`/users/${user.email}`);
        let data = req.data;
        let avatar = data.avatar_url;
        return avatar
    }


    async function getChatroomId() {
        let req = await axios.get(`/chatqueue/${chatroom.id}`);
        let data = req.data;
        let userMessage = data.chatroom.id;
        return userMessage
    }

    async function getUser1Messages() {
        let req = await axios.get(`/chatqueue/${chatroom.id}`);
        let data = req.data;
        let userMessage = data.chatroom.id;
        return userMessage
    }


    async function getUser1Name() {
        let req = await axios.get(`/chatqueue/${user1.name}`);
        let data = req.data;
        let user1Name = data.message;
        return userMessage
    }

    const chatbotWelcomeMessage = (user1, user2) => {

        return `Welcome to your chatroom ${user1} and ${user2}!`
    }

    const conversationEncourage1 = (matchingScore) => {

        return `Your matching score is: ${matchingScore} points! Try to figure out your common interests!`
    }

    const chatbotReactions = () => {
        const message = getMessage()
        const lowerCaseMessage = message.toLowerCase()
        const answer = "";
        if (lowerCaseMessage.includes("hello")) {
            answer = "hi!"
        }

        return answer;
    }

    return (
        <>
            <p>test</p>
            <Link to="/home">
                <button>Back</button>
            </Link>
        </>
    );
}

//get users nicknames to say hi!

// get users interests match
// get messages input and time stamp
// if more than x second have passed suggest similar interests.

//example: I matched you because you share interest in jazz, 
//but according my circuits you share more things. 
//Why dont you try figure out? 