import { Link } from "react-router-dom";
import { FancyBox } from "./FancyBox";

export function ArticleCard({article}) {

    return (
        <FancyBox>
            <li key={article.article_id}>
                <h3>
                    <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                </h3>
                Author: {article.author}
                <br/>
                Topic: {article.topic}
                <br/>
                Likes: {article.votes}
                <br/>
                <img src={article.article_img_url}/>
            </li>
        </FancyBox>
    )
}