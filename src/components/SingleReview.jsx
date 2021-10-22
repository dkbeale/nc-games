import { useState, useEffect } from 'react' 
import { getReviewById, patchVotes } from '../utils/api'
import { useParams } from 'react-router'
import Comments from './Comments'
import PostComment from './PostComment'

const SingleReview = () => {

    const [review, setReview] = useState([])
    const [votes, setVotes] = useState(0)
    const { review_id } = useParams()
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);
    
    useEffect(() => {
       getReviewById(review_id).then((res) => {
           const tempData= res.data.review.created_at.split("T");
           res.data.review.created_at = tempData[0]
           setReview(res.data.review)
       }).catch((err) => {
           setError(true);
       })
    }, [review_id])

    const increaseVote = () => {
        patchVotes(review.review_id).then(() => {
            setVotes(votes + 1)
        }).catch((err) => {

        })
    }
    
    return <section id="single_review_parent">
            {(error) ? <p>Review does not exist!</p> : <div id="single_review">
                <img src={review.review_img_url} alt={review.title} />
                <h1>Review of {review.title}</h1>
                <h2>Game designed by {review.designer}</h2>
                <h3> Review Written By {review.owner}</h3>
                <p>{review.created_at}</p>
                <p>{review.review_body}</p>
                <p>Category: {review.category}</p>
                <button onClick={() => {increaseVote()}}>Likes: {review.votes + votes}</button>
                <p>{review.comment_count} comments</p>
                <PostComment comments={comments} setComments={setComments}/>
                <Comments comments={comments} setComments={setComments}/>
            </div>}
    </section>
}

export default SingleReview;