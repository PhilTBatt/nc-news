import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FancyBox } from "./FancyBox"
import { getArticleById, patchArticleLikes } from "./api"
import { ErrorComponent } from "./ErrorComponent"
import { CommentsList } from "./CommentsList"
import { Expandable } from "./Expandable"

export function IndividualArticle() {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [likes, setLikes] = useState(null)
    const [hasLiked, setHasLiked] = useState(false)
    const [likesError, setLikesError] = useState(null)
    

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id)
        .then(article => {
            setArticle(article)
            setLikes(article.votes)
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
            setError(err)
        })
    }, [])

    function likeArticle() {
        const previousLikes = likes
        const likesIncrement = !hasLiked ? 1 : -1
        setLikes(likes + likesIncrement)
        setHasLiked(currentVlaue => !currentVlaue)

        patchArticleLikes(article_id, likesIncrement)
        .catch(err => {
            setLikesError(err)
            setLikes(previousLikes)
        })
    }

    return (
        error ? <FancyBox>
            <ErrorComponent status={error.status} msg={error.response.data.msg} />
        </FancyBox> :
        <>
            <section>
                <FancyBox>
                    {isLoading && <p>Loading...</p>}
                    {error && <ErrorComponent msg={error.response.data.msg} status={error.status} role="alert"/>}
                    <h3>
                        {article.title}
                    </h3>
                    User: {article.author}
                    <p>
                        {article.body}
                    </p>
                    <br/>
                    Likes: {likes}
                    {!hasLiked && <button onClick={likeArticle} disabled={likesError} aria-label="Like Button">
                        {!likesError ? 'Like' : 'Error'}
                    </button>}
                    {hasLiked && <button onClick={likeArticle} disabled={likesError} aria-label="Unlike Button">
                        {!likesError ? 'Unlike' : 'Error'}
                    </button>}
                    <br/>
                    Posted: {new Date(article.created_at).toLocaleString("en-GB", {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})}
                    <br/>
                    <img src={article.article_img_url} alt="Article image"/>
                </FancyBox>
            </section>
            <Expandable label="comments">
                <CommentsList article_id={article_id}/>
            </Expandable>
        </>
    )
}