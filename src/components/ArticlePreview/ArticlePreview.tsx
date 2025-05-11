import { Tag } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { fetchArticle, fetchLikeSwitcher } from '../../store/ArticlesSlice'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { ArticleResponse } from '../../types/types'
import { AppDispatch } from '../../store'

import styles from './ArticlePreview.module.scss'

const ArticlePreview = ({
  article: { slug, tagList, author, title, updatedAt, description, favoritesCount, favorited },
}: {
  article: ArticleResponse
}) => {
  const updateDate = format(updatedAt, 'MMMM d, yyyy')
  const token = localStorage.getItem('authToken')
  const dispatch = useDispatch<AppDispatch>()
  let tagCounter = 1
  const navigate = useNavigate()

  return (
    <li className={styles.article}>
      <div className={styles.title}>
        <h5
          onClick={async () => {
            await dispatch(fetchArticle({ slug, token }))
            navigate(`/articles/${slug}`)
          }}
        >
          {title}
        </h5>
        <button
          className={favorited ? styles.liked : styles.notLiked}
          onClick={() => {
            if (!token) {
              navigate('/sign-in')
            } else {
              dispatch(fetchLikeSwitcher({ slug, token, favorited }))
            }
          }}
        >
          <HeartOutlined />
        </button>
        <span>{favoritesCount}</span>
      </div>
      <div className={styles.tags}>
        {tagList.map((tag) => (
          <Tag key={tagCounter++}>{tag}</Tag>
        ))}
      </div>
      <p className={styles.overview}>{description}</p>
      <div className={styles.author}>
        <div>
          <h6>{author.username}</h6>
          <span>{updateDate} </span>
        </div>
        <img src={author.image} alt="" />
      </div>
    </li>
  )
}

export default ArticlePreview
