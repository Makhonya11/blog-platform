import styles from './SignIn.module.scss'

const SignIn = () => {
  return (
    <div className={styles.signIn}>
      <h3>Sign In</h3>
      <form action="/submit" method="post">
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="Email address" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" />
        <button type="submit">Create</button>
      </form>
      <p>
        Don’t have an account?
        <span>
          <a href=""> Sign Up.</a>
        </span>
      </p>
    </div>
  )
}

export default SignIn
