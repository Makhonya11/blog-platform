import { Pagination } from 'antd'
import { fetchArticles } from '../../store/ArticlesSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Pagination.module.scss'

const PagePagination = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('authToken')
  const totalCount = useSelector((state) => state.articles.total)
  const isLoading = useSelector((state) => state.articles.isLoading)
  const currentArticle = useSelector((state) => state.articles.currentArticle)
  const startCount = (pageNumber) => pageNumber*5-5

  return (
    <Pagination
      className={styles.pagination}
      disabled={isLoading}
      pageSize={5}
      total={totalCount}
      align="center"
      showSizeChanger={false}
      onChange={(page) => {
        const currentStartCount = startCount(page)
        dispatch(fetchArticles({token, currentStartCount}))
        window.scrollTo(0, 0)
      }}
    />
  )
}

export default PagePagination
