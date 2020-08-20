import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import '../styles/home.css';

let socket;

function Home({ location }) {
    let [username, setUsername] = useState('');
    let [room, setRoom] = useState('');
    let [myMessage, setMyMessage] = useState('');
    let [myMessages, setMyMessages] = useState([]);
    let [messages, setMessages] = useState([]);

    const pageBottom = useRef(null);
    const ENDPOINT = 'localhost:4000';

    const scrollToBottom = () => {
        pageBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    const submitMyMessage = e => {
        e.preventDefault();
        if (myMessage) {
            socket.emit('sendMessage', { username, room, myMessage }, () => {
                setMyMessage('');
            });
            setMessages([...messages, myMessage]);
        }
    };

    const renderMessages = messages.map(message => {
        return <div className='message'>{message}</div>;
    });

    const renderMyMessages = myMessages.map(message => {
        return <div className='message'>{message}</div>;
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
                <div className='myMessages-wrapper'>{renderMyMessages}</div>
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
