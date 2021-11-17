import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import DropDowns from "./DropDowns";
import { FcLike } from "react-icons/fc";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [sort_by, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews(category, sort_by, order, search)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [category, sort_by, order, search]);

  const searchSubmit = (e) => {
    e.preventDefault()
    setSearch(searchInput.trim());
  };

  return (
    <section id="review_section">
      <section id="reviews_top_section">
        <h2>Reviews</h2>
        <p>Please find a list of reviews below</p>
        <form onSubmit={searchSubmit} id="search_form">
        <input
          className="input is-small"
          type="text"
          placeholder="Search For a Review"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <button
          className="button is-primary is-outlined is-small"
          type="submit"
        >
          Search
        </button>
        </form>
        <DropDowns
          category={category}
          setCategory={setCategory}
          setSortBy={setSortBy}
          setOrder={setOrder}
        />
        {reviews.length === 0 && <p>No Reviews</p>}
      </section>
      {isLoading ? (
        <div>
          <p>Loading</p>
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          <ul id="reviews">
            {reviews.map((review) => {
              return (
                <li key={review.review_id} className="review">
                  <Link
                    to={`/reviews/${review.review_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p className="review_title">{review.title}</p>
                    <img
                      className="review_image"
                      src={review.review_img_url}
                      alt={review.title}
                    />
                    <p className="review_designer">
                      Designer: {review.designer}
                    </p>
                    <p className="review_category">
                      Category: {review.category}
                    </p>
                    <div className="review_name_like">
                      <p className="review_owner">by: {review.owner}</p>
                      <p className="review_votes">
                        <FcLike className="heart_icon"/>
                        {review.votes}
                      </p>
                    </div>
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
