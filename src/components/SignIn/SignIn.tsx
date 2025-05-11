import styles from './SignIn.module.scss'
import { useNavigate, Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/UserSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { AppDispatch, RootState } from '../../store'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const isLoading = useSelector((state: RootState) => state.user.userLoading)
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const getFormData = () => {
    return {
      user: getValues(),
    }
  }

  if (isLoading) {
    return <Spin className={styles.loader} indicator={<LoadingOutlined spin />} size="large" />
  } else
    return (
      <div className={styles.signIn}>
        <h3>Sign In</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const data = getFormData()
            try {
              await dispatch(loginUser(data)).unwrap()
              navigate('/')
            } catch (err) {
              toast('Неверный логин или пароль')
            }
          }}
        >
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Проверьте правильность электронной почты',
              },
            })}
            className={errors.username ? styles.invalid : null}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Обязательное поле',
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
            className={errors.username ? styles.invalid : null}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button type="submit" disabled={!isValid}>
            Login
          </button>
        </form>
        <p>
          Don’t have an account?
          <Link to={'/sign-up'}>Sign up.</Link>
        </p>
      </div>
    )
}

export default SignIn
