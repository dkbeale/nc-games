import { useState, useEffect } from "react";
import { getComments } from "../utils/api";
import { useParams } from "react-router";

const Comments = ({ comments, setComments }) => {
  const [error, setError] = useState(false);
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(review_id)
      .then((res) => {
        setComments(res.data.comments);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, [review_id]);

  return (
    <section id="comments_parent">
      <p>comments:</p>
      {error ? (
        <p>Cannot find comments!</p>
      ) : isLoading ? (
        <div>
          <p>Loading</p>
          <div class="lds-dual-ring"></div>
        </div>
      ) : (
        <div id="comments">
          <ul>
            {comments.map((comment) => {
              const date = comment.created_at.split("T")[0];
              return (
                <li key={comment.comment_id}>
                  <p>Commenter: {comment.author}</p>
                  <p>{date}</p>
                  <p>{comment.body}</p>
                  <p>Votes: {comment.votes}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Comments;
