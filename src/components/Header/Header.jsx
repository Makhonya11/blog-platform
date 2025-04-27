import { Button } from "antd"
import styles from './Header.module.scss'

const Header = () => {
    const LoggedIn = true
  if (!LoggedIn)
    return (
      <div className={styles.header}>
        <h2>Realworld Blog</h2>
        <div className="signIn">
          <Button ghost='true' variant="text" color="black">Sign In</Button>
          <Button variant="outlined" color="green" className={styles.button}>
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
          <span>Nick Name</span>
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