// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase()

        if (lowerCaseMessage.includes("hello")) {
            this.actionProvider.greet()
        }

        else if (lowerCaseMessage.includes("earth")) {
            this.actionProvider.flatEarth()
        }

        else if (lowerCaseMessage.includes("sorry")) {
            this.actionProvider.noMerci()
        }

    }
}

export default MessageParser;