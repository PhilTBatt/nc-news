import { useState, useEffect } from 'react'
import { ErrorComponent } from './ErrorComponent'
import { ArticleCard } from './ArticleCard'
import { getArticles } from './api'
import { FilterBar } from './FilterBar'
import { useSearchParams } from 'react-router-dom'
import { FancyBox } from './FancyBox'

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
        .catch(err => {
            setIsLoading(false)
            setError(err)
        })
    }, [searchParams])

    return (
        error ? <FancyBox>
            <ErrorComponent status={error.status} msg={error.response.data.msg} />
        </FancyBox> :
        <section>
        <FilterBar setSearchParams={setSearchParams} searchParams={searchParams}/>
        {isLoading && <p>Loading...</p>}
        <ul id="article-list" aria-label="List of comments">
            {articles.map(article => {
                return <ArticleCard key={article.article_id} article={article}/>
            })}
        </ul>
        </section>
    )
}