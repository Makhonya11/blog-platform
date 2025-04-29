import { Tag } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import Markdown from 'react-markdown'
import { Link, Links, useNavigate } from 'react-router'
import { fetchArticle } from '../../store/ArticlesSlice'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'

import styles from './ArticlePreview.module.scss'

const ArticlePreview = ({ article: { slug, tagList, author, title, updatedAt, description, favoritesCount } }) => {
  const updateDate = format(updatedAt, 'MMMM d, yyyy')
  const dispatch = useDispatch()
  let tagCounter = 1
  const navigate = useNavigate()

  return (
    <li className={styles.article}>
      <div className={styles.title}>
        <h2
          onClick={async () => {
            await dispatch(fetchArticle(slug))
            navigate(`/articles/${slug}`)
          }}
        >
          {title}
        </h2>

        <HeartOutlined />
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