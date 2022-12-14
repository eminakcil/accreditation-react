import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import SideBar from './SideBar'

const MainLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-shrink-0 float-left">
            <SideBar />
          </div>
          <div className="flex-1 pr-8 pt-12">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default MainLayout
