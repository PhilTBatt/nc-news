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
            setIsPosting(false)
            setError(err)
        })
    }

    return (
        <FancyBox id="post-comment">
            <form onSubmit={updateComments} id='post-comment-form'>
                <label htmlFor="new-comment">
                    <span>Comment:</span>
                    <textarea
                    rows="1"
                    id="new-comment"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                />
                </label>
                <button type="submit">{isPosting ? 'Posting...' : 'Post'}</button>
            </form>
            {error && <ErrorComponent msg={' Posting comment failed'} status={'Error'}/>}
        </FancyBox>
    )
}