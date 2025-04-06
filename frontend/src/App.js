import React from 'react';
import Home from './components/Home';
import PostJob from './components/PostJob';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path='/post-job' component={PostJob} />
      <Route exact path='/jobs' component={Jobs} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </BrowserRouter>
);

export default App;