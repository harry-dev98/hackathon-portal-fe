// The navbar for the website
// possibly rename nav-bar classnames to be more clear

import React from 'react';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import HackathonLogo from '../../images/HackathonLogo.png';

import '../../sass/navbar/navBar.scss'

const NavBar = props => {
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

   return (
      <div className="navBar">
        <div className='navbar-content'>
         <Link to="/">
            <img id="logo" src={HackathonLogo} alt="logo"></img>
         </Link>

         {!isAuthenticated && (
            <div className = 'navBar-div'>

               <Link className='navBarLink' to="/">
                  Home
               </Link>
               <Link className='navBarLink' to="/about">
                  About
               </Link>
               <Link className='navBarLink' to="/hackathons">
                  All Hackathons
               </Link>
               <button
                  className='logIn-OutButton'
                  id='login-btn'
                  onClick={() => loginWithRedirect({})}
               >
                  Log in
               </button>
               <button
                  className='signUpButton'
                  id='login-btn'
                  onClick={() => loginWithRedirect({})}
               >
                  Sign up
               </button>
            </div>
         )}

         {isAuthenticated && (
            <div className="navBar-div">
               <Link className="navBarLink" to="/">
                  Home
               </Link>
               <Link className="navBarLink" to='/about'>
                  About
               </Link>
               <Link className="navBarLink" to="/hackathons">
                  All Hackathons
               </Link>
               <Link className="navBarLink" to="/profile">
                  Dashboard
               </Link>
               <button className="logIn-OutButton" onClick={() => logout()}>
                  Log Out
               </button>
            </div>
         )}
         </div>
      </div>
   );
};

export default NavBar;