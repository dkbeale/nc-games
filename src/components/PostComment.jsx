import { useContext, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/Auth";
import { postComment } from "../utils/api";

const PostComment = ({ setComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const { user } = useContext(UserContext);
  const { review_id } = useParams();

  const submitComment = (e) => {
    e.preventDefault();
    postComment(review_id, { username: user.username, body: commentBody }).then(
      (res) => {
        setComments((currComs) => {
          return [res.data.comment, ...currComs];
        });
        setCommentBody("")
      }
    );
  };

  return (
    <form onSubmit={submitComment} id="comment_input">
      <textarea
        required
        type="text"
        placeholder="comment here"
        onChange={(e) => setCommentBody(e.target.value.trim())}
        value={commentBody}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default PostComment;
