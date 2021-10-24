import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";

const Nav = () => {

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
    </section>
  );
};

export default Nav;
