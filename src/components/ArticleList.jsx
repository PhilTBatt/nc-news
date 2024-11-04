import { useState, useEffect } from 'react'
import axios from "axios"
import { ErrorComponent } from './ErrorComponent';
import { ArticleCard } from './ArticleCard';

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
                return <ArticleCard article={article}/>
            })}
        </ul>
        </section>
    )
}