import axios from 'axios'

const api = axios.create({
    baseURL: 'https://nc-news-7miy.onrender.com/api'
})

export function getArticles() {
    return api.get('/articles')
    .then(response => response.data.articles)
}

export function getArticleById(article_id) {
    return api.get(`/articles/${article_id}`)
    .then(response => response.data.article)
}

export function getComments(article_id) {
    return api.get(`/articles/${article_id}/comments`)
    .then(response => response.data.comments)
}

export function patchArticleLikes(article_id, amount) {
    return api.patch(`/articles/${article_id}`, {inc_votes: amount})
    .then(response => response.data.article.votes)
}

export function postNewComment({article_id, user, newComment}) {
    return api.post(`/articles/${article_id}/comments`, {username: user, body: newComment})
    .then(response => response.data.comment)
}