import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/Auth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Nav = () => {

  const { user } = useContext(UserContext)
  const value = useContext(UserContext);

  useEffect(() => {
  }, [user])
  

  return (
    <section id="Nav">
      <h1>
        <Link id="nav_webname" to="/">
          Board of Reviews
        </Link>
      </h1>
      <Link className="nav_links" to="/">
        Home
      </Link>
      <Link className="nav_links" to="/reviews">
        Reviews
      </Link>
      <Link className="nav_links" to="/profile">
        User Profile
      </Link>
      <Link className="nav_links" to="/new-review">New Review</Link>
      <button id="sign_out_button" onClick={() => value.setUser(null)}>Sign Out</button>
      <SignIn/>
      {(user) && <p>Logged in as: {user.username}</p>}
      <SignUp/>
    </section>
  );
};

export default Nav;
