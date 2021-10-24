import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/Auth";

const Nav = () => {

  const { user } = useContext(UserContext)

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
      <p>Logged in as: {user.username}</p>
    </section>
  );
};

export default Nav;
