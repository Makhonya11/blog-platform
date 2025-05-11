import { Tag } from 'antd'
import { useEffect } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchLikeSwitcher, fetchArticle, fetchDeleteArticle } from '../../store/ArticlesSlice'
import { Popconfirm } from 'antd'
import { toast } from 'react-toastify'
import { RootState, AppDispatch } from '../../store'

import styles from './Article.module.scss'

const Article = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.user.currentUser?.username)
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken')
  useEffect(() => {
    dispatch(fetchArticle({ slug, token }))
  }, [])

  const article = useSelector((state: RootState) => state.articles.currentArticle)
  const { body, tagList, author, title, updatedAt, description, favoritesCount, slug, favorited } = article!
  const updateDate = format(updatedAt, 'MMMM d, yyyy')

  return (
    <div className={styles.article}>
      <div className={styles.title}>
        <h2> {title}</h2>
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
          <Tag>{tag}</Tag>
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
      <div className={styles.buttons}>
        <Popconfirm
          placement="rightTop"
          title={'Are you sure to delete this article?'}
          description={'Delete the article'}
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            try {
              await dispatch(fetchDeleteArticle({ slug, token }))
              navigate('/articles')
              toast('Статья успешно удалена')
            } catch (err) {
              console.log(err)
            }
          }}
        >
          <button className={styles.deleteArticle} disabled={currentUser !== author.username}>
            Delete
          </button>
        </Popconfirm>

        <button
          className={styles.editArticle}
          disabled={currentUser !== author.username}
          onClick={() => navigate(`/articles/{article.slug}/edit`)}
        >
          Edit
        </button>
      </div>
      <div className={styles.text}>
        <Markdown>{body}</Markdown>
      </div>
    </div>
  )
}

export default Article
