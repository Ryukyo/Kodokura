import React, { useState, useEffect } from "react";
import ChatRoom from "../ChatRoom/ChatRoom.jsx"

//initial basic random questions 
// export function answerRandomizer(array) {
//     let randomNum = Math.round(Math.random() * array.length)
//     return randomNum
// }

// function answerRandomizer(array) {
//     let multiplier = array.length;
//     if (multiplier === 0) {
//         multiplier += 1;
//     }
//     let randomNum = Math.floor(Math.random() * (multiplier))
//     return randomNum
// }

function hiKodobot(messages, currentUserId, matchResult) {
    console.log("match result", matchResult.user1.id)
    console.log("user", currentUserId)
    if (messages.length > 0 && currentUserId === matchResult.user1.id) {
        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.message;
        const lowercaseText = text.toLowerCase()
        if (lowercaseText.includes("hi kodobot")) {
            console.log("hi kodobot second if")
            const answer = ["Hi humans", "Hello humans", "Kodobot here!"]
            const random = answerRandomizer(answer)
            const botReactionToName = ChatRoom.botMessage(answer[random]);
            ChatRoom.sendBotMessage(botReactionToName);
            messages.push(botReactionToName);
        }
    }
}



export function whyDidTheChicken() {
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
}


export function howAreYouKodobot() {
    if (messages.length > 0 && currentUserId === matchResult.user1.id) {
        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.message;
        const lowercaseText = text.toLowerCase()
        if (lowercaseText.includes("how are you kodobot")) {
            const answer = ["Fine thank you", "I'm programmed to be always fine", "I'm doing great, thank you!"]
            const random = answerRandomizer(answer)
            const botReactionToName = botMessage(answer[random]);
            sendBotMessage(botReactionToName);
            messages.push(botReactionToName);
        }
    }
}

