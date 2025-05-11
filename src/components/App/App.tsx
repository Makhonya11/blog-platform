import { Routes, Route } from 'react-router'
import ArticleList from '../ArticleList/ArticleList'
import Article from '../Article/Article'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import EditProfile from '../EditProfile/EditProfile'
import CreateArticle from '../CreateArticle/CreateArticle'
import EditArticle from '../EditArticle/EditArticle'
import HeaderLayout from '../HeaderLayuout/HeaderLayuout'
import { ToastContainer } from 'react-toastify'

import './App.css'

function App() {
  return (
    <div className="body">
      <main>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/new-article" element={<CreateArticle />} />
            <Route path="/articles/:slug/edit" element={<EditArticle />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}

export default App
