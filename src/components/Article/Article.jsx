import { Tag } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import styles from './Article.module.scss'

const Article = () => {
    const article = useSelector((state) => state.articles.currentArticle)
  const { body, tagList, author, title, updatedAt, description, favoritesCount } = article
    const updateDate = format(updatedAt, 'MMMM d, yyyy')

  return (
    <div className={styles.article}>
      <div className={styles.title}>
        <h2> {title}</h2>
        <HeartOutlined />
        <span>{favoritesCount}</span>
      </div>
      <div className={styles.tags}>
        {tagList.map((tag) => (
          <Tag>
            {tag}
          </Tag>
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
      <div className={styles.text}>
        <Markdown>{body}</Markdown>
      </div>
    </div>
  )
}


export default Article