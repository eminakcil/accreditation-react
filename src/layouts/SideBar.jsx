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
                href="#"
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
                icon={FaTasks}
              >
                İş Planlarını Listele
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaPencilAlt}
              >
                Yeni İş Planı Oluştur
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
