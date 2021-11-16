import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/Auth";
import { deleteReview, getReviewsByUser } from "../utils/api";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (user) {
      getReviewsByUser(user.username)
        .then((reviews) => {
          setUserReviews(reviews.data.reviews);
        })
        .catch((err) => {
        });
    }
  }, [user]);

  const removeReview = (review_id) => {
    const revertReviews = [...userReviews]
    const tempReview = userReviews.filter((review) => {
        return review.review_id !== review_id
    })
    setUserReviews(tempReview)
    deleteReview(review_id).catch((err) => {
      console.dir(err)
        setUserReviews(revertReviews)
    })
  };

  if (!user) {
    return (
      <section>
        <div className="box">Please Sign In</div>
      </section>
    );
  }
  return (
    <section>
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={user.avatar_url} alt="Missing Profile Pic" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>Username: {user.username}</strong>
                <br />
                <small>Name: {user.name}</small>
              </p>
            </div>
          </div>
        </article>
      </div>
      {userReviews.length === 0 ? (
        <div className="box">No Reviews</div>
      ) : (
        <div className="box">
          User Reviews:
          {userReviews.map((review) => {
            return (
                <div key={review.review_id} className="box">
                  <article className="media">
                    <div className="media-left">
                      <figure className="image is-128x128">
                        <Link to={`/reviews/${review.review_id}`}>
                        <img src={review.review_img_url} alt={review.title} />
                        </Link>                      
                      </figure>
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <Link to={`/reviews/${review.review_id}`}>
                        <p>
                         
                          <strong>{review.title}</strong>
                          
                          <br />
                          <small>Designer: {review.designer}</small>
                          <br />
                          <small>Votes: {review.votes}</small>
                          
                          <br />
                        </p>
                        </Link>
                          <button
                            className="button is-danger is-outlined is-small"
                            onClick={() => removeReview(review.review_id)}
                          >
                            <span>Delete</span>
                          </button>
                      </div>
                    </div>
                  </article>
                </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UserProfile;
