import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import HackerList from './components/hackerList';
import Homepage from './components/Homepage';
import Hackathons from './components/hackathons';
import CreateHackathon from './components/Organizers/CreateHackathon';
import EditHackathon from './components/Organizers/EditHackathon';
import SinglePage from './components/Organizers/SinglePageHackathon';
import SuccessPage from './components/SuccessPage';
import UserProfile from './components/UserProfile';
// import Footer from './components/Footer';
import CreateProject from './components/Projects/CreateProject';
import ErrorPage from './components/ErrorPage';

// ACTIONS
import { getHackathons } from './actions/actions';

function App(props) {
   useEffect(() => {
      props.getHackathons();
   }, [props]);

   return (
      <div className="App">
         <Router history={history}>
            <header>
               <NavBar />
            </header>
            <Switch>
      <Route exact path="/" component={Homepage} />
               <Route exact path="/hackathons" component={Hackathons} />
               <PrivateRoute path="/profile" component={UserProfile} />
               <PrivateRoute
                  exact
                  path="/hackathon/create"
                  component={CreateHackathon}
               />

               <PrivateRoute
                  exact
                  path="/hackathon/edit/:id"
                  component={EditHackathon}
               />
               <PrivateRoute exact path={`/hackathon/:id`} component={SinglePage} />
               <PrivateRoute exact path='/hackathon/:id/create/project' component={CreateProject} />
               <Route path="/success" component={SuccessPage} />
               <Route component={ErrorPage} />
            </Switch>
         </Router>
      </div>
   );
}

export default connect(null, { getHackathons })(App);
