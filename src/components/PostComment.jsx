import { useContext, useState } from "react";
import { FancyBox } from "./FancyBox";
import { postNewComment } from "./api";
import { UserContext } from "./contexts/User";
import { ErrorComponent } from "./ErrorComponent";

export function PostComment({setComments, article_id, comments}) {
    const [newComment, setNewComment] = useState('')
    const [error, setError] = useState(null)
    const {user} = useContext(UserContext)

    function updateComments(event) {
        event.preventDefault()
        postNewComment({article_id, user, newComment})
        .then(newComment => {
            setComments(currentComments => [newComment, ...currentComments])
            setNewComment('')
        })
        .catch(err => setError(err))
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
                <button type="submit">Post</button>
            </form>
            {error && <ErrorComponent message={error.message} msg={error.msg} status={error.status} role="alert"/>}
        </FancyBox>
    )
}