import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import '../styles/home.css';

let socket;

function Home() {
    let [myMessage, setMyMessage] = useState('');
    let [messages, setMessages] = useState([]);
    let [pullMessages, setPullMessages] = useState([]);
    const pageBottom = useRef(null);
    const ENDPOINT = 'localhost:4000';

    const scrollToBottom = () => {
        pageBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    const submitMyMessage = e => {
        e.preventDefault();

        socket = io(ENDPOINT);
        socket.emit('newMessage', myMessage);

        setMessages([...messages, myMessage]);
    };

    const renderMessages = messages.map(message => {
        return <div className='message'>{message}</div>;
    });
    const renderPullMessages = pullMessages.map(message => {
        return <div className='message'>{message}</div>;
    });

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on('message', message => {
            setPullMessages([...pullMessages, message]);
        });
    }, [pullMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, pullMessages]);

    return (
        <div className='Home'>
            <div className='chat-field'>
                <div className='messages-wrapper-push'>{renderMessages}</div>
                <div className='messages-wrapper-pull'>
                    {renderPullMessages}
                </div>
            </div>

            <div className='message-field'>
                <form type='submit' onSubmit={submitMyMessage}>
                    <textarea
                        placeholder='Type message'
                        value={myMessage}
                        onChange={e => setMyMessage(e.target.value)}
                    />
                    <button>SEND</button>
                </form>
            </div>

            <div ref={pageBottom}></div>
        </div>
    );
}

export default Home;
