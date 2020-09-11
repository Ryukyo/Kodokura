// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "Conversation Encouraging Bot",
    initialMessages: [createChatBotMessage("Humans, start speaking")],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#376B7E",
        },
    },
}

export default config 