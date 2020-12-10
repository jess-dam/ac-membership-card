import './App.scss';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserProfile from './components/UserProfile';
import SignUp from './components/auth/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
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
