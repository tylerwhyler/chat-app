import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import '../styles/home.css';

let socket;

function Home({ location }) {
    let [username, setUsername] = useState('');
    let [room, setRoom] = useState('');
    let [myMessage, setMyMessage] = useState('');
    let [messages, setMessages] = useState([]);

    const pageBottom = useRef(null);
    const ENDPOINT = 'https://tyji-chat-app-api.herokuapp.com/';
    // const ENDPOINT = 'localhost:4000';

    const scrollToBottom = () => {
        pageBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    const submitMyMessage = e => {
        e.preventDefault();
        if (myMessage) {
            setMessages([...messages, 'my_message_hackyasf' + myMessage]);
            socket.emit('sendMessage', { username, room, myMessage }, () => {
                setMyMessage('');
            });
        }
    };

    const renderMessages = messages.map(message => {
        if (message.includes('my_message_hackyasf')) {
            return (
                <div className='myflex-message-wrapper'>
                    <div className='myMessage'>
                        {message.replace('my_message_hackyasf', '')}
                    </div>
                </div>
            );
        } else {
            return (
                <div className='flex-message-wrapper'>
                    <div className='message'>{message}</div>
                </div>
            );
        }
    });

    useEffect(() => {
        const { username, room } = queryString.parse(location.search);
        setUsername(username);
        setRoom(room);

        socket = io(ENDPOINT);
        socket.emit('join', { username, room }, () => {});

        return () => {
            socket.emit('disconnect');
            socket.off();
            setUsername(username);
            setRoom(room);
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message.text]);
        });
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='Home'>
            <div className='messages-field'>
                <div className='messages-wrapper'>{renderMessages}</div>
            </div>

            <div className='chat-field'>
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
