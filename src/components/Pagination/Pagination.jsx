import { Pagination } from 'antd'
import { fetchArticles } from '../../store/ArticlesSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Pagination.module.scss'

const PagePagination = () => {
  const dispatch = useDispatch()
  const totalCount = useSelector((state) => state.articles.total)
  const isLoading = useSelector((state) => state.articles.isLoading)
  const currentArticle = useSelector((state) => state.articles.currentArticle)

  return (
    <Pagination
      className={styles.pagination}
      disabled={isLoading}
      pageSize={5}
      total={totalCount}
      align="center"
      showSizeChanger={false}
      onChange={(page) => {
        dispatch(fetchArticles(page * 5 - 5))
        window.scrollTo(0, 0)
      }}
    />
  )
}

export default PagePagination
