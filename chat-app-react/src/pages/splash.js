import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/splash.css';

function Splash() {
    return (
        <div className='splash-page'>
            <div className='link-wrapper'>
                <Link to='/login'>Login</Link>
            </div>
            <div className='link-wrapper'>
                <Link to='/signup'>Signup</Link>
            </div>
        </div>
    );
}

export default Splash;
