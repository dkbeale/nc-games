import { useState, useEffect } from "react";
import { getCategories, getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import DropDowns from "./DropDowns";

const Reviews = () => {

    const [reviews, setReviews] = useState([])
    const [sort_by, setSortBy] = useState(null)
    const [order, setOrder] = useState(null)
    const [category, setCategory] = useState(null)
    

    useEffect(() => {
        getReviews(category, sort_by, order).then((res) => {
            setReviews(res.data.reviews)
        })
    }, [category, sort_by, order])

    return <section>
            <h1>Reviews</h1>
            <h2>Please find a list of reviews below</h2>
            <DropDowns category={category} setCategory={setCategory}
            setSortBy={setSortBy} setOrder={setOrder}/>
            <ul className="reviews">
                {reviews.map((review) => {
                    return <li key={review.review_id}>
                        <Link to={`/reviews/${review.review_id}`}><img src={review.review_img_url} alt={review.title} /></Link>
                        <Link to={`/reviews/${review.review_id}`}>{review.title}</Link>
                        <p>Designer: {review.designer}</p>
                        <p>Reviewed by: {review.owner}</p>
                        <p>Votes: {review.votes}</p>
                        
                    </li>
                })}
            </ul>
    </section>
}

export default Reviews;

{/* <h3>To choose reviews by category, please pick from the drop down menu below</h3>
            <h3>pick options to order</h3>
                <select name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option>--select category--</option>
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
                </select> */}