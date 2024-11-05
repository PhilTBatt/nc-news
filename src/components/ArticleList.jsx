import { useState, useEffect } from 'react'
import { ErrorComponent } from './ErrorComponent'
import { ArticleCard } from './ArticleCard'
import { fetchArticles } from './api'

export function ArtcileList() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        fetchArticles()
        .then(articles => {
            setArticles(articles)
            setIsLoading(false)
        })
        .catch(err => setError(err))
    }, [])

    return (
        <section>
        {isLoading && <p>Loading...</p>}
        {error && <ErrorComponent message={error.message} />}
        <ul className="article-list" aria-label="List of comments">
            {articles.map(article => {
                return <ArticleCard key={article.article_id} article={article}/>
            })}
        </ul>
        </section>
    )
}