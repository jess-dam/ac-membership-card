import './App.scss';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserProfile from './components/UserProfile';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import AllUsers from './components/AllUsers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/users'>
            <AllUsers/>
          </Route>
          <Route path='/signin'>
            <SignIn/>
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route path='/'>
            <UserProfile/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
