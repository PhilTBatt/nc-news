import { useEffect, useState } from "react"
import { CommentCard } from "./CommentCard"
import { ErrorComponent } from "./ErrorComponent"
import { fetchComments } from "./api"

export function CommentsList({article_id}) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
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
            {error && <ErrorComponent msg={error.msg} status={error.status} role="alert"/>}
            <ul className="comments-list" aria-label="List of">
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id} comment={comment}/>
                })}
            </ul>
        </>
    )
}