import { getPath } from '@/utils'
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
              <Sidebar.Item
                href="/"
                icon={FaHome}
              >
                Ana Sayfa
              </Sidebar.Item>
              <Sidebar.Item
                href="/"
                icon={FaCity}
              >
                Oda Bilgileri
              </Sidebar.Item>
              <Sidebar.Item
                href={getPath('strategicPlans.create')}
                icon={FaEdit}
              >
                Yeni Stratejik Plan Oluştur
              </Sidebar.Item>
              <Sidebar.Item
                href={getPath('strategicPlans')}
                icon={FaRegChartBar}
              >
                Stratejik Planları Görüntüle
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaPencilAlt}
              >
                Yeni İş Planı Oluştur
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaTasks}
              >
                İş Planlarını Listele
              </Sidebar.Item>

              <Sidebar.Item
                href="#"
                icon={FaPen}
              >
                Anket Oluştur
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaRegListAlt}
              >
                Anketleri Görüntüle
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaExternalLinkAlt}
              >
                Çıkış Yap
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  )
}

export default SideBar
