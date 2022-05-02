import React from 'react'
import { addResponseMessage, Widget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'

const handleNewUserMessage = (newMessage) => {
    console.log(`New message! ${newMessage}`)
    addResponseMessage("Welcome to Service Oriented Architecture!!!!")
};

export default () => {
    return <div>
        <Widget 
            title="Messages"
            subtitle="Connect your friends"
            handleNewUserMessage={handleNewUserMessage}
            emojis="true"
        />
    </div>
}