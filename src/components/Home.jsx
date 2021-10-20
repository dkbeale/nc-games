import { useState, useEffect } from "react";
import { getHomeReviews } from "../utils/api";
import '../css/Home.css'
import { Link } from "react-router-dom";

const Home = () => {

    const [review, setReview] = useState([]);

    //console.log(review)

    useEffect(() => {
        getHomeReviews().then ((res) => {
            setReview(res.data.reviews[0])
        })
    }, [])

    return <section>
            <h1>Welcome to Games Review!</h1>
            <h3>Latest Review: </h3>
            <Link to={`/reviews/${review.review_id}`}><img src={review.review_img_url} alt={review.title} /></Link>
            <Link to={`/reviews/${review.review_id}`}><p>{review.title}</p></Link>
            <p>Designer: {review.designer}</p>
            <p>{review.review_body}</p>
    </section>
}

export default Home;