import { Routes, Route } from 'react-router'
import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import PagePagination from '../Pagination/Pagination'
import Article from '../Article/Article'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import EditProfile from '../EditProfile/EditProfile'
import CreateArticle from '../CreateArticle/CreateArticle'
import EditArticle from '../EditArticle/EditArticle'
import { ToastContainer } from 'react-toastify'

import './App.css'

function App() {
  return (
    <div className="body">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />}/>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />

        </Routes>
      </main>
      <ToastContainer/>
    </div>
  )
}

export default App