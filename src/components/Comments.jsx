import { useState, useEffect } from "react";
import { getComments } from "../utils/api";
import { useParams } from "react-router";

const Comments = ({ comments, setComments }) => {

    const [error, setError] = useState(false);
    const { review_id } = useParams();

    useEffect(() => {
        getComments(review_id).then((res) => {
            setComments(res.data.comments)
        }).catch((err) => {
            setError(true)
        })
    }, [review_id])

    return <section>
        <p>comments:</p>
        {(error) ? <p>No comments!</p> : <>
            <ul>
                {comments.map((comment) => {
                    return (
                        <li key={comment.comment_id}>
                        <p>Commenter: {comment.author}</p>
                        <p>{comment.created_at}</p>
                        <p>{comment.body}</p>
                        <p>Votes: {comment.votes}</p>
                        </li>
                    )
                })}
            </ul>
        </>}
    </section>
}

export default Comments