import React, { useContext, useState } from "react";
import { UserContext } from "../context/Auth";
import { patchCommentVote, deleteComment } from "../utils/api";

const SingleComment = ({ comment, comments, setComments }) => {
  const [votes, setVotes] = useState(0);
  const { user } = useContext(UserContext)

  const date = comment.created_at.split("T")[0];

  const removeComment = (comment_id, author) => { 
    if (user && author === user.username) {
      deleteComment(comment_id).then(() => {
        setComments(
          comments.filter((comment) => {
            return comment.comment_id !== comment_id;
          })
        );
      }).catch((err) => {
          console.dir(err)
      });
    }
  };

  const increaseVote = (comment_id) => {
    if (votes === 0) {
      setVotes(votes + 1);
      patchCommentVote(comment_id).catch((err) => {
        console.dir(err);
        setVotes(votes - 1);
      });
    }
  };

  return (
    <li key={comment.comment_id}>
      <p>Commenter: {comment.author}</p>
      <p>{date}</p>
      <p>{comment.body}</p>
      <button onClick={() => increaseVote(comment.comment_id)}>
        Votes: {comment.votes + votes}
      </button>
      <button onClick={() => removeComment(comment.comment_id, comment.author)}>
        Delete comment
      </button>
    </li>
  );
};

export default SingleComment;
