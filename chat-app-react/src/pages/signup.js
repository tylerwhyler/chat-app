import React, { useState, useEffect } from 'react';

import '../styles/home.css';

function Signup() {
    return (
        <div className='Signup'>
            <div className='login-wrapper'>
                <form>
                    <input type='text' placeholder='Username'></input>
                    <input type='password' placeholder='Password'></input>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
