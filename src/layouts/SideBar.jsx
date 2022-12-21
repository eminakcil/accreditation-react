import { getPath } from '@/utils'
import SidebarItem from '@components/SidebarItem'
import { useAppSelector } from '@store/index'
import { Sidebar } from 'flowbite-react'
import {
  FaHome,
  FaRegChartBar,
  FaPencilAlt,
  FaExternalLinkAlt,
  FaTasks,
  FaPen,
  FaCity,
  FaEdit,
  FaRegListAlt,
} from 'react-icons/fa'
import Avatar from '@assets/img/avatar.jpg'
import { useRef } from 'react'
import ConfirmSignOutModal from '@components/ConfirmSignOutModal'
import { Link } from 'react-router-dom'
import constants from '@/constants'

const SideBar = () => {
  const { user } = useAppSelector((state) => state.auth)

  const signOutPopupRef = useRef()

  const handleSignOut = () => {
    signOutPopupRef.current.setVisibility(true)
  }

  return (
    <>
      <div
        className="w-fit"
        style={{ margin: '25% 0' }}
      >
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Link to="/profile">
            <img
              className="mb-3 h-24 w-24 rounded-full shadow-lg object-cover"
              src={constants.IMAGE_PREFIX + user?.avatar}
              alt="avatar"
            />
          </Link>
          <Link to="/profile">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user?.fullName}
            </h5>
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user?.userRole?.title}</span>
        </div>
        <Sidebar aria-label="Sidebar with logo branding example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <SidebarItem
                to="/"
                icon={FaHome}
              >
                Ana Sayfa
              </SidebarItem>
              <SidebarItem
                to={getPath('roomInformation')}
                icon={FaCity}
              >
                Oda Bilgileri
              </SidebarItem>
              <SidebarItem
                to={getPath('strategicPlans.create')}
                icon={FaEdit}
              >
                Yeni Stratejik Plan Oluştur
              </SidebarItem>
              <SidebarItem
                to={getPath('strategicSystem')}
                icon={FaRegChartBar}
              >
                Stratejik Planları Görüntüle
              </SidebarItem>

              <SidebarItem
                to={getPath('businessPlan.create')}
                icon={FaPencilAlt}
              >
                Yeni İş Planı Oluştur
              </SidebarItem>
              <SidebarItem
                to={getPath('businessPlan')}
                icon={FaTasks}
              >
                İş Planlarını Listele
              </SidebarItem>
              <SidebarItem
                to="#"
                icon={FaPen}
              >
                {' '}
                Anket Oluştur
              </SidebarItem>
              <SidebarItem
                to="#"
                icon={FaRegListAlt}
              >
                Anketleri Görüntüle
              </SidebarItem>
              <SidebarItem
                icon={FaExternalLinkAlt}
                onClick={handleSignOut}
              >
                Çıkış Yap
              </SidebarItem>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <ConfirmSignOutModal ref={signOutPopupRef} />
    </>
  )
}

export default SideBar
