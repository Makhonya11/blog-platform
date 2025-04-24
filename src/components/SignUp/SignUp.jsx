import styles from './SignUp.module.scss'

const SignUp = () => {
  return (
    <div className={styles.signUp}>
      <h3>Create new account</h3>
      <form action="/submit" method="post">
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
          <a href=""> Sign In.</a>
        </span>
      </p>
    </div>
  )
}

export default SignUp
