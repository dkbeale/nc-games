import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews()
      .then((res) => {
        setReview(res.data.reviews[0]);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);

  return (
    <section id="Home">
      <div id="welcome">
        <h2>Welcome to Board of Reviews!</h2>
        <p>
          My name is Daniel Beale and this is an example of my work using a
          React front end and a Node.JS express api that I designed. You can
          find the repository links below, enjoy!
        </p>
        <Link to={`/front-end-repo`}>Front End Repo</Link>
        <Link to={`/back-end-repo`}>Back End Repo</Link>
        <h3>Latest Review: </h3>
      </div>
      {isLoading ? (
        <div>
          <p>Loading</p>
          <div class="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          <Link id="latest_review" to={`/reviews/${review.review_id}`}>
            <div id="latest_review_img">
              <img
                id="latest_review_img"
                className="review_img"
                src={review.review_img_url}
                alt={review.title}
              />
            </div>
            <p id="latest_review_title" className="review_title">
              {review.title}
            </p>
            <p className="review_designer">Designer: {review.designer}</p>
            <p className="review_body">{review.review_body}</p>
          </Link>
        </>
      )}
    </section>
  );
};

export default Home;
