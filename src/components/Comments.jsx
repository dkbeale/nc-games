import { useState, useEffect, useContext } from "react";
import { getComments, deleteComment } from "../utils/api";
import { useParams } from "react-router";
import { UserContext } from "../context/Auth";

const Comments = ({ comments, setComments }) => {
  const [error, setError] = useState(false);
  const { review_id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getComments(review_id)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        if (err.response.status !== 404) setError(true);
      });
  }, [review_id]);

  const removeComment = (comment_id, author) => {
    if (author === user.username) {
      deleteComment(comment_id).then(() => {
        setComments(
          comments.filter((comment) => {
            if (comment.comment_id !== comment_id) {
              return comment;
            }
          })
        );
      });
    }
  };

  console.log(comments);

  return (
    <section id="comments_parent">
      <p>comments:</p>
      {error ? (
        <p>Error: Cannot find comments!</p>
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
                  <button
                    onClick={() =>
                      removeComment(comment.comment_id, comment.author)
                    }
                  >
                    Delete comment
                  </button>
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
