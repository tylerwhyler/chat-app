import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/splash.css';

function Splash() {
    return (
        <div className='splash-page'>
            <h1>tyMessage</h1>
            <div className='link-wrapper'>
                <Link to='/login'>Login</Link>
            </div>
            <div className='link-wrapper'>
                <Link to='/signup'>Signup</Link>
            </div>
            <footer>
                Created using React, Node.js, and Socket.io by Tyler Isaacson
            </footer>
        </div>
    );
}

export default Splash;
