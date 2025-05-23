import styles from './EditProfile.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateProfile } from '../../store/UserSlice'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { AppDispatch, RootState } from '../../store'

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser!)
  const token = user.token
  const dispatch = useDispatch<AppDispatch>()
  const errorsAPI = useSelector((state: RootState) => state.user.errors)
  const isLoading = useSelector((state: RootState) => state.user.userLoading)
  const {
    register,
    formState: { errors, isValid, dirtyFields },
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
      image: '',
    },
  })

  const getFormData = () => {
    const newValues = getValues()
    const newData = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = newValues[key]
      return acc
    }, {})
    return {
      user: newData,
    }
  }
  if (isLoading) {
    return <Spin className={styles.loader} indicator={<LoadingOutlined spin />} size="large" />
  } else
    return (
      <div className={styles.editProfile}>
        <h3>Edit Profile</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const data = getFormData()
            try {
              await dispatch(updateProfile({ data, token })).unwrap()
            } catch (err) {
              if (typeof errorsAPI !== 'string') {
                if ('username' in errorsAPI) toast('Это имя уже занято', { theme: 'dark' })
                if ('emaol' in errorsAPI) toast('Этот email уже используется', { theme: 'dark' })
              }
            }
          }}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            {...register('username', {
              minLength: {
                value: 3,
                message: 'От 3 до 20 символов',
              },
              maxLength: {
                value: 20,
                message: 'От 3 до 20 символов',
              },
              pattern: {
                value: /^[a-z0-9]+$/,
                message: 'Только латинские буквы в нижнем регистре и цифры',
              },
            })}
            className={errors.username ? styles.invalid : null}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            {...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Проверьте правильность электронной почты',
              },
            })}
            className={errors.email ? styles.invalid : null}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="password">New password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'От 6 до 40 символов',
              },
              maxLength: {
                value: 40,
                message: 'От 6 до 40 символов',
              },
              pattern: {
                value: /^\S+$/,
                message: 'Пробелы недопустимы',
              },
            })}
            className={errors.password ? styles.invalid : null}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <label htmlFor="avatar">Avatar image (url)</label>
          <input
            type="url"
            id="avatar"
            placeholder="Url"
            {...register('image', {
              pattern: {
                value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#\[\]@!$&'()*+,;=]*)?$/,
                message: 'Проверьте правильность адреса',
              },
            })}
            className={errors.image ? styles.invalid : null}
          />
          {errors.image && <p>{errors.image.message}</p>}
          <button type="submit" disabled={!isValid}>
            Save
          </button>
        </form>
      </div>
    )
}

export default EditProfile
