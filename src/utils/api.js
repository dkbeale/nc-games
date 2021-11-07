import axios from "axios";

const gameAPI = axios.create({
  baseURL: "https://db-nc-games.herokuapp.com/api",
});

export const getCategories = () => {
  return gameAPI.get("/categories").then((res) => {
    return res;
  });
};

export const getReviews = (category, sort_by, order, search) => {
  return gameAPI
    .get("/reviews", {
      params: {
        category: category,
        sort_by: sort_by,
        order: order,
        search: search,
      },
    })
    .then((res) => {
      return res;
    });
};

export const getReviewById = (review_id) => {
  return gameAPI.get(`/reviews/${review_id}`).then((res) => {
    return res;
  });
};

export const patchVotes = (review_id) => {
  return gameAPI
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then((res) => {
      return res;
    });
};

export const getComments = (review_id) => {
  return gameAPI
    .get(`/reviews/${review_id}/comments`)
    .then((res) => {
      return res;
    });
};

export const postComment = (review_id, comment) => {
  return gameAPI 
    .post(`/reviews/${review_id}/comments`, comment)
    .then((res) => {
      return res;
    });
};

export const deleteComment = (comment_id) => {
  return gameAPI
    .delete(`/comments/${comment_id}`);
};

export const getAllUsers = () => {
  return gameAPI
    .get(`/users`)
    .then((res) => {
      return res
    })
};

export const getSingleUser = (username) => {
  return gameAPI
    .get(`/users/${username}`)
    .then((res) => {
      return res
    })
}

export const postNewUser = (newUser) => {
  return gameAPI
    .post(`/users`, newUser)
    .then((res) => {
      return res;
    })
}

export const patchCommentVote = (comment_id) => {
  console.log(comment_id)
  return gameAPI
    .patch(`/comments/${comment_id}`, { inc_votes: 1 })
    .then((res) => {
      return res;
    })
}

export const postNewCategory = (category) => {
  return gameAPI
    .post(`/categories`, category)
    .then((res) => {
      return res;
    })
} 

export const postNewReview = (review) => {
  return gameAPI
    .post('/reviews', review)
    .then((res) => {
      return res;
    })
}

export const getReviewsByUser = (username) => {
  return gameAPI
    .get(`/users/${username}/reviews`)
    .then((res) => {
      return res;
    })
}

export const deleteReview = (review_id) => {
  return gameAPI
    .delete(`/reviews/${review_id}`)
}

export const patchReviewBody = (review_id, newBody) => {
  return gameAPI
    .patch(`/reviews/${review_id}`, newBody)
    .then((res) => {
      return res;
    })
}