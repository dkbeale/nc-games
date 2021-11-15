import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/Auth';
import { useContext } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const MobileNav = () => {

    const value = useContext(UserContext);


    return (
        <div>
        <Link className="nav_links" to="/">
          Home
        </Link>
        <Link className="nav_links" to="/reviews">
          Reviews
        </Link>
        <Link className="nav_links" to="/profile">
          User Profile
        </Link>
        <Link className="nav_links" to="/new-review">
          New Review
        </Link>
        <button id="sign_out_button" onClick={() => value.setUser(null)}>
          Sign Out
        </button>
        <SignIn />
        <SignUp />
        </div>
    );
};

export default MobileNav;