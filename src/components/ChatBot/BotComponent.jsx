import React from 'react';
import Chatbot from 'react-chatbot-kit';
import { Link } from "react-router-dom";

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './Config';


export default function ChatbotComponent() {
    return (
        <>
            <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
            <Link to="/home">
                <button>Back</button>
            </Link>
        </>
    );
}
