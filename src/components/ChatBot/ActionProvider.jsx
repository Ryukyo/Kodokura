
// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet() {
        const greetingMessage = this.createChatBotMessage("Hi, human!")
        this.updateChatbotState(greetingMessage)
    }

    flatEarth() {
        const greetingMessage = this.createChatBotMessage("Go away! Flat earther!! Imagine an astrounaut listen your nonsense from the space!!!!!!")
        this.updateChatbotState(greetingMessage)
    }
    noMerci() {
        const greetingMessage = this.createChatBotMessage("I'm a robot I have no merci!!!!!!")
        this.updateChatbotState(greetingMessage)
    }



    updateChatbotState(message) {

        // This function is set in the constructor, and is passed in      
        // from the top level Chatbot component. The setState function here     
        // actually manipulates the top level state of the Chatbot, so it's     
        // important that we make sure that we preserve the previous state.


        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }
}

export default ActionProvider;