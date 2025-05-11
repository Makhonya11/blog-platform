import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from './EditArticle.module.scss'
import { fetchEditArticle } from '../../store/ArticlesSlice'
import { toast } from 'react-toastify'
import { AppDispatch, RootState } from '../../store'
import { ArticleRequest } from '../../types/types'

const EditArticle = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken')
  const article = useSelector((state: RootState) => state.articles.currentArticle!)
  const {
    register,
    getValues,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ArticleRequest>({
    mode: 'onBlur',
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    },
  })

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'tagList',
  })

  const getFormData = () => {
    const newData = getValues()
    const newArticle = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = newData[key]
      return acc
    }, {})
    return {
      article: newArticle,
    }
  }

  return (
    <div className={styles.editArticle}>
      <h2>Edit article</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const newData = getFormData()
          const slug = article.slug
          try {
            await dispatch(fetchEditArticle({ newData, token, slug })).unwrap()
            navigate(`/articles/${slug}`)
            toast('Вы успешно изменили статью')
          } catch (err) {
            console.log(err)
            toast('Произошла ошибка, повторите попытку')
          }
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          {...register('title', { required: 'Обязательное поле' })}
          className={errors.title ? styles.invalid : null}
        />
        {errors.title && <p>{errors.title.message}</p>}

        <label htmlFor="description">Short description</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          {...register('description', { required: 'Обязательное поле' })}
          className={errors.description ? styles.invalid : null}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          placeholder="Text"
          rows={6}
          {...register('body', { required: 'Обязательное поле' })}
          className={errors.body ? styles.invalid : null}
        ></textarea>
        {errors.body && <p>{errors.body.message}</p>}
        <label htmlFor="tagList">Tags</label>
        <div className={styles.tagList}>
          <div className={styles.tags}>
            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  type="text"
                  id="tagList"
                  placeholder="tag"
                  {...register(`tagList.${index}`, {
                    pattern: {
                      value: /^(?!\s*$).+/,
                      message: 'Тэг не может быть пустой строкой',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Не более 30 символов',
                    },
                  })}
                />
                <button className={styles.deleteTag} type="button" onClick={() => remove(index)}>
                  Delete
                </button>
                {errors.tagList?.[index] && <p>{errors.tagList[index].message}</p>}
              </div>
            ))}
          </div>
          <button className={styles.addTag} type="button" onClick={() => append('tag')}>
            Add tag
          </button>
        </div>
        <button type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  )
}

export default EditArticle
