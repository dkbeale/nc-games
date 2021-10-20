import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";


const Nav = () => {

    const [categories, setCategories] = useState([]);

    //console.log(categories)

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data.categories)
        })
    }, [])

    return <section id="Nav">
            <h1><Link to="/">Board of Reviews</Link></h1>
            <Link to="/">Home</Link>
            <Link to="/reviews">Reviews</Link>
        </section>
}

export default Nav;