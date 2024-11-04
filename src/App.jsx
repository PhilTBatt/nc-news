import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { ArtcileList } from './components/ArticleList';
import { IndividualArticle } from './components/IndividualArticle';

function App() {

  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArtcileList />} />
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
      </Routes>
    </>
  )
}

export default App
