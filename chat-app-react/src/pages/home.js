import React, { useState, useEffect } from "react";
import "../styles/home.css";

function Home() {
    let [myMessage, setMyMessage] = useState("");
    let [messages, setMessages] = useState(["test message"]);

    const submitMyMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, myMessage]);
    };

    const renderMessages = messages.map((message) => {
        return <div className="message">{message}</div>;
    });

    return (
        <div className="Home">
            <div className="chat-field">
                <div className="messages-wrapper">{renderMessages}</div>
            </div>

            <div className="message-field">
                <form type="submit" onSubmit={submitMyMessage}>
                    <textarea
                        placeholder="Type message"
                        value={myMessage}
                        onChange={(e) => setMyMessage(e.target.value)}
                    />
                    <button>SEND</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
