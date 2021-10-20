import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";
import Reviews from "./Reviews";


const Nav = () => {

    const [categories, setCategories] = useState([]);

    //console.log(categories)

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data.categories)
        })
    }, [])

    return <section>
            <h1>Nav</h1>
            <Link to="/">Home</Link>
            <Link to="/reviews">Reviews</Link>
            {categories.map((category) => {
                return (
                    <Link key={category.slug} to={`/categories/${category.slug}/reviews`}>{category.slug}</Link>
                )
            })}
            
        </section>
}

export default Nav;