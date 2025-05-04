import { Button } from 'antd'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, getUser } from '../../store/UserSlice'
import styles from './Header.module.scss'

const Header = () => {
  const loggedIn = useSelector((state) => state.user.isLogged)
  const userName = useSelector((state) => state.user.currentUser.username)
  const avatar = useSelector((state) => state.user.currentUser.image)
  
  const authToken = localStorage.getItem('authToken')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (authToken) {
      dispatch(getUser(authToken))
    }
  }, [])
const Title = () =>  (
<Link 
  to={"/articles"}
  >
  <h2>Realworld Blog</h2> 
  </Link>
  )


  if (!loggedIn)
    return (
      <div className={styles.header}>
        <Title/>
        <div className="signIn">
          <Button ghost="true" variant="text" color="black" onClick={() => navigate('/sign-in')}>
            Sign In
          </Button>
          <Button variant="outlined" color="green" className={styles.button} onClick={() => navigate('/sign-up')}>
            Sign Up
          </Button>
        </div>
      </div>
    )
  return (
    <div className={styles.header}>
      <Title/>
      <div>
        <Button variant="outlined" color="green" size="small" onClick={() => navigate('/new-article')}>
          Create article
        </Button>
        <Link className={styles.profile}
        to={"/profile"}
        >
          <span>{userName}</span>
          <img
            className="avatar"
            src={avatar}
            alt=""
          />
        </Link>
        <Button variant="outlined" size="large" className={styles.button}
        onClick={() => {
          dispatch(logOut())
          localStorage.removeItem('authToken')
        } }
        > 
          Log Out
        </Button>
      </div>
    </div>
  )
}
export default Header