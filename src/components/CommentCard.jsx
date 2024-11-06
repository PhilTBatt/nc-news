import { useContext, useState } from "react";
import { FancyBox } from "./FancyBox";
import { UserContext } from "./contexts/User";
import { deleteComment } from "./api";
import { ErrorComponent } from "./ErrorComponent";

export function CommentCard({comment, comments, setComments}) {
    const {user} = useContext(UserContext)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState(null)

    function removeComment() {
        setIsDeleting(true)
        deleteComment(comment.comment_id)
        .then(() => {
            
            setIsDeleting(false)
            setComments(comments.filter(notDeletedComment => notDeletedComment.comment_id !== comment.comment_id))
        })
        .catch(err => setError('Error'))
    }

    return (
        <FancyBox className="comment">
            <li>
                User: {comment.author}
                <br/>
                {comment.body}
                <br/>
                Likes: {comment.votes}
                <br/>
                Posted: {new Date(comment.created_at).toLocaleString("en-GB", {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
                {comment.author === user && <button onClick={removeComment} disabled={isDeleting}>
                    {!error && !isDeleting ? 'Delete' : !error ? 'Deleting' : 'Error'}
                </button>}
            </li>
        </FancyBox>
    )
}