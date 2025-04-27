import { Routes, Route } from 'react-router'
import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import PagePagination from '../Pagination/Pagination'
import Article from '../Article/Article'


import './App.css'

function App() {
 

  return (
    <div className="body">
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<ArticleList/>}/>
          <Route path='/articles' element={<ArticleList/>}/>
          <Route path='/articles/s' element={<Article/>}/>
          
        </Routes>
        
      </main>
      <PagePagination/>
    </div>
  )
}

export default App
