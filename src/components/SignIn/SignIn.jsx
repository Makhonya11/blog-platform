import styles from './SignIn.module.scss'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/UserSlice'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.currentUser.token)
  const getFormData = (e) => {
    const formData = new FormData(e.target)
    return {
      user: {
        email: formData.get('email'),
        password: formData.get('password'),
      }
    }
  }
  return (
    <div className={styles.signIn}>
      <h3>Sign In</h3>
      <form action="/submit" method="post"
      onSubmit={async(e) => {
        e.preventDefault()
        await dispatch(loginUser(getFormData(e)))
        localStorage.setItem('authToken', authToken)
        navigate('/')
      }}
      >
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="Email address" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
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
