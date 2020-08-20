import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/login-signup.css';

function Login() {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [room, setRoom] = useState('');

    return (
        <div className='Login'>
            <div className='login-signup-wrapper'>
                <form>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                    ></input>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                    <input
                        type='text'
                        placeholder='Room'
                        value={room}
                        onChange={e => {
                            setRoom(e.target.value);
                        }}
                    ></input>
                    <p>Room will be created if it does not exist.</p>
                    <div className='link-wrapper'>
                        <Link
                            onClick={e =>
                                !username || !room ? e.preventDefault() : null
                            }
                            to={`/home?username=${username}&room=${room}`}
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
