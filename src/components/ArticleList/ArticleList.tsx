import ArticlePreview from '../ArticlePreview/ArticlePreview'
import styles from './ArticleList.module.scss'
import { fetchArticles } from '../../store/ArticlesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect } from 'react'
import PagePagination from '../Pagination/Pagination'
import { AppDispatch, RootState } from '../../store'

const ArticleList = () => {
  const token = localStorage.getItem('authToken')
  const currentStartCount = 0
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchArticles({ token, currentStartCount }))
  }, [])

  const articles = useSelector((state: RootState) => state.articles.list)
  const isLoading = useSelector((state: RootState) => state.articles.isLoading)

  return (
    <>
      <ul className={styles.articleList}>
        {isLoading ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : (
          articles.map((article) => <ArticlePreview key={article.slug} article={article} />)
        )}
      </ul>
      <PagePagination />
    </>
  )
}

export default ArticleList
