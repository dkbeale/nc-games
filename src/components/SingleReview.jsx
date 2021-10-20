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

    //console.log(review)

    useEffect(() => {
       getReviewById(review_id).then((res) => {
           setReview(res.data.review)
           setVotes(res.data.review.votes)
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
            <button onClick={() => {increaseVote()}}>Votes: {votes}</button>
            <p>{review.comment_count} comments</p>
            <PostComment comments={comments} setComments={setComments}/>
            <Comments comments={comments} setComments={setComments}/>
    </section>
}

export default SingleReview;