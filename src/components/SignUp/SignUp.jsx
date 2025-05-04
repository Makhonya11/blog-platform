import styles from './SignUp.module.scss'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerUser } from '../../store/UserSlice'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const errorsAPI = useSelector((state) => state.user.errors)
  const {
register,
getValues,
formState:{errors, isValid},
watch,
trigger,
  } = useForm({
    mode: 'onBlur',
  })
  const getFormData = () => {
    const formData = getValues()
    return {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }
    }
  }

  const password = watch('password')

  return (
    <div className={styles.signUp}>
      <h3>Create new account</h3>
      <form 
      onSubmit={async (e) => {
        e.preventDefault()
        try {
           await dispatch(registerUser(getFormData())).unwrap()
               navigate('/')
            } catch (error) {
              if (errorsAPI.username) toast('Это имя уже занято', {theme:'dark'})
              if (errorsAPI.email) toast('Этот email уже используется', {theme:'dark'})
          }
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
        className={errors.username? styles.invalid: null}
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
        <label htmlFor="confirm">Repeat Password</label>
        <input type="password" id="confirm" placeholder="Password" 
        {...register('confirmPassword', {
          validate: (value) => value === password || 'Пароли не совпадают'
        })}
        onChange={(e) => {
          register('confirmPassword').onChange(e);
          trigger('confirmPassword')
        }}
        className={errors.username? styles.invalid: null}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <div className={styles.agree}>
          <input type="checkbox" id="agree" 
          {...register("agree", {
            required: "Примите соглашение",
          })}
          onChange={(e) => {
            register('agree').onChange(e);
            trigger('agree')
          }}
          />
          <label htmlFor="agree">I agree to the processing of my personal information</label>
        </div>
          {errors.agree && <p>{errors.agree.message}</p>}
        <button type="submit" disabled={!isValid}>Create</button>
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
