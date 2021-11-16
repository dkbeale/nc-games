import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/Auth';
import { useContext } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const MobileNav = ({ setIsNavOpen }) => {

    const value = useContext(UserContext);

    const signOut = () => {
      value.setUser(null)
      setIsNavOpen(false)
    }

    return (
        <div id="burger_menu">
        <Link className="nav_links" to="/" onClick={() => {
            setIsNavOpen(false);
          }}>
          Home
        </Link>
        <Link className="nav_links" to="/reviews" onClick={() => {
            setIsNavOpen(false);
          }}>
          Reviews
        </Link>
        <Link className="nav_links" to="/profile" onClick={() => {
            setIsNavOpen(false);
          }}>
          User Profile
        </Link>
        <Link className="nav_links" to="/new-review" onClick={() => {
            setIsNavOpen(false);
          }}>
          New Review
        </Link>
        <button id="sign_out_button" onClick={() => signOut()}>
          Sign Out
        </button>
        <SignIn setIsNavOpen={setIsNavOpen}/>
        <SignUp setIsNavOpen={setIsNavOpen}/>
        </div>
    );
};

export default MobileNav;