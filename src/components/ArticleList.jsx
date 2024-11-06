import { useState, useEffect } from 'react'
import { ErrorComponent } from './ErrorComponent'
import { ArticleCard } from './ArticleCard'
import { getArticles } from './api'
import { FilterBar } from './FilterBar'
import { useSearchParams } from 'react-router-dom'

export function ArticleList() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const topicQuery = searchParams.get('topic')
    const sortQuery = searchParams.get('sort_by')
    const orderQuery = searchParams.get('order')

    useEffect(() => {
        setIsLoading(true)
        getArticles(topicQuery, sortQuery, orderQuery)
        .then(articles => {
            setArticles(articles)
            setIsLoading(false)
        })
        .catch(err => setError(err))
    }, [searchParams])

    return (
        <section>
        <FilterBar setSearchParams={setSearchParams} searchParams={searchParams}/>
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