import ArticlePreview from '../ArticlePreview/ArticlePreview'
import styles from './ArticleList.module.scss'
import { fetchArticles } from '../../store/ArticlesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const ArticleList = () => {
  
const dispatch = useDispatch()
useEffect (() =>{
dispatch(fetchArticles())

}, []) 

const articles = useSelector((state) => state.articles.list)

  return (
    <ul className={styles.articleList}>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article}/>
      ))}
    </ul>
  )
}

export default ArticleList 
