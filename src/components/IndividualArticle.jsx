import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FancyBox } from "./FancyBox"
import { fetchArticleById } from "./api"
import { ErrorComponent } from "./ErrorComponent"
import { CommentsList } from "./CommentsList"
import { Expandable } from "./Expandable"

export function IndividualArticle() {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticleById(article_id)
        .then(article => {
            setArticle(article)
            setIsLoading(false)
        })
        .catch(err => setError(err))
    }, [])

    return (
        <>
            <section>
                <FancyBox>
                    {isLoading && <p>Loading...</p>}
                    {error && <ErrorComponent message={error.message} msg={error.msg} status={error.status}/>}
                    <h3>
                        {article.title}
                    </h3>
                    User: {article.author}
                    <p>
                        {article.body}
                    </p>
                    <br/>
                    Likes: {article.votes}
                    <br/>
                    Posted: {new Date(article.created_at).toLocaleString("en-GB", {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    <br/>
                    <img src={article.article_img_url} alt="Image attached to article"/>
                </FancyBox>
            </section>
            <Expandable label="comments">
                <CommentsList article_id={article_id}/>
            </Expandable>
        </>
    )
}