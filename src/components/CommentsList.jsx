import { useContext, useEffect, useState } from "react"
import { CommentCard } from "./CommentCard"
import { ErrorComponent } from "./ErrorComponent"
import { getComments } from "./api"
import { PostComment } from "./PostComment"
import { FancyBox } from "./FancyBox"
import { UserContext } from "./contexts/User"

export function CommentsList({article_id}) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const {user} = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id)
        .then(comments => {
            setComments(comments)
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
            setError(err)
        })
    }, [])

    return (
        <>
            {user.length === 0 ? <FancyBox>Select a user to post comment</FancyBox> :
                <PostComment article_id={article_id} setComments={setComments}/>}
            {isLoading && <p>Loading...</p>}
            {error && <ErrorComponent msg={error.response.data.msg} status={error.status}/>}
            <ul className="comments-list" aria-label="List of">
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id} comment={comment} comments={comments} setComments={setComments}/>
                })}
            </ul>
        </>
    )
}