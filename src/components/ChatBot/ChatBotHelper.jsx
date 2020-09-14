import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


// TODO only user1 sends bot message / not good, because user1 not loggedin or leave room, bot never response
//  if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//     const lastMessage = messages[messages.length - 1];
//     const text = lastMessage.message;
//     const from = lastMessage.nickname;
//     if (text.includes("hi kodobot") && from !== "Kodobot") {
//       const botReactionToName = botMessage("You've said my name human. I'm afraid I cannot answer your questions yet.I'm here just to be sure that you're not alone");
//       sendBotMessage(botReactionToName);
//       messages.push(botReactionToName);
//     }
//   }


//initial basic random questions 

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

const invokedKodobotName = () => {
    if (messages.length > 0 && currentUserId === matchResult.user1.id) {
        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.message;
        const lowercaseText = text.toLowerCase()
        if (lowercaseText.includes("kodobot")) {
            const answer = ["You've said my name humans", "I'm here to take care of you humans", "I'm still learning human language"]
            const random = answerRandomizer(answer)
            const botReactionToName = botMessage(answer[random]);
            sendBotMessage(botReactionToName);
            messages.push(botReactionToName);
        }
    }
}

const whoAreYouKodobot = () => {
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
}

const winterIsComing = () => {
    if (messages.length > 0 && currentUserId === matchResult.user1.id) {
        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.message;
        const lowercaseText = text.toLowerCase()
        if (lowercaseText.includes("Winter is comimg kodobot") || lowercaseText.includes("what are you kodobot")) {
            const answer = ["Hodor", "HODOR!!", "You know nothing Jhon Snow"]
            const random = answerRandomizer(answer)
            const botReactionToName = botMessage(answer[random]);
            sendBotMessage(botReactionToName);
            messages.push(botReactionToName);
        }
    }
}

const iLoveYouKodobot = () => {
    if (messages.length > 0 && currentUserId === matchResult.user1.id) {
        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.message;
        const lowercaseText = text.toLowerCase()
        if (lowercaseText.includes("i love you kodobot") || lowercaseText.includes("love kodobot")) {
            const answer = ["Chatbots has no feelings", "What is love?", "I'm not ready for human feelings yet"]
            const random = answerRandomizer(answer)
            const botReactionToName = botMessage(answer[random]);
            sendBotMessage(botReactionToName);
            messages.push(botReactionToName);
        }
    }
}

const whatIsTheMeaningOfLife = () => {
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
}

const areWeLivingInAsimulation = () => {
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
}

const areYouAgree = () => {
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
}
const yesOrNo = () => {
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
}

const areYouHappy = () => {
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
}

//pet section


const doYouLikePets = () => {
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
}

const doYouLikeCats = () => {
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
}

const doYouLikeDogs = () => {
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
}