import { getPath } from '@/utils'
import SidebarItem from '@components/SidebarItem'
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

const SideBar = () => {
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
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Damla Akcin</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">Meclis Üyesi</span>
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
                to={getPath('strategicPlans')}
                icon={FaRegChartBar}
              >
                Stratejik Planları Görüntüle
              </SidebarItem>

              <SidebarItem
                to="#"
                icon={FaPencilAlt}
              >
                Yeni İş Planı Oluştur
              </SidebarItem>
              <SidebarItem
                href="#"
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
                to="#"
                icon={FaExternalLinkAlt}
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
