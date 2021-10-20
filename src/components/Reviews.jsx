import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";
import '../css/Reviews.css';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Reviews = () => {

    const [reviews, setReviews] = useState([])
    const { category } = useParams();
    const [sortBy, setSortBy] = useState("")
    const [order, setOrder] = useState("")

    console.log(order)

    useEffect(() => {
        getReviews(category).then((res) => {
            setReviews(res.data.reviews)
        })
    }, [category])

    const filterSubmit = (e) => {
        e.preventDefault()
    }

    return <section>
            <h1>Reviews</h1>
            <h2>Please find a list of reviews below</h2>
            <h3>To choose reviews by category, please pick from the drop down menu above</h3>
            <h3>pick options to order</h3>
            
                <select name="sort_by" onChange={(e) => setSortBy(e.target.value)}>
                    <option value="created_at" selected>created at</option>
                    <option value="title">title</option>
                    <option value="votes">votes</option>
                    <option value="comment_count">comment count</option>
                    <option value="category">category</option>
                    <option value="owner">owner</option>
                </select>
                <select name="order" onChange={(e) => setOrder(e.target.value)}>
                    <option value="DESC" selected>Descending</option>
                    <option value="ASC">Ascending</option>
                </select>
                
            
            <ul>
                {reviews.map((review) => {
                    return <li key={review.review_id}>
                        <Link to={`/reviews/${review.review_id}`}><img src={review.review_img_url} alt={review.title} /></Link>
                        <Link to={`/reviews/${review.review_id}`}>{review.title}</Link>
                        <p>Designer: {review.designer}</p>
                        <p>Reviewed by: {review.owner}</p>
                        <p>Votes: {review.votes}</p>
                        <p>Comments: {review.comment_count}</p>
                    </li>
                })}
            </ul>
    </section>
}

export default Reviews;