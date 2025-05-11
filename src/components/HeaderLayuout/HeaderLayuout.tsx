import { Outlet } from 'react-router'
import Header from '../Header/Header'

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
export default HeaderLayout
