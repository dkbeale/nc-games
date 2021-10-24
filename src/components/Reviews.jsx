import { useState, useEffect } from "react";
import { getCategories, getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import DropDowns from "./DropDowns";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [sort_by, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews(category, sort_by, order)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, sort_by, order]);

  return (
    <section id="review_section">
      <h2>Reviews</h2>
      <p>Please find a list of reviews below</p>
      <DropDowns
        category={category}
        setCategory={setCategory}
        setSortBy={setSortBy}
        setOrder={setOrder}
      />
      {isLoading ? (
        <div>
          <p>Loading</p>
          <div class="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          <ul id="reviews">
            {reviews.map((review) => {
              return (
                <li key={review.review_id}>
                  <Link
                    className="review"
                    to={`/reviews/${review.review_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      className="review_image"
                      src={review.review_img_url}
                      alt={review.title}
                    />
                    <p className="review_title">{review.title}</p>
                    <p className="review_designer">
                      Designer: {review.designer}
                    </p>
                    <p className="review_owner">by: {review.owner}</p>
                    <p className="review_votes">Votes: {review.votes}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default Reviews;
