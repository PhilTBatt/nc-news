import { useState, useEffect } from 'react'
import { ErrorComponent } from './ErrorComponent'
import { ArticleCard } from './ArticleCard'
import { getArticles } from './api'
import { Topics } from './Topics'
import { useSearchParams } from 'react-router-dom'

export function ArticleList() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const topicQuery = searchParams.get('topic')

    useEffect(() => {
        setIsLoading(true)
        getArticles(topicQuery)
        .then(articles => {
            setArticles(articles)
            setIsLoading(false)
        })
        .catch(err => setError(err))
    }, [topicQuery])

    return (
        <section>
        <Topics setSearchParams={setSearchParams}/>
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