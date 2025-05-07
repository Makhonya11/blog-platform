import ArticlePreview from '../ArticlePreview/ArticlePreview'
import styles from './ArticleList.module.scss'
import { fetchArticles } from '../../store/ArticlesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect } from 'react'
import PagePagination from '../Pagination/Pagination'

const ArticleList = () => {
  const token = localStorage.getItem('authToken')
  const offset = 0
const dispatch = useDispatch()
useEffect (() =>{
dispatch(fetchArticles( {token, offset}))

}, []) 

const articles = useSelector((state) => state.articles.list)
const isLoading = useSelector((state) => state.articles.isLoading)

  return (
    <>
    <ul className={styles.articleList}>
      {isLoading? 
      <Spin indicator={<LoadingOutlined spin />} size="large" />
      :articles.map((article) => (
        <ArticlePreview key={article.slug} article={article}/>
      ))}
    </ul>
    <PagePagination/>
    </>
  )
}

export default ArticleList 
