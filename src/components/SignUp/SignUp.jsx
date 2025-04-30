import styles from './SignUp.module.scss'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../store/UserSlice'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
register,
handleSubmit,
formState:{errors},
  } = useForm()
  const getFormData = (e) => {
    const formData = new FormData(e.target)
    return {
      user: {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      }
    }
   
  }
  return (
    <div className={styles.signUp}>
      <h3>Create new account</h3>
      <form 
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(registerUser(getFormData(e)))
        navigate('/')
        
      }}
      >
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Username" 
        {...register("username", {
          required: "Обязательное поле",
        minLength: {
          value:3,
          message: 'От 3 до 20 символов',
                },
          maxLength:{
            value:20,
            message: 'От 3 до 20 символов',
          },
          pattern:{
            value:/^[a-z0-9]+$/,
            message: 'Только латинские буквы в нижнем регистре и цифры'
          }
        })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="Email address" 
         {...register("email", {
          required: "Обязательное поле",
          pattern:{
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Проверьте правильность электронной почты'
          }
        })}
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
        />
        {errors.password && <p>{errors.password.message}</p>}
        <label htmlFor="confirm">Repeat Password</label>
        <input type="password" id="confirm" placeholder="Password" />
        <div className={styles.agree}>
          <input type="checkbox" id="agree" 
          {...register("agree", {
            required: "Примите соглашение",
          })}
          />
          <label htmlFor="agree">I agree to the processing of my personal information</label>
        </div>
        <button type="submit">Create</button>
      </form>
      <p>
        Already have an account?
        <span>
          <a href=""
          onClick={(e) => {
            e.preventDefault()
            navigate('/sign-in')
          } }
          > Sign In.</a>
        </span>
      </p>
    </div>
  )
}

export default SignUp
