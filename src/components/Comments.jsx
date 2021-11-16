import { useState, useEffect } from "react";
import { getComments } from "../utils/api";
import { useParams } from "react-router";
import SingleComment from "./SingleComment";

const Comments = ({ comments, setComments }) => {
  const [error, setError] = useState(false);
  const { review_id } = useParams();

  useEffect(() => {
    getComments(review_id)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        if (err.response.status !== 404) setError(true);
      });
  }, [review_id, setComments]);

  return (
    <section id="comments_parent">
      <p>
        Comments:
        {comments.length === 0 && (
          <> No comments yet, be the first to leave a comment!</>
        )}
      </p>
      {error ? (
        <p>Error: Cannot find comments!</p>
      ) : (
        <div id="comments">
          <ul>
            {comments.map((comment) => {
              return (
                <SingleComment
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Comments;
