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
    
    
    
    
    useEffect(() => {
       getReviewById(review_id).then((res) => {
           const tempData= res.data.review.created_at.split("T");
           res.data.review.created_at = tempData[0]
           setReview(res.data.review)
       })
    }, [review_id])

    const increaseVote = () => {
        patchVotes(review.review_id).then(() => {
            setVotes(votes + 1)
        }).catch((err) => {

        })
    }
    
    return <section>
            <img src={review.review_img_url} alt={review.title} />
            <h1>Review of {review.title}</h1>
            <h2>Game designed by {review.designer}</h2>
            <h3>By {review.owner}</h3>
            <p>{review.created_at}</p>
            <p>{review.review_body}</p>
            <p>{review.category}</p>
            <button onClick={() => {increaseVote()}}>Votes: {review.votes + votes}</button>
            <p>{review.comment_count} comments</p>
            <PostComment comments={comments} setComments={setComments}/>
            <Comments comments={comments} setComments={setComments}/>
    </section>
}

export default SingleReview;