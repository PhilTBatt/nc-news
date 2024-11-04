import { useEffect, useState } from "react"
import { CommentCard } from "./CommentCard"
import { ErrorComponent } from "./ErrorComponent"
import { fetchComments } from "./api"

export function CommentsList({article_id}) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchComments(article_id)
        .then(comments => {
            setComments(comments)
            setIsLoading(false)
        })
        .catch(err => setError(err))
    }, [])

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <ErrorComponent msg={error.msg} status={error.status} />}
            <ul className="comments-list">
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id} comment={comment}/>
                })}
            </ul>
        </>
    )
}