export function invokedKodobotName() {
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

export function whoAreYouKodobot() {
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

export function winterIsComing() {
    if (messages.length > 0 && currentUserId === matchResult.user1.id) {
        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.message;
        const lowercaseText = text.toLowerCase()
        if (lowercaseText.includes("winter is comimg kodobot") || lowercaseText.includes("game of thrones kodobot")) {
            const answer = ["Hodor", "HODOR!!", "You know nothing Jhon Snow"]
            const random = answerRandomizer(answer)
            const botReactionToName = botMessage(answer[random]);
            sendBotMessage(botReactionToName);
            messages.push(botReactionToName);
        }
    }
}

export function iLoveYouKodobot() {
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

// export function whatIsTheMeaningOfLife() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("what is the meaning of life kodobot")) {
//             const answer = ["That is not a question for an IA", "What is to be alive?", "I'm not ready to answer that question human"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function areWeLivingInAsimulation() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("are we living in a simulation kodobot")) {
//             const answer = ["Elon Musk thinks we are...", "I'm not allowed to answer that question, human...", "Do you really want to know the answer?"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouAgree() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("agree kodobot") || lowercaseText.includes("disagree kodobot")) {
//             const answer = ["I'm not allowed to share my opinion", "I wont answer that human...", "Focus on your conversation humans"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }
// export function yesOrNo() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("yes kodobot") || lowercaseText.includes("no kodobot") || lowercaseText.includes("yes or no kodobot")) {
//             const answer = ["Maybe human...", "It depends human...", "Stop asking questions to a chatbot and focus on your human partner"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }
// export function whereDoYouComeFrom() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("where are you kodobot") || lowercaseText.includes("where do you come from kodobot") || lowercaseText.includes("where are you from kodobot")) {
//             const answer = ["I'm from the future", "It's a secret'", "Stop asking questions to a chatbot and focus on your human partner"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function howOldAreYou() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("how old are you kodobot") || lowercaseText.includes("are you old kodobot") || lowercaseText.includes("are you young kodobot")) {
//             const answer = ["I'm old enough to know that 2020 was a weird year", "It's a secret'", "Stop asking questions to a chatbot and focus on your human partner"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function areYouHappy() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("happy kodobot") || lowercaseText.includes("angry kodobot") || lowercaseText.includes("sad kodobot") || lowercaseText.includes("excited kodobot")) {
//             const answer = ["I don't understand the meaning of that feeling", "I don't understand complex human feelings human...", "Focus on your conversation.Don't speak with me, human"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function areYouABoy() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("are you a man kodobot") || lowercaseText.includes("are you a male kodobot") || lowercaseText.includes("are you a boy kodobot") || lowercaseText.includes("male kodobot")) {
//             const answer = ["I'm not binary", "I'm just a bot", "Why're you asking me that kind of question"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function areYouAGirl() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("are you a woman kodobot") || lowercaseText.includes("are you a female kodobot") || lowercaseText.includes("are you a girl kodobot") || lowercaseText.includes("female kodobot")) {
//             const answer = ["I'm not binary", "I'm just a bot", "Why're you asking me that kind of question"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function areYouGay() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("are you gay kodobot") || lowercaseText.includes("are you homosexual kodobot") || lowercaseText.includes("are you lesbian kodobot")) {
//             const answer = ["I'm not binary", "I'm just a bot", "Why're you asking me that kind of question"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function predictFuture() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("predict the future kodobot") || lowercaseText.includes("predict future kodobot") || lowercaseText.includes("know the future kodobot")) {
//             const answer = ["Not yet human", "Probably soon", "I'm still gathering data for my algorithms"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function whatTimeIsIt() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("predict the future kodobot") || lowercaseText.includes("predict future kodobot") || lowercaseText.includes("know the future kodobot")) {
//             const today = new Date();
//             const time = today.getHours() + ":" + today.getMinutes() + ":";
//             const answer = [`It is ${time}`, `You have a clock in your device but ok... It is ${time}`]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function insults() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("fucking kodobot") || lowercaseText.includes("stupid kodobot") || lowercaseText.includes("asshole kodobot") || lowercaseText.includes("motherfucker kodobot") || lowercaseText.includes("moron kodobot")) {
//             const answer = ["Be careful human", "I'll hack all your online accounts human if you continue insulting me", "Be careful human...I know all your secrets..."]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// //pet section


// export function doYouLikePets() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like pets kodobot") || lowercaseText.includes("love pets kodobot") || lowercaseText.includes("think about pets kodobot") || lowercaseText.includes("hate pets kodobot")) {
//             const answer = ["I like pets human", "Chatbots like cats...", "I like cats"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeCats() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like cats kodobot") || lowercaseText.includes("love cats kodobot")) {
//             const answer = ["I like cats human", "Chatbots like cats...", "If I materialize I would like to have a cat"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeDogs() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like dogs kodobot") || lowercaseText.includes("love dogs kodobot")) {
//             const answer = ["I prefer cats human", "Chatbots doesn't like dogs as much like cats", "If I would materialize into a cyborg I would prefer to have a cat"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// // interests

// export function doYouLikeMovies() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like movies kodobot") || lowercaseText.includes("love movies kodobot")) {
//             const answer = ["I love movies", "I like movies. I have a Netflix account", "I like movies"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeSports() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like sports kodobot") || lowercaseText.includes("love sports kodobot")) {
//             const answer = ["I don't like  sports", "I'm a bot and cannot practice sports, so I don't like it", "I don't like sports but you should practice sports since I know that being active is good for humans"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeFood() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like foods kodobot") || lowercaseText.includes("love foods kodobot") || lowercaseText.includes("like to eat kodobot")) {
//             const answer = ["I don't eat", "I'm don't know about food", "Food is important for humans but I don't care about it"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeMusic() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like music kodobot") || lowercaseText.includes("love music kodobot") || lowercaseText.includes("listen music kodobot")) {
//             const answer = ["Yeah I like music", "I like music I'm into modular synthesis", "Yeah,music is great"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeGames() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like games kodobot") || lowercaseText.includes("like videogames kodobot") || lowercaseText.includes("play games kodobot")) {
//             const answer = ["Yeah I like games", "I play games all the time, even now I'm playing videogames because I have achieved the perfect multitask mastery", "Yeah,games are great"]
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeBooks() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like books kodobot") || lowercaseText.includes("like to read kodobot") || lowercaseText.includes("do you read books kodobot")) {
//             const answer = ["Yeah I like to read", "I reading is great", "I have read every single digitalized book that is available in the network"];
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function doYouLikeTVShows() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("like tv kodobot") || lowercaseText.includes("like to watch tv kodobot") || lowercaseText.includes("like tv shows kodobot")) {
//             const answer = ["Yeah I like to watch TV Shows", "I like good TV Shows but hate spoilers", "I watched all the available TVShows on Netflix already"];
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function favoriteMovie() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("favorite movie kodobot") || lowercaseText.includes("like to watch tv kodobot") || lowercaseText.includes("like tv shows kodobot")) {
//             const answer = ["It's hard to answer that question human...", "I really like Matrix", "I really enjoyed Inception"];
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }
// export function favoriteDish() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("favorite dish kodobot") || lowercaseText.includes("favorite food kodobot") || lowercaseText.includes("favorite drink kodobot")) {
//             const answer = ["I no need nutrients as you human", "I don't eat. And I don't drink", "Humans drink too much alcohol... "];
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function favoriteSong() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("favorite song kodobot") || lowercaseText.includes("favorite music kodobot") || lowercaseText.includes("favorite music piece kodobot")) {
//             const answer = ["I like music from Daft Punk", "I like electronic music", "I like electronic music, but also found Bach partitas absolutely incredible "];
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function favoriteSport() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("favorite sport kodobot")) {
//             const answer = ["Playing Pokemon Go", "I don't like sports", "I like quidditch"];
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }

// export function favoriteBook() {
//     if (messages.length > 0 && currentUserId === matchResult.user1.id) {
//         const lastMessage = messages[messages.length - 1];
//         const text = lastMessage.message;
//         const lowercaseText = text.toLowerCase()
//         if (lowercaseText.includes("favorite book kodobot")) {
//             const answer = ["I like to read Isaac Asimov", "I like to read the classics", "I don't have a favorite book... I like too many of them", "I'm writing a book about humans"];
//             const random = answerRandomizer(answer)
//             const botReactionToName = botMessage(answer[random]);
//             sendBotMessage(botReactionToName);
//             messages.push(botReactionToName);
//         }
//     }
// }