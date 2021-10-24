import axios from "axios";

const gameAPI = axios.create({
  baseURL: "https://db-nc-games.herokuapp.com/api",
});

export const getCategories = () => {
  return gameAPI.get("/categories").then((res) => {
    return res;
  });
};

export const getHomeReviews = () => {
  return gameAPI.get("/reviews?created_at").then((res) => {
    return res;
  });
};

export const getReviews = (category, sort_by, order) => {
  return gameAPI
    .get("/reviews", {
      params: {
        category: category,
        sort_by: sort_by,
        order: order,
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
  return gameAPI.get(`/reviews/${review_id}/comments`).then((res) => {
    return res;
  });
};

export const postComment = (review_id, comment) => {
  return gameAPI.post(`/reviews/${review_id}/comments`, comment).then((res) => {
    return res;
  });
};
