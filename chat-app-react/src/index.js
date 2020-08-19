import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Splash from './pages/splash';

import './styles/main.css';

ReactDOM.render(
    <div>
        <Router>
            <Switch>
                <Route path='/' exact component={Splash}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/Signup' component={Signup}></Route>
            </Switch>
        </Router>
    </div>,
    document.getElementById('root')
);
