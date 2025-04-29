import { Routes, Route } from 'react-router'
import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import PagePagination from '../Pagination/Pagination'
import Article from '../Article/Article'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import EditProfile from '../EditProfile/EditProfile'

import './App.css'

function App() {
  return (
    <div className="body">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
             <>
             <ArticleList />
             <PagePagination />
           </>
            } />
          <Route
            path="/articles"
            element={
              <>
                <ArticleList />
                <PagePagination />
              </>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </main>
    </div>
  )
}

export default App