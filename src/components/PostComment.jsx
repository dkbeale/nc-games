import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/Auth";
import { postComment } from "../utils/api";

const PostComment = ({ setComments }) => {
  const [commentBody, setCommentBody] = useState();
  const { user } = useContext(UserContext);
  const { review_id } = useParams();

  const submitComment = (e) => {
    e.preventDefault();
    postComment(review_id, { username: user.username, body: commentBody }).then(
      (res) => {
        setComments((currComs) => {
          return [res.data.comment, ...currComs];
        });
      }
    );
  };

  return (
    <form onSubmit={submitComment} id="comment_input">
      <textarea
        required
        type="text"
        placeholder="comment here"
        onChange={(e) => setCommentBody(e.target.value)}
        value={commentBody}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default PostComment;
