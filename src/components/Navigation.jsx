import { Link } from 'react-router-dom'


export function Navigation() {
    return (
        <nav>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        </nav>
    )
}