import styles from './EditProfile.module.scss'

const EditProfile = () => {
  return (
    <div className={styles.editProfile}>
      <h3>Edit Profile</h3>
      <form action="/submit" method="post">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Username" />
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="Email address" />
        <label htmlFor="password">New password</label>
        <input type="password" id="password" name="password" placeholder="Password" />
        <label htmlFor="avatar">Avatar image (url)</label>
        <input type="url" id="avatar" placeholder="Url" />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditProfile
