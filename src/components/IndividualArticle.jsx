import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FancyBox } from "./FancyBox";
import axios from "axios";

export function IndividualArticle() {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        let endpoint = `https://nc-news-7miy.onrender.com/api/articles/${article_id}`
        axios.get(endpoint)
        .then(article => {
            setArticle(article.data.article)
            setIsLoading(false)
        })
        .catch(err => setError(err))
    }, [])

    return (
        <section>
            <FancyBox>
                {isLoading && <p>Loading...</p>}
                {error && <ErrorComponent message={error.message} />}
                <h3>
                    {article.title}
                </h3>
                Author: {article.author}
                <p>
                    {article.body}
                </p>
                <br/>
                Likes: {article.votes}
                <br/>
                <img src={article.article_img_url}/>
            </FancyBox>
        </section>
    )
}