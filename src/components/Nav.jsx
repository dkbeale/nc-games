import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/Auth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "bulma-pageloader";
import MobileNav from "./MobileNav";

const Nav = () => {
  const { user } = useContext(UserContext);
  const value = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {}, [user]);

  const toggleNav = () => {
    setIsNavOpen((currState) => !currState);
  };

  return (
    <section id="Nav">
      <div id="Nav_flex">
      <h1>
        <Link id="nav_webname" to="/">
          Board of Reviews
        </Link>
      </h1>
      <button
        id="navbar-burger"
        className="button is-light"
        onClick={toggleNav}
      >
        <div className="burg"></div>
        <div className="burg"></div>
        <div className="burg"></div>
      </button>
      <div
        className={`pageloader is-right-to-left ${isNavOpen && "is-active"}`}
      >
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick={() => {
            setIsNavOpen(false);
          }}
        ></button>
        <MobileNav />
      </div>
      <span id="nav_links">
        <Link className="nav_links" id="nav_home" to="/">
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
        <SignIn />
        <SignUp />
        <button id="sign_out_button" onClick={() => value.setUser(null)}>
          Sign Out
        </button>
      </span>
      </div>
      {user && <p className="nav_links">Logged in as: {user.username}</p>}
    </section>
  );
};

export default Nav;
