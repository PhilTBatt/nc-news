import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { ArticleList } from './components/ArticleList';
import { IndividualArticle } from './components/IndividualArticle';
import { ErrorComponent } from './components/ErrorComponent';

function App() {

  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
        <Route path="*" element={<ErrorComponent msg={"Not Found"} status={404} />} />
      </Routes>
    </>
  )
}

export default App
