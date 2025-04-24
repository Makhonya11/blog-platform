import { Tag, Icon } from '@chakra-ui/react'

import styles from  './ArticlePreview.module.scss'


const ArticlePreview = ({article:{body, tags, author, title, updatedAt, description, favoritesCount}}) => {
  return (
    <div className={styles.article}>
      <div className={styles.title}>
        <h2> {title}</h2>
        <span>{favoritesCount}</span>
      </div>
        <div className={styles.tags}>
        
          <Tag variant={"outline"} size={"sm"}>tag</Tag>
        
      </div>
      <p className={styles.overview}>
        {description}
      </p>
      <div className={styles.author}>
        <div>
        <h6>{author.username}</h6>
        <span>March 5, 2020 </span>
        </div>
        <img
          src={author.image}
          alt=""
        />
      </div>
    </div>
  )
}

export default ArticlePreview