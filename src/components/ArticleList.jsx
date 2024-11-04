import { useState, useEffect } from 'react'
import axios from "axios"
import { ErrorComponent } from './ErrorComponent';
import { FancyBorder } from './FancyBorder';

export function ArtcileList() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        let endpoint = 'https://nc-news-7miy.onrender.com/api/articles'
        axios.get(endpoint)
        .then(articles => {
            setArticles(articles.data.articles)
            setIsLoading(false)
        })
        .catch(err => setError(err))
    }, [])

    return (
        <section>
        {isLoading && <p>Loading...</p>}
        {error && <ErrorComponent message={error.message} />}
        <ul className="article-list">
            {articles.map(article => {
                return (
                    <FancyBorder>
                        <li key={article.article_id}>
                            <h3>
                                {article.title}
                            </h3>
                            Author: {article.author}
                            <br/>
                            Topic: {article.topic}
                            <br/>
                            Likes: {article.votes}
                            <br/>
                            <img src={article.article_img_url}/>
                        </li>
                    </FancyBorder>)
            })}
        </ul>
        </section>
    )
}