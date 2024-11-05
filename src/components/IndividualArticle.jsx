import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FancyBox } from "./FancyBox"
import { fetchArticleById, updateArticleLikes } from "./api"
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
    const [isLikesLoading, setIsLikesLoading] = useState(null)
    

    useEffect(() => {
        setIsLoading(true)
        setIsLikesLoading(true)
        fetchArticleById(article_id)
        .then(article => {
            setArticle(article)
            setLikes(article.votes)
            setIsLoading(false)
            setIsLikesLoading(false)
        })
        .catch(err => setError(err))
    }, [likes])

    function likeArticle(amount) {
        setIsLikesLoading(true)
        updateArticleLikes(article_id, amount)
        .then(likes => {
            setHasLiked(currentVlaue => !currentVlaue)
            setLikes(likes)
            setIsLikesLoading(false)
        })
        .catch(err => setLikesError(err))
    }

    return (
        <>
            <section>
                <FancyBox>
                    {isLoading && !isLikesLoading &&<p>Loading...</p>}
                    {error && <ErrorComponent message={error.message} msg={error.msg} status={error.status} role="alert"/>}
                    <h3>
                        {article.title}
                    </h3>
                    User: {article.author}
                    <p>
                        {article.body}
                    </p>
                    <br/>
                    Likes: {article.votes}
                    {!hasLiked && !isLikesLoading && <button onClick={()=>likeArticle(1)} aria-label="Like Button"> {!likesError ? 'Like' : 'Error'} </button>}
                    {hasLiked && !isLikesLoading && <button onClick={()=>likeArticle(-1)} aria-label="Unlike Button"> {!likesError ? 'Unlike' : 'Error'} </button>}
                    {isLikesLoading && <button>Loading...</button>}
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