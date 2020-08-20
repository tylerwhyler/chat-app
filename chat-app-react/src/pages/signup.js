import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/login-signup.css';

function Signup() {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [checkPassword, setCheckPassword] = useState('');

    const userObj = { username, password };

    return (
        <div className='Signup'>
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
                        type='password'
                        placeholder='Re-type Password'
                        value={checkPassword}
                        onChange={e => {
                            setCheckPassword(e.target.value);
                        }}
                    ></input>
                    <p>
                        If you forget your password, your username will be lost.
                    </p>
                    <div className='link-wrapper'>
                        <Link
                            onClick={e =>
                                !username ||
                                !password ||
                                password !== checkPassword
                                    ? e.preventDefault()
                                    : null
                            }
                            to={`/login`}
                        >
                            Signup
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
