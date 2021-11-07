import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/Auth";
import { deleteReview, getReviewsByUser } from "../utils/api";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (user) {
      console.log(user.username);
      getReviewsByUser(user.username)
        .then((reviews) => {
          setUserReviews(reviews.data.reviews);
          console.log(userReviews);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const removeReview = (review_id) => {
    const revertReviews = [...userReviews]
    const tempReview = userReviews.filter((review) => {
        if (review.review_id !== review_id) return review
    })
    setUserReviews(tempReview)
    deleteReview(review_id).catch(() => {
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
              <img src={user.avatar_url} alt="User Profile Pic" />
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
                      <figure class="image is-64x64">
                        <img src={review.review_img_url} alt={review.title} />
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                         
                          <strong>{review.title}</strong>
                          
                          <br />
                          <small>Designer: {review.designer}</small>
                          <br />
                          <small>Votes: {review.votes}</small>
                          
                          <br />
                          <button
                            class="button is-danger is-outlined is-small"
                            onClick={() => removeReview(review.review_id)}
                          >
                            <span>Delete</span>
                          </button>
                        </p>
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
