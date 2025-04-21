import { Button } from "@chakra-ui/react"
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <h2>Realworld Blog</h2>
        <div className="signIn">
        <Button variant="ghost" >Sign In</Button>
        <Button variant="outline" className={styles.button}>Sign Up</Button>
          </div>
        </div>
    )
}
export default Header