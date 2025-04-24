import { useState } from 'react'
import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'


import './App.css'

function App() {
 

  return (
    <div className="body">
      <Header/>
      <main>
        <ArticleList/>
      </main>
      {/*<Pagination/>*/}
    </div>
  )
}

export default App
