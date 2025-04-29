import styles from './SignUp.module.scss'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/UserSlice'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      <form action="/submit" method="post"
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(registerUser(getFormData(e)))
        navigate('/')
        
      }}
      >
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Username" />
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="Email address" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" />
        <label htmlFor="confirm">Repeat Password</label>
        <input type="password" id="confirm" placeholder="Password" />
        <div className={styles.agree}>
          <input type="checkbox" id="agree" />
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
