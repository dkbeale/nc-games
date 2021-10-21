import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";

const DropDowns = ({ category, setCategory, setSortBy, setOrder}) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data.categories)
        })
    }, [category])

    return <section>
               <h3>To choose reviews by category, please pick from the drop down menu below</h3>
            <h3>pick options to order</h3>
                <select name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">--select category--</option>
                    <option value="">all reviews</option>
                    {categories.map((cata) => {
                        return <option key={cata.slug} value={cata.slug}>{cata.slug}</option>
                    })}
                </select>
                <select name="sort_by" onChange={(e) => setSortBy(e.target.value)}>
                    <option>--sort by--</option>
                    <option value="created_at">created at</option>
                    <option value="title">title</option>
                    <option value="votes">votes</option>
                    <option value="comment_count">comment count</option>
                    <option value="category">category</option>
                    <option value="owner">owner</option>
                </select>
                <select name="order" onChange={(e) => setOrder(e.target.value)}>
                    <option>--order--</option>
                    <option value="desc" >descending</option>
                    <option value="asc">ascending</option>
                </select>
    </section>
}

export default DropDowns;