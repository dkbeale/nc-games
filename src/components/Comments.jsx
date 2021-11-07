import { useState, useEffect, useContext } from "react";
import { getComments, deleteComment, patchCommentVote } from "../utils/api";
import { useParams } from "react-router";
import { UserContext } from "../context/Auth";

const Comments = ({ comments, setComments }) => {
  const [error, setError] = useState(false);
  const { review_id } = useParams();
  const { user } = useContext(UserContext);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getComments(review_id)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        if (err.response.status !== 404) setError(true);
      });
  }, [review_id, setComments]);

  const removeComment = (comment_id, author) => {
    if (author === user.username) {
      deleteComment(comment_id).then(() => {
        setComments(
          comments.filter((comment) => {
            return comment.comment_id !== comment_id; 
          })
        );
      });
    }
  };

  const increaseVote = (comment_id) => {
    if (votes === 0) {
    setVotes(votes + 1);
    patchCommentVote(comment_id)
      .catch((err) => {
        console.dir(err)
        setVotes(votes - 1)
      });
    }
  };


  return (
    <section id="comments_parent">
      <p>Comments:{(comments.length === 0) && <> No comments yet, be the first to leave a comment!</>}</p>
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
                  <button onClick={() => increaseVote(comment.comment_id)}>Votes: {comment.votes + votes}</button>
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
