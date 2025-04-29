import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import styles from './Header.module.scss'

const Header = () => {
  const loggedIn = useSelector((state) => state.user.isLogged)
  const userName = useSelector((state) => state.user.currentUser.username)
  const navigate = useNavigate()
  if (!loggedIn)
    return (
      <div className={styles.header}>
        <h2>Realworld Blog</h2>
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
      <h2>Realworld Blog</h2>
      <div>
        <Button variant="outlined" color="green" size="small">
          Create article
        </Button>
        <div className="profile">
          <span>{userName}</span>
          <img
            className="avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-m1KzF62VzCpv2H9zErVDRkq8izPa0o1Zg&s"
            alt=""
          />
        </div>
        <Button variant="outlined" size="large" className={styles.button}>
          Log Out
        </Button>
      </div>
    </div>
  )
}
export default Header