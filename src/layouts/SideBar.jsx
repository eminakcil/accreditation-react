import { getPath, signOut } from '@/utils'
import SidebarItem from '@components/SidebarItem'
import { useAppSelector } from '@store/index'
import { Sidebar } from 'flowbite-react'
import React from 'react'
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

const SideBar = () => {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <>
      <div
        className="w-fit"
        style={{ margin: '25% 0' }}
      >
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={Avatar}
            alt="avatar"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.fullName}
          </h5>
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
                onClick={signOut}
              >
                Çıkış Yap
              </SidebarItem>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  )
}

export default SideBar
