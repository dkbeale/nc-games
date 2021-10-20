import { useState, useEffect } from "react";
import { getHomeReviews } from "../utils/api";

import { Link } from "react-router-dom";

const Home = () => {

    const [review, setReview] = useState([]);

    //console.log(review)

    useEffect(() => {
        getHomeReviews().then ((res) => {
            setReview(res.data.reviews[0])
        })
    }, [])

    return <section id="Home">
            <div id="welcome">
                <h1>Welcome to Games Review!</h1>
                <h3>Latest Review: </h3>
            </div>
            <div id="latest_review">
                <Link to={`/reviews/${review.review_id}`}><img className="review_img" src={review.review_img_url} alt={review.title} /></Link>
                <Link to={`/reviews/${review.review_id}`}><p className="review_title">{review.title}</p></Link>
                <p className="review_designer">Designer: {review.designer}</p>
                <p className="review_body">{review.review_body}</p>
            </div>
    </section>
}

export default Home;