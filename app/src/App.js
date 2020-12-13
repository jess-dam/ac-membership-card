import './App.scss';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserProfile from './components/UserProfile';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import AllUsers from './components/AllUsers';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/users'>
            <NavBar/><AllUsers/>
          </Route>
          <Route path='/signin'>
            <NavBar/><SignIn/>
          </Route>
          <Route path='/signup'>
            <NavBar/><SignUp/>
          </Route>
          <Route path='/'>
            <NavBar/><UserProfile/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
