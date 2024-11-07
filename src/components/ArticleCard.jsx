import { Link } from "react-router-dom";
import { FancyBox } from "./FancyBox";

export function ArticleCard({article}) {

    return (
        <FancyBox>
            <li className="article-card">
                <h3>
                    <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                </h3>
                <div className="article-card-info">
                    <img src={article.article_img_url}/>
                    Author: {article.author}
                    <br/>
                    Topic: {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
                    <br/>
                    Likes: {article.votes}
                    <br/>
                    Posted: {new Date(article.created_at).toLocaleString("en-GB", {day: 'numeric', month: 'numeric', year: 'numeric'})}
                </div>
            </li>
        </FancyBox>
    )
}