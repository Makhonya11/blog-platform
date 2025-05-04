import styles from './SignIn.module.scss'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/UserSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    getValues,
    formState:{errors, isValid},
      } = useForm({
        mode: 'onChange',
      })
  
  const getFormData = () => {
    return {
      user: getValues(),
    }
  }
  return (
    <div className={styles.signIn}>
      <h3>Sign In</h3>
      <form 
      onSubmit={async(e) => {
        e.preventDefault()
        try {
          await dispatch(loginUser(getFormData())).unwrap()
          navigate('/')
        } catch (error) {
          toast('Неверный логин или пароль')

        }
      }}
      >
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="Email address" 
        {...register("email", {
          required: "Обязательное поле",
          pattern:{
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Проверьте правильность электронной почты'
          }
        })}
        className={errors.username? styles.invalid: null}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" 
        {...register("password", {
          required: "Обязательное поле",
        minLength: {
          value:6,
          message: 'От 6 до 40 символов',
                },
          maxLength:{
            value:40,
            message: 'От 6 до 40 символов',
          },
          pattern:{
            value:/^\S+$/,
            message: 'Пробелы недопустимы'
          }
        })}
        className={errors.username? styles.invalid: null}
        />
         {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" disabled={!isValid}>Login</button>
      </form>
      <p>
        Don’t have an account?
        <span>
          <a href=""
          onClick={(e) => {
            e.preventDefault()
            navigate('/sign-up')
          }
            }
          > Sign Up.</a>
        </span>
      </p>
    </div>
  )
}

export default SignIn
