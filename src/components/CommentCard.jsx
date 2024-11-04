import { FancyBox } from "./FancyBox";

export function CommentCard({comment}) {

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
            </li>
        </FancyBox>
    )
}