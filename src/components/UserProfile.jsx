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
        <div class="box">Please Sign In</div>
      </section>
    );
  }
  return (
    <section>
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src={user.avatar_url} alt="Missing Profile Pic" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
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
        <div class="box">No Reviews</div>
      ) : (
        <div class="box">
          User Reviews:
          {userReviews.map((review) => {
            return (
                <div key={review.review_id} class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-128x128">
                        <Link to={`/reviews/${review.review_id}`}>
                        <img src={review.review_img_url} alt={review.title} />
                        </Link>                      
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
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
                            class="button is-danger is-outlined is-small"
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
