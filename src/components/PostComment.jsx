import { useContext, useState } from "react";
import { FancyBox } from "./FancyBox";
import { postNewComment } from "./api";
import { UserContext } from "./contexts/User";
import { ErrorComponent } from "./ErrorComponent";

export function PostComment({setComments, article_id}) {
    const [newComment, setNewComment] = useState('')
    const [error, setError] = useState(null)
    const [isPosting, setIsPosting] = useState(false)
    const {user} = useContext(UserContext)

    function updateComments(event) {
        event.preventDefault()
        setIsPosting(true)
        postNewComment({article_id, user, newComment})
        .then(newComment => {
            setIsPosting(false)
            setComments(currentComments => [newComment, ...currentComments])
            setNewComment('')
        })
        .catch(err => {
            setIsLoading(false)
            setError(err)
        })
    }

    return (
        <FancyBox className="post-comment">
            <form onSubmit={updateComments}>
                <label htmlFor="new-comment">
                    Comment:
                    <input
                    id="new-comment"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                />
                </label>
                <button type="submit">{isPosting ? 'Posting...' : 'Post'}</button>
            </form>
            {error && <ErrorComponent msg={error.response.data.msg} status={error.status}/>}
        </FancyBox>
    )
}