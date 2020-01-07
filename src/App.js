import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';
import ExternalApi from './components/ExternalApi';
import history from './utils/history';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import HackerList from './components/hackerList';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import CreateHackathon from './components/Organizers/CreateHackathon';
import SinglePage from './components/Organizers/SinglePageHackathon';
import SuccessPage from './components/SuccessPage';
import UserProfile from './components/UserProfile';

// ACTIONS
import { getHackathons } from './actions/actions';

function App(props) {
   useEffect(() => {
      props.getHackathons();
   }, []);

   return (
      <div className="App">
         {/* Don't forget to include the history module */}
         <Router history={history}>
            <header>
               <NavBar />
            </header>
            <Switch>
               <Route exact path="/" component={Homepage} />
               <PrivateRoute path="/profile" component={Profile} />
               <Route path="/dashboard" component={Dashboard} />
               {/* TEMPORARILY ROUTE */}
               <PrivateRoute
                  exact
                  path="/hackathon/create"
                  component={CreateHackathon}
               />
               <PrivateRoute path={`/hackathon/:id`} component={SinglePage} />
               {/* NEW - add a route to the ExternalApi component for testing atm */}
               <PrivateRoute path="/external-api" component={ExternalApi} />
               <PrivateRoute path={`/user/`} component={UserProfile} />
               <Route path="/success" component={SuccessPage} />
               <Route path="/hackerlist" component={HackerList} />
            </Switch>
         </Router>
      </div>
   );
}

export default connect(null, { getHackathons })(App);